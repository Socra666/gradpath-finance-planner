(function () {
  const priorityIds = [101, 103, 106, 108, 109, 110, 111, 112, 316, 330, 331];
  const active = new Map((window.GRADPATH_PROGRAMS || []).map((program) => [program.id, program]));
  const store = window.GRADPATH_APPLICATION_PROCESSES = window.GRADPATH_APPLICATION_PROCESSES || {};

  const officialSources = (program) => {
    const candidates = [
      { url: program.apply, label: `${program.school} application page` },
      { url: program.url, label: `${program.school} programme page` },
      ...((program.requirements && program.requirements.sources) || []).map((source) => ({ url: source.url, label: source.label }))
    ].filter((source) => source.url && !/quantnet|yocket|findamasters|admit/i.test(source.url));
    const seen = new Set();
    return candidates.filter((source) => !seen.has(source.url) && seen.add(source.url)).map((source, index) => ({
      id: `p${program.id}-official-${index + 1}`,
      title: source.label,
      url: source.url,
      publisher: program.school,
      type: 'official',
      applicableCycle: program.term || 'current published cycle',
      accessed: '2026-10-20'
    }));
  };

  const evidence = (name, detail, sourceId, evidenceLevel = 'official_required', extra = {}) => ({ name, detail, evidenceLevel, sourceIds: [sourceId], ...extra });

  function baseProcess(program) {
    const sources = officialSources(program);
    const sourceId = sources[0].id;
    const requirements = program.requirements || {};
    const materialRows = (program.materials || []).map((name) => evidence(name, '具体格式、页数和提交方式以当期申请系统及官网说明为准。', sourceId));
    const optionalPattern = /如适用|如有|可选|非必需|optional/i;
    const preferredPattern = /强烈鼓励|强烈建议|preferred/i;
    const assessmentExtras = (requirements.extra || []).filter((item) => /面试|视频|Kira|测评|笔试/i.test(item.name));
    return {
      programId: program.id,
      cycle: {
        entry: program.term || 'current published cycle',
        opening: (program.events || []).find((event) => /开放|open/i.test(event[1]))?.join(' · ') || '官网未单独公布开放日',
        rounds: (program.events || []).filter((event) => /截止|deadline/i.test(event[1])).map((event, index) => ({
          label: `节点 ${index + 1}`,
          date: event[0],
          time: null,
          timezone: null,
          timingNote: event[1]
        })),
        decision: (program.events || []).find((event) => /决定|decision|结果/i.test(event[1]))?.join(' · ') || '按申请状态页或项目邮件通知'
      },
      completionDefinition: [evidence('完整申请', '主申请、申请费、规定附件及须在同一轮次到齐的推荐材料完成后，项目才会进入审理；逐项以当期申请系统状态为准。', sourceId)],
      materials: {
        required: materialRows.filter((row) => !optionalPattern.test(row.name)),
        preferred: materialRows.filter((row) => optionalPattern.test(row.name) && preferredPattern.test(row.name)).map((row) => ({ ...row, evidenceLevel: 'official_preferred' })),
        optional: materialRows.filter((row) => optionalPattern.test(row.name) && !preferredPattern.test(row.name)).map((row) => ({ ...row, evidenceLevel: 'admissions_advice' })),
        rejected: []
      },
      postSubmission: [evidence('状态页与补件', '提交后检查确认邮件和申请状态页；如项目要求补件、录制或测评，应按邀请中的独立期限完成。', sourceId, 'admissions_advice', { status: 'required' })],
      assessments: assessmentExtras.length ? assessmentExtras.map((item) => evidence(item.name, item.detail, sourceId, item.level === '官网硬性要求' ? 'official_required' : 'admissions_advice', { status: /受邀|入围|shortlist/i.test(item.detail) ? 'invited' : 'selective' })) : [evidence('视频、笔试或面试', '当前公开官网摘要未确认统一形式；如收到官方邀请，再按邮件安排准备。', sourceId, 'admissions_advice', { status: 'unknown' })],
      preparation: [],
      afterAdmission: [evidence('录取条件与确认', '获得录取后核对接受 offer、押金、最终成绩单、语言条件、资金证明和签证节点。', sourceId, 'admissions_advice')],
      sources
    };
  }

  for (const id of priorityIds) {
    const program = active.get(id);
    if (program) store[id] = baseProcess(program);
  }

  const mit = store[101];
  if (mit) {
    const sourceId = mit.sources[0].id;
    mit.cycle = {
      entry: '2027',
      opening: '2027 入学申请已开放',
      rounds: [{ label: '唯一截止', date: '2027-01-05', time: '15:00', timezone: 'ET', timingNote: '申请和推荐信须在截止前到齐' }],
      decision: '2027年3月；未获面试的拒绝决定可能提前发布'
    };
    mit.completionDefinition = [evidence('完整申请', '在线申请、全部必交附件、3 封推荐信和 150 美元申请费均须在 2027年1月5日 15:00 ET 前完成。GMAT/GRE 可自报；录取后再核验正式记录。', sourceId)];
    mit.materials.preferred = [evidence('GMAT 或 GRE', '可选，但 MIT 明确 strong encouragement；不提交不会产生负面推断。接受线上和考点考试。', sourceId, 'official_preferred')];
    mit.materials.optional = [evidence('职业证书或非学位课程', '可作为补充学术证据，帮助招生委员会判断准备程度。', sourceId, 'official_preferred')];
    mit.materials.rejected = [evidence('TOEFL / IELTS', 'MIT MFin 不要求且不接收；英语能力通过申请与面试评估。', sourceId)];
    mit.postSubmission = [
      evidence('完整性核验', '截止后统一审理，不滚动审理，也不会因提前提交而提前评估。', sourceId, 'official_required', { status: 'required' }),
      evidence('面试邀请', '达到进阶审理阶段的候选人会通过电子邮件收到虚拟面试邀请；受邀不等于录取。', sourceId, 'official_required', { status: 'invited' }),
      evidence('决定', '官方决定仅通过在线申请系统发布；未获面试的拒绝决定可能提前发出。', sourceId, 'official_required', { status: 'required' })
    ];
    mit.assessments = [
      evidence('Video Question 1', '随申请提交；最长 90 秒、一次拍摄、不可剪辑，不加配乐或字幕，直接面对镜头自然讲述个人故事。', sourceId, 'official_required', { status: 'required' }),
      evidence('Video Question 2', '随申请提交；随机开放题、非技术题，仅一次录制机会，不可重录。', sourceId, 'official_required', { status: 'required' }),
      evidence('受邀数量能力评估', '虚拟进行，约 30 分钟。官方称无需事先准备，具体说明随面试邀请发送；官网没有公开固定题库。', sourceId, 'official_required', {
        status: 'invited',
        resourceNote: 'MIT 将以下材料用于自查 MFin 课程所需的金融数学准备度；它们不等同于当年招生数量评估的固定题型或考纲。',
        resources: [
          { label: '官方 Self-Assessment 与准备说明', url: 'https://mitsloan.mit.edu/mfin/admissions/suggested-background' },
          { label: '官方 Financial Mathematics Sample Exam', url: 'https://mitsloan.mit.edu/sites/default/files/2019-03/MFin%20Sample%20Exam.pdf' },
          { label: '官方 Sample Exam Solutions', url: 'https://mitsloan.mit.edu/sites/default/files/2019-03/MFin%20Sample%20Exam%20Solution.pdf' }
        ]
      }),
      evidence('受邀行为面试', '虚拟一对一约 30 分钟，考察团队合作、决策、解决问题、专业表现、沟通和英语能力。', sourceId, 'official_required', { status: 'invited' })
    ];
    mit.preparation = [
      evidence('数学基础', '申请表要求列出线性代数、多元微积分、概率和统计课程；应能解释成绩单与项目中如何使用这些知识。', sourceId, 'official_required'),
      evidence('Python', 'MIT 明确偏好已证明 Python 熟练度的申请人；可以在没有 Python 的情况下录取，但录取者入学前预计须证明熟练度。建议至少能独立完成数据处理、函数、基础数值计算和调试，并讲清项目代码。', sourceId, 'official_preferred'),
      evidence('数量评估边界', '官网未公布题目范围，也明确称无需准备。不要把往届概率、金融数学或编程题回忆视为本年度固定考纲。', sourceId, 'admissions_advice')
    ];
  }

  const oxford = store[106];
  if (oxford) {
    const sourceId = oxford.sources[0].id;
    oxford.completionDefinition = [evidence('主申请与附加截止分开', '除 Kira Talent 和 3 封推荐信外，全部材料须在所选轮次 23:59 UK 前提交；Kira 与推荐信可在该轮主截止后一周内完成。', sourceId)];
    oxford.postSubmission = [
      evidence('Kira 链接', '提交主申请后通过邮件和申请门户收到安全链接。', sourceId, 'official_required', { status: 'required' }),
      evidence('Kira 与推荐信截止', '须在所选轮次主截止后一周的 23:59 UK 前完成 Kira，并使 3 位推荐人提交推荐。', sourceId, 'official_required', { status: 'required' }),
      evidence('录取决定', '各轮申请者在官网列出的统一日期前收到决定。', sourceId, 'official_required', { status: 'required' })
    ];
    oxford.assessments = [evidence('Kira Talent 视频测评', '所有申请者提交后完成；有练习与准备时间，正式流程总计不超过约 15 分钟，需要带摄像头和麦克风的电脑及稳定网络。题目细节以当期链接为准。', sourceId, 'official_required', { status: 'required' })];
    oxford.afterAdmission = [evidence('£10,000 留位费', '获得 offer 后通常须在初始 offer 发出后 30 天内支付，原则上不可退；以个人 offer 条款为准。', sourceId, 'official_required')];
  }

  const cambridgeMfin = store[110];
  if (cambridgeMfin) {
    const sourceId = cambridgeMfin.sources[0].id;
    cambridgeMfin.completionDefinition = [evidence('完整申请', '在线表格、全部附件、申请费和 2 封推荐信到齐后才开始审理；官网目标是在完整申请后约两周完成初审。', sourceId)];
    cambridgeMfin.postSubmission = [
      evidence('确认收件与初审', '招生办公室邮件确认收件；只有两封推荐信到齐后才会审理。', sourceId, 'official_required', { status: 'required' }),
      evidence('面试短名单', '通常在完整申请后约 2–3 周通知是否进入面试。', sourceId, 'official_required', { status: 'invited' }),
      evidence('面试后决定', '官网称通常在面试后一周内通知是否获得 conditional offer。', sourceId, 'official_required', { status: 'required' })
    ];
    cambridgeMfin.assessments = [evidence('教师面试', '短名单申请者与 MFin Director 或 Finance faculty 进行线上视频或经同意到校面试；官网未公开固定题库。', sourceId, 'official_required', { status: 'invited' })];
    cambridgeMfin.afterAdmission = [
      evidence('Conditional offer', '可能要求支付首笔学费（总额 10%）、提交财务声明、完成学历与推荐核验、满足英语条件并证明资金。', sourceId, 'official_required'),
      evidence('Confirmation of Enrolment', '全部条件满足后转为无条件确认，再进入学院成员安排与签证 CAS 流程。', sourceId, 'official_required')
    ];
  }

  const lbsMfa = store[111];
  if (lbsMfa) {
    const sourceId = lbsMfa.sources[0].id;
    lbsMfa.completionDefinition = [evidence('完整申请', '主申请、全部强制文件、推荐人的完整推荐表和申请费须在所选轮次 23:59 UK 前到齐。', sourceId)];
    lbsMfa.postSubmission = [
      evidence('收件确认与材料审查', '提交后收到自动确认和缴费指引；委员会依据已提交内容决定是否进入面试。', sourceId, 'official_required', { status: 'required' }),
      evidence('虚拟面试', '入围者由校友或招生团队在线面试；两类面试官使用相同评价标准。', sourceId, 'official_required', { status: 'invited' }),
      evidence('面试后综合审理', '面试反馈与书面申请合并评估，并按 admissions calendar 发布最终决定。', sourceId, 'official_required', { status: 'required' })
    ];
    lbsMfa.assessments = [
      evidence('受邀虚拟面试', '面试人可能是校友或招生团队，重点围绕动机、领导与团队经历、金融兴趣、职业目标和对 LBS 的具体理解。官网未公开固定题目。', sourceId, 'official_required', { status: 'invited' }),
      evidence('候补 Kira', '仅部分候补者会收到 Kira 视频进一步评估邀请，并非所有申请者的常规环节。', sourceId, 'official_required', { status: 'selective' })
    ];
  }

  const lbsMif = store[112];
  if (lbsMif) {
    const sourceId = lbsMif.sources[0].id;
    lbsMif.completionDefinition = [evidence('完整申请', '全部文件及推荐信须在所选轮次 17:00 UK 前到齐，之后才进入该轮审理。', sourceId)];
    lbsMif.postSubmission = [
      evidence('材料评审', '招生委员会综合学术记录、金融工作经历、申请表与个人陈述、推荐信和 GMAT/GRE 决定是否邀请面试。', sourceId, 'official_required', { status: 'required' }),
      evidence('校友或招生面试', '入围者通常由所在地区校友或资深招生人员面试，可能需根据面试官安排出行。', sourceId, 'official_required', { status: 'invited' }),
      evidence('最终决定或候补', '面试反馈与初始申请合并审理，结果为录取、拒绝或候补。', sourceId, 'official_required', { status: 'required' })
    ];
    lbsMif.assessments = [evidence('受邀面试', '围绕工作轨迹、金融判断、职业目标、项目匹配和申请材料中的具体经历展开；官网未公布统一技术题库。', sourceId, 'official_required', { status: 'invited' })];
  }
})();
