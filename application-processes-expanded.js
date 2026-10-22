(function () {
  const store = window.GRADPATH_APPLICATION_PROCESSES = window.GRADPATH_APPLICATION_PROCESSES || {};
  const priority = new Set([101, 103, 106, 108, 109, 110, 111, 112, 316, 330, 331]);
  const official = (program) => {
    const raw = [
      { url: program.apply, title: `${program.school} application page` },
      { url: program.url, title: `${program.school} programme page` },
      ...((program.requirements?.sources || []).map((source) => ({ url: source.url, title: source.label })))
    ].filter((source) => source.url && !/quantnet|yocket|findamasters|admit/i.test(source.url));
    const seen = new Set();
    return raw.filter((source) => !seen.has(source.url) && seen.add(source.url)).map((source, index) => ({
      id: `p${program.id}-official-${index + 1}`,
      title: source.title,
      url: source.url,
      publisher: program.school,
      type: 'official',
      applicableCycle: program.term || 'current published cycle',
      accessed: '2026-10-20'
    }));
  };
  const item = (name, detail, sourceId, evidenceLevel = 'official_required', extra = {}) => ({ name, detail, evidenceLevel, sourceIds: [sourceId], ...extra });

  for (const program of window.GRADPATH_PROGRAMS || []) {
    if (priority.has(program.id)) continue;
    const sources = official(program);
    if (!sources.length) continue;
    const sourceId = sources[0].id;
    const extras = program.requirements?.extra || [];
    const assessmentItems = extras.filter((entry) => /面试|视频|Kira|测评|笔试|assessment/i.test(entry.name));
    const isJoint = Boolean(program.isDual) || /×|\+/.test(program.school + program.name);
    const rounds = (program.events || []).filter((event) => /截止|deadline/i.test(event[1])).map((event, index) => ({
      label: `节点 ${index + 1}`,
      date: event[0],
      time: null,
      timezone: null,
      timingNote: event[1]
    }));
    const materialRows = (program.materials || []).map((name) => item(name, '按当期申请系统核对格式、页数、语言、送分和提交方式。', sourceId));
    const optionalPattern = /如适用|如有|可选|非必需|optional/i;
    const preferredPattern = /强烈鼓励|强烈建议|preferred/i;
    store[program.id] = {
      programId: program.id,
      cycle: {
        entry: program.term || 'current published cycle',
        opening: (program.events || []).find((event) => /开放|open/i.test(event[1]))?.join(' · ') || '官网未单独公布开放日',
        rounds,
        decision: (program.events || []).find((event) => /决定|结果|decision/i.test(event[1]))?.join(' · ') || '按申请状态页或项目邮件通知'
      },
      completionDefinition: [item(
        isJoint ? '联合项目的完整申请' : '完整申请',
        isJoint
          ? '联合或双学位的申请路径可能包含合作院校提名、第一年院校审核或两校联动审核；必须按当期路径页完成全部指定环节，不能用其中一校的常规硕士申请替代。'
          : '在线申请、申请费、规定附件和项目要求在截止前到齐的推荐材料完成后，申请才进入审理；以当期状态页为最终准则。',
        sourceId
      )],
      materials: {
        required: materialRows.filter((row) => !optionalPattern.test(row.name)),
        preferred: materialRows.filter((row) => optionalPattern.test(row.name) && preferredPattern.test(row.name)).map((row) => ({ ...row, evidenceLevel: 'official_preferred' })),
        optional: materialRows.filter((row) => optionalPattern.test(row.name) && !preferredPattern.test(row.name)).map((row) => ({ ...row, evidenceLevel: 'admissions_advice' })),
        rejected: []
      },
      postSubmission: [
        item('确认收件与状态页', '提交后检查确认邮件、申请状态页及垃圾邮件；学校要求的补件、录制或测评可能使用独立截止时间。', sourceId, 'admissions_advice', { status: 'required' }),
        item(isJoint ? '合作院校审核或提名' : '材料审理', isJoint ? '后续顺序取决于联合路径：可能先由第一年院校审核或提名，再转交合作院校。当前页面只将官网明确的路径视为确定流程。' : '项目根据完整材料决定是否要求补件或邀请进入下一阶段。', sourceId, 'admissions_advice', { status: isJoint ? 'selective' : 'required' })
      ],
      assessments: assessmentItems.length
        ? assessmentItems.map((entry) => item(entry.name, entry.detail, sourceId, entry.level === '官网硬性要求' ? 'official_required' : 'admissions_advice', { status: /受邀|入围|shortlist/i.test(entry.detail) ? 'invited' : 'selective' }))
        : [item('视频、笔试或面试', '当前公开官网摘要未确认统一环节或固定题型；没有官方邀请时不应依据往届帖子自行安排。', sourceId, 'admissions_advice', { status: 'unknown' })],
      preparation: [item('提交后准备', '保持能够逐段解释简历、课程、实习或研究贡献，并准备说明选择该项目和职业路径的原因。技术项目还应复习申请中声称掌握的数学与编程内容。', sourceId, 'admissions_advice')],
      afterAdmission: [item('接受录取与满足条件', '核对个人 offer 中的接受期限、留位费、最终成绩单、语言条件、资金证明、签证和合作院校后续手续。', sourceId, 'admissions_advice')],
      sources
    };
  }
})();
