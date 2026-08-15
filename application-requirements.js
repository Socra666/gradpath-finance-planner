(function(){
  const R={}, HARD='官网硬性要求', INFO='官网说明', PLAN='本站规划建议（非校方门槛）', THIRD='第三方数据库（仅供交叉参考）';
  const clone=x=>JSON.parse(JSON.stringify(x));
  const add=(ids,data)=>ids.forEach(id=>R[id]=clone(Object.assign({
    checked:'2026-08-15',
    transcript:{headline:'所有就读院校成绩单',detail:'上传完整成绩记录；非英文材料通常需要英文翻译。录取后是否寄送正式件，以项目通知为准。',level:INFO},
    cv:{headline:'简历 / CV',detail:'写清起止月份、职责、个人贡献与可核验成果；严格遵守项目页数要求。',level:INFO},
    writing:[],extra:[],sources:[]
  },data)));
  const qPlan='若决定提交，量化项目可把 GRE Quant 167–170、Verbal 155+、AWA 3.5+ 作为准备目标；这是本站规划区间，不是录取线。';
  const fPlan='官网未公布建议分数；如需用标化增强申请，本站建议以 GRE 325+（Quant 165+）或 GMAT Focus 655+ 为准备目标，不是录取线。';
  const noPublic='官网未公布最低或建议分数；不要把机构经验值当作硬门槛。';
  const quantNet={url:'https://quantnet.com/tracker/',label:'QuantNet 量化项目申请数据库（用户自报）',type:THIRD};

  add([101],{
    language:{headline:'不接收 TOEFL / IELTS',detail:'MIT MFin 不把 TOEFL、IELTS 作为申请材料；英语沟通能力会在申请和面试中评估。',level:HARD},
    tests:{headline:'GMAT / GRE 可选，但官方强烈鼓励',detail:'无最低分。决定提交时应突出数量能力；'+qPlan,level:INFO},
    writing:[
      {name:'Short Answer 1',limit:'最多 200 词',focus:'概括最重要的学术与职业成就，并说明这些经历如何证明你已为高强度金融学习做好准备。',level:HARD},
      {name:'Short Answer 2',limit:'最多 200 词',focus:'说明短期与长期职业目标，以及 MIT MFin 对实现目标的具体作用。',level:HARD},
      {name:'Short Answer 3',limit:'最多 200 词',focus:'用具体经历体现你的个人品质、价值观或给同学群体带来的独特贡献。',level:HARD},
      {name:'Video Question 1',limit:'不超过 90 秒；一次录制，不剪辑、不加音乐或字幕',focus:'按当期题目直接作答，重点看表达、判断与真实性。',level:HARD},
      {name:'Video Question 2',limit:'随机开放题；一次录制',focus:'提交前查看系统给出的准备与作答时间。',level:HARD}
    ],
    references:{headline:'3 封推荐信；每封最多 2 页',detail:'在读生通常提交 2 封学术推荐 + 1 封实习推荐；在职申请人通常提交 1 封当前/近期雇主推荐 + 1 封学术推荐 + 1 封学术或职业推荐。至少一位须能具体评价数量能力，全部在截止前在线到齐。',level:HARD},
    cv:{headline:'1 页简历',detail:'官方要求一页，建议 Times New Roman 10 号字；用结果而非职责堆砌，实习经历可能被核验。',level:HARD},
    extra:[{name:'相关课程列表',detail:'单独列出金融、数学、统计、计算机等相关课程与成绩。',level:HARD},{name:'面试',detail:'邀请制；英语能力也在面试中评估。',level:INFO}],
    sources:[{url:'https://mitsloan.mit.edu/mfin/admissions/how-to-apply',label:'MIT MFin How to Apply',type:HARD}]
  });
  add([102],{
    language:{headline:'TOEFL / IELTS / DET：符合条件者必须提交',detail:'母语非英语且未在认可的英语国家完成合格学位时需要提交；官网未公布最低分。',level:HARD},
    tests:{headline:'GMAT / GRE 必交；少数 Yale 本校申请人可豁免',detail:'官网无最低分。当前 Yale College 高年级生或毕业三年内、GPA 达到 3.7 的校友可按规则豁免；其他申请人必交。'+fPlan,level:HARD},
    writing:[{name:'职业目标短文',limit:'最多 500 词',focus:'说明短期与长期职业兴趣、形成这些目标的驱动力，以及学术、职业和个人经历如何支撑。',level:HARD}],
    references:{headline:'2 封推荐信',detail:'通常一封大学学术推荐、一封应用型经历推荐（工作、实习或课外活动）；用具体例子评价能力、判断与影响。',level:HARD},
    cv:{headline:'1 页简历',detail:'浓缩教育、实习/工作、领导力和量化成果。',level:HARD},
    extra:[{name:'视频与写作题',detail:'提交后完成视频问题、限时写作与行为测评；以系统邀请的时间窗和设备说明为准。',level:HARD}],
    sources:[{url:'https://som.yale.edu/programs/mms-asset-management/admissions/application-information',label:'Yale Asset Management Application Information',type:HARD}]
  });
  add([103],{
    language:{headline:'TOEFL / IELTS / DET：按研究生院豁免规则提交',detail:'本科非全程英语授课者通常需提交；官网未为 MFin 单列最低分。',level:HARD},
    tests:{headline:'GMAT / GRE 可选',detail:'无最低分；所有申请人仍须参加项目数学测评。若提交，'+qPlan,level:INFO},
    writing:[{name:'Academic Statement of Purpose',limit:'按 Princeton 申请系统',focus:'学术准备、数量课程、研究/职业兴趣与 Princeton 资源的具体匹配。',level:HARD},{name:'Personal Statement',limit:'按 Princeton 申请系统',focus:'个人经历、视角与对共同体的贡献，不与学术目的陈述重复。',level:HARD}],
    references:{headline:'3 封推荐信',detail:'无全职经验者通常至少两封学术推荐；有两年以上全职经验者可用至多两封雇主推荐，但至少一封必须为学术推荐。',level:HARD},
    extra:[{name:'数学测评',detail:'所有申请人参加；当年日期与登录方式由项目公布。',level:HARD}],
    sources:[{url:'https://bcf.princeton.edu/academic-programs/master-in-finance/apply-for-the-master-in-finance-program/',label:'Princeton MFin Application',type:HARD}]
  });
  add([104],{
    language:{headline:'先满足 Harvard Extension 英语准入要求',detail:'当前官方路径列出 TOEFL 旧制 100 / 新制 5.0 等英语证明方式；不同课程与身份的认可路径以 HES 英语页面为准。',level:HARD},
    tests:{headline:'不要求 GRE / GMAT',detail:'该项目采用“先修课达标后申请”的绩效型入学，不以 GRE/GMAT 作为准入材料。',level:HARD},
    writing:[{name:'正式学位申请材料',limit:'完成第 3 门入学课程期间申请',focus:'按 HES 学位申请系统填写；它不是传统商学院 MFin 的一轮式文书申请。',level:INFO}],
    references:{headline:'入学课程阶段不要求传统推荐信包',detail:'核心门槛是完成指定经济、金融、统计入学课程并达到单科 B 以上、Harvard 累计 GPA 至少 3.0。',level:HARD},
    extra:[{name:'Earn-your-way-in',detail:'先注册并完成 3 门指定入学课程，在第 3 门课程期间申请学位。',level:HARD}],
    sources:[{url:'https://extension.harvard.edu/academics/programs/finance-graduate-program/finance-degree-requirements/',label:'Harvard Extension Finance Degree Requirements',type:HARD}]
  });
  add([105],{
    language:{headline:'IELTS 7.0；TOEFL 旧制 90 / 新制 4.5',detail:'Stanford 研究生院统一最低要求；符合英语母语、全英语学位或规定年限英语工作/学习经历者可豁免。',level:HARD},
    tests:{headline:'GRE 不要求且不接受',detail:'ICME 明确不会接收或审阅 GRE，不必为本项目送分。',level:HARD},
    writing:[{name:'Statement of Purpose',limit:'最多 500 词',focus:'数量准备、计算/金融兴趣、目标方向及 ICME 资源匹配。',level:HARD}],
    references:{headline:'3 封推荐信',detail:'官方建议至少一封、最好两封来自学术推荐人，具体评价数学、计算与研究/项目能力。',level:INFO},
    extra:[{name:'课程与技术准备',detail:'通过成绩单、CV 和项目经历证明高阶数学、数值方法与编程能力。',level:INFO}],
    sources:[{url:'https://icme.stanford.edu/academics-admission/icme-graduate-program-application',label:'Stanford ICME Application',type:HARD},{url:'https://gradadmissions.stanford.edu/apply/test-scores',label:'Stanford Graduate Test Scores',type:HARD}]
  });
  add([106],{
    language:{headline:'IELTS 7.5，单项 7.0；TOEFL 旧制 110',detail:'Oxford Higher level；TOEFL 旧制单项通常为 L22/R24/S25/W24。考试有效期及新制换算按当期英语页面。',level:HARD},
    tests:{headline:'GMAT / GRE 必交',detail:'官网未设最低分；重点看数量部分与整体均衡。'+fPlan,level:HARD},
    writing:[{name:'Personal Essay',limit:'最多 500 词',focus:'说明职业目标、选择 MFE 的原因、金融/经济准备，以及你将如何参与班级。',level:HARD}],
    references:{headline:'3 封学术或职业推荐信',detail:'2026–27 官方 brochure 列明 3 封；选择能具体评价学术能力、分析力、职业表现和团队贡献的推荐人，并在目标轮次前全部到齐。',level:HARD},
    extra:[{name:'Kira 视频评估',detail:'提交申请后，所有候选人都会收到 Kira Talent 视频评估，当前说明包含 6 道动机与能力问题；按邀请邮件的设备测试、准备时间和作答窗口独立完成。',level:HARD}],
    sources:[{url:'https://www.sbs.ox.ac.uk/sites/default/files/2025-10/mfe-brochure-2026-27.pdf',label:'Oxford MFE 2026–27 Brochure',type:HARD}]
  });
  add([107],{
    language:{headline:'IELTS 7.5，单项 7.0；TOEFL 旧制 110',detail:'Oxford Higher level；TOEFL 旧制单项 L22/R24/S25/W24。',level:HARD},
    tests:{headline:'不要求 GRE / GMAT',detail:'课程页明确不寻求 GRE 或 GMAT 成绩。',level:HARD},
    writing:[{name:'Statement of Purpose',limit:'最多 1,000 词',focus:'申请动机、相关教育/经历、具体兴趣方向，以及处理抽象概念和高强度学习的准备。',level:HARD}],
    references:{headline:'3 封推荐信；至少 2 封学术推荐',detail:'应具体证明数学成熟度、独立学习和高强度课程准备。',level:HARD},
    cv:{headline:'通常不另交 CV',detail:'课程页说明申请表会收集相关履历信息；若当期系统开放 CV 上传，以系统为准。',level:HARD},
    extra:[{name:'面试',detail:'官网说明通常不举行面试。',level:INFO}],
    sources:[{url:'https://www.ox.ac.uk/admissions/graduate/courses/msc-mathematical-and-computational-finance',label:'Oxford MCF Course Page',type:HARD}]
  });
  add([108],{
    language:{headline:'IELTS 7.5，四项均 7.0；TOEFL 旧制 110、各项 25',detail:'达到 Cambridge 对该项目的英语最低要求；考试制式更新按当年研究生招生页。',level:HARD},
    tests:{headline:'GRE / GMAT 不要求，提交也不加权',detail:'官方明确说明不会因提交标化获得额外优势。',level:HARD},
    writing:[{name:'Statement of Interest',limit:'官网公开页未列固定字数',focus:'研究兴趣、金融与计量准备、课程/论文经历及未来研究计划；以申请系统字符限制为准。',level:INFO}],
    references:{headline:'2 封学术推荐信',detail:'选择能评价研究潜力、计量/理论基础和独立思考能力的教师。',level:HARD},
    sources:[{url:'https://www.jbs.cam.ac.uk/phd-research-masters/mphil-finance/apply/',label:'Cambridge MPhil Finance Apply',type:HARD}]
  });
  add([109],{
    language:{headline:'IELTS 7.5，四项均 7.0；TOEFL 旧制 110、各项 25',detail:'项目官网明确的最低英语要求。',level:HARD},
    tests:{headline:'部分申请人必须提交 GRE',detail:'此前大学教育不在英国或 University of London International 的申请人必须交 GRE；官网未公布目标分。本站准备建议 Quant 167+。',level:HARD},
    writing:[{name:'申请陈述',limit:'以 Cambridge Applicant Portal 为准',focus:'经济学训练、微观/宏观/计量基础、金融经济学兴趣和职业/研究目标。',level:INFO}],
    references:{headline:'2 封学术推荐信',detail:'应重点证明经济学课程表现、排名、数量能力和研究潜力。',level:HARD},
    extra:[{name:'学术背景',detail:'经济学本科学位及中级微观、宏观、计量基础；官方建议达到本专业前 10% 左右并提供排名信息。',level:INFO}],
    sources:[{url:'https://www.postgraduate.study.cam.ac.uk/courses/directory/ececmpmfe/requirements',label:'Cambridge Finance and Economics Requirements',type:HARD}]
  });
  add([110],{
    language:{headline:'IELTS 7.0；听说写 7.0、阅读 6.5',detail:'TOEFL 旧制 100 且各项 25；符合 Cambridge 豁免规则者可不交。',level:HARD},
    tests:{headline:'GMAT / GRE 可选',detail:'学术成绩边缘或非金融背景时可增强证明力；官网无最低分。'+fPlan,level:INFO},
    writing:[{name:'申请陈述',limit:'当期申请系统显示具体字数',focus:'重大职业挑战/成就、个人动机、关键技能、为什么现在需要 Cambridge MFin。',level:HARD}],
    references:{headline:'2 封推荐信',detail:'通常一封来自当前直属经理/主管，另一封可来自学术推荐人；须能评价金融工作成果与发展潜力。',level:HARD},
    extra:[{name:'工作经验',detail:'至少 2 年毕业后金融全职经验，理想状态包含前台金融岗位。',level:HARD},{name:'在线面试',detail:'入围后与项目教师在线面试，重点核验经历、动机和职业判断。',level:INFO}],
    sources:[{url:'https://www.jbs.cam.ac.uk/masters-degrees/master-of-finance/apply/',label:'Cambridge MFin Apply',type:HARD}]
  });
  add([111],{
    language:{headline:'接受 IELTS / TOEFL / Cambridge / PTE / DET；官网未公开统一最低分',detail:'非英语母语且未完成认可的英语授课学位时通常需提交；是否豁免由 LBS 判断。',level:INFO},
    tests:{headline:'GMAT / GMAT Focus / GRE 或 CFA Level I',detail:'无统一最低分；LBS 官方建议 GMAT Focus 至少 555。满足 CFA Level I 路径者按官网规则提交证明。',level:HARD},
    writing:[{name:'申请短文',limit:'具体题目与字数在当期申请系统',focus:'职业动机、价值观与目标、领导/团队经历、为什么 MFA、能为 LBS 社群带来什么。',level:HARD}],
    references:{headline:'1 封推荐信',detail:'职业推荐人优先；缺少合适职业推荐人时可用学术推荐。推荐表必须在所选轮次截止前完成。',level:HARD},
    cv:{headline:'1 页简历',detail:'突出金融实习、量化成果、领导力与职业方向，不写成岗位职责流水账。',level:HARD},
    extra:[{name:'申请费',detail:'当前 MFA 申请费为 £125，推荐表与费用均须在所选轮次截止前完成。',level:HARD},{name:'面试',detail:'入围后按项目通知完成面试；最终决定按当期 admissions calendar 发布。',level:INFO}],
    sources:[{url:'https://www.london.edu/masters-degrees/masters-in-financial-analysis/apply?entry=true',label:'LBS MFA Apply',type:HARD}]
  });
  add([112],{
    language:{headline:'接受 IELTS / TOEFL / Cambridge / PTE / DET；官网未公开统一最低分',detail:'非英语母语或不满足英语授课学位豁免者需提交，最终由 LBS 审核。',level:INFO},
    tests:{headline:'通常需要 GMAT / GRE；少数情况可豁免',detail:'CFA Level II 及以上可按规则自动获得测试豁免；官网无最低分。'+fPlan,level:HARD},
    writing:[{name:'职业目标短文',limit:'最多 500 词',focus:'职业目标、实现步骤、备选路径与目标地区。',level:HARD},{name:'LBS 社群短文',limit:'最多 300 词',focus:'计划参与哪些活动，以及能为 LBS 带来的独特价值。',level:HARD}],
    references:{headline:'1 封推荐信',detail:'优先选择当前或近期主管，具体评价业绩、领导力、职业成熟度。',level:HARD},
    cv:{headline:'1 页简历',detail:'重点展示毕业后金融工作经验、晋升与可量化业务影响。',level:HARD},
    sources:[{url:'https://www.london.edu/masters-degrees/masters-in-finance-full-time/apply?entry=true',label:'LBS MiF Apply',type:HARD}]
  });
  add([113,114,115],{
    language:{headline:'IELTS 6.0，单项不低于 5.5；TOEFL 旧制 80 / 新制 4.5',detail:'成绩通常须在入学当年 9 月 1 日前两年内取得；港大商学院不接受部分家庭版/单项重考形式，按当年页面核对。',level:HARD},
    tests:{headline:'GMAT / GRE 可选',detail:'好成绩会在边缘或竞争性申请中起正面作用；官网无最低分。金融科技/量化取向可参考 Quant 165–168+，但不是校方门槛。',level:INFO},
    writing:[{name:'Personal Statement',limit:'官网公开页未列统一字数',focus:'项目动机、相关课程/实习、职业目标及为何选择港大与香港；按系统字符限制完成。',level:HARD}],
    references:{headline:'2 位推荐人，至少 1 位学术推荐人',detail:'学术推荐人需使用可核验的院校官方主页/邮箱；推荐内容应具体说明课程表现与分析能力。',level:HARD},
    extra:[{name:'实习 / 工作证明',detail:'提交有效的实习证明或最近一份全职工作证明；职业资格证书可选。',level:HARD},{name:'录制视频',detail:'学校可能要求录制 admission video，题目与时间窗以申请系统通知为准。',level:INFO},{name:'申请费与补件',detail:'2027 intake 申请费为 HK$780；FAQ 要求在所选轮次截止后 2 个工作日内完成系统指定文件提交。',level:HARD},{name:'2027 学费与留位费',detail:'MFin、MFinTech 与 Master of Wealth Management 当前公布学费均为 HK$508,000，首笔留位费 HK$169,000；以录取通知和缴费页面为准。',level:INFO}],
    sources:[{url:'https://masters.hkubs.hku.hk/admissions/',label:'HKU Business School Masters Admissions',type:HARD}]
  });

  add([201],{
    language:{headline:'分别满足 Yale MBA 与 Asset Management 的英语规则',detail:'AM 对符合条件的非英语母语申请人要求 TOEFL/IELTS/DET，但不公布最低分；MBA 端按当期申请说明。',level:HARD},
    tests:{headline:'GMAT / GRE 必交',detail:'两个项目均独立审核；官网无最低分。本站准备建议 GRE 330+ 或 GMAT Focus 685+，不是录取线。',level:HARD},
    writing:[{name:'Yale MBA 文书 + AM 500 词短文',limit:'分别按两个申请系统',focus:'MBA 的领导与使命叙事不能替代 AM 的短期/长期投资职业目标说明。',level:HARD}],
    references:{headline:'按两个项目分别提交',detail:'MBA 与 AM 的推荐人数量、表格及截止时间分别核验；AM 需 2 封。',level:HARD},
    extra:[{name:'独立录取',detail:'必须同时获得 Yale MBA 和 MMS Asset Management 录取，不能只申请一个联合入口。',level:HARD}],
    sources:[{url:'https://som.yale.edu/programs/mms-asset-management/admissions/application-information',label:'Yale AM Application',type:HARD},{url:'https://som.yale.edu/programs/mba/admissions/application-information',label:'Yale MBA Application',type:HARD}]
  });
  add([202,203,204],{
    language:{headline:'先满足首年学校的语言要求',detail:'若同步申请，从 HKUST / HEC / UBC 的首年项目开始；Yale GBS 页面未单列统一 IELTS 最低分，须同时核验两校规则。',level:HARD},
    tests:{headline:'Yale GBS 要求官方 GMAT / GRE',detail:'官网无最低分；首年学校若有额外测试政策也必须满足。'+fPlan,level:HARD},
    writing:[{name:'Yale GBS 3 道短文',limit:'每题最多 300 词',focus:'个人成长经历、职业/个人目标、为什么该双学位与两校资源不可替代。',level:HARD}],
    references:{headline:'1 封职业推荐 + 首年学校确认',detail:'Yale 端需要职业推荐，并由首年项目 Dean/Director 确认 good standing；首年学校的推荐信另行准备。',level:HARD},
    cv:{headline:'Yale 端 1 页简历',detail:'还要按首年学校规则上传简历。',level:HARD},
    extra:[{name:'提交后视频',detail:'Yale 通常要求在提交后 24 小时内完成视频问题，准确窗口以邀请邮件为准。',level:HARD}],
    sources:[{url:'https://som.yale.edu/programs/mms-global-business-and-society/admissions/application-information',label:'Yale GBS Application Information',type:HARD}]
  });
  add([205],{
    language:{headline:'MFE 与 Oxford MBA 均须满足英语条件',detail:'MFE 通常为 Oxford Higher level：IELTS 7.5、单项 7.0；MBA 端另按 Saïd 当期政策。',level:HARD},
    tests:{headline:'GMAT / GRE 必交',detail:'MFE 和 MBA 端均会审阅标化，官网无统一最低分。本站建议 GRE 330+ 或 GMAT Focus 685+，不是门槛。',level:HARD},
    writing:[{name:'MFE 500 词文书 + MBA 文书',limit:'分别按两个项目系统',focus:'除各自项目动机外，说明为什么需要先金融经济学、后综合管理，以及两年路径的职业逻辑。',level:HARD}],
    references:{headline:'两套推荐要求',detail:'分别满足 MFE 与 MBA 的推荐人数量、类型和截止时间。',level:HARD},
    extra:[{name:'1+1 双重申请',detail:'必须分别达到两个项目录取标准；在申请中明确选择 1+1 路径。',level:HARD}],
    sources:[{url:'https://www.sbs.ox.ac.uk/oxford-experience/oxford-11-mba',label:'Oxford 1+1 MBA',type:HARD}]
  });
  add([206],{
    language:{headline:'MLF 为 Oxford Higher level：IELTS 7.5、单项 7.0',detail:'TOEFL 旧制 110，单项 L22/R24/S25/W24；MBA 端还需满足其英语政策。',level:HARD},
    tests:{headline:'MLF 不寻求 GRE / GMAT；MBA 端要求 GMAT / GRE',detail:'同一双学位两部分政策不同。MBA 无最低分；本站准备建议 GRE 330+ 或 GMAT Focus 685+。',level:HARD},
    writing:[{name:'MLF Personal Statement',limit:'最多 300 词',focus:'法律与金融交叉动机、相关背景和职业目标。',level:HARD},{name:'法律写作样本',limit:'英文、不超过 2,000 词',focus:'提交能体现法律分析与论证能力的独立作品。',level:HARD},{name:'MBA 文书',limit:'按当期 Saïd 系统',focus:'领导力、职业目标与 1+1 两阶段逻辑。',level:HARD}],
    references:{headline:'MLF 3 封，至少 2 封学术推荐；MBA 另行核验',detail:'法学教师应能具体评价法律分析和写作能力。',level:HARD},
    cv:{headline:'MLF CV 1–2 页',detail:'MBA 端如有格式要求也须分别遵守。',level:HARD},
    extra:[{name:'法律背景',detail:'需要法律本科或认可的同等法律资格。',level:HARD}],
    sources:[{url:'https://www.ox.ac.uk/admissions/graduate/courses/msc-law-and-finance',label:'Oxford MSc Law and Finance',type:HARD},{url:'https://www.sbs.ox.ac.uk/oxford-experience/oxford-11-mba',label:'Oxford 1+1 MBA',type:HARD}]
  });
  add([207],{
    language:{headline:'CS 端按 Stanford 研究生院：IELTS 7.0；TOEFL 旧制 90 / 新制 4.5',detail:'MBA 端按 GSB 英语政策；符合统一豁免规则可不交。',level:HARD},
    tests:{headline:'MBA 要求 GMAT / GRE；CS 不要求且不考虑 GRE',detail:'必须理解两个学院政策相反；MBA 无最低分。本站建议以 GRE 330+ 或 GMAT Focus 685+ 作为准备目标。',level:HARD},
    writing:[{name:'MBA Essay 1',limit:'最多 650 词',focus:'What matters most to you, and why? 用个人选择与价值观回答。',level:HARD},{name:'MBA Essay 2',limit:'最多 350 词',focus:'Why Stanford? 说明 Stanford 对目标的不可替代性。',level:HARD},{name:'CS Statement of Purpose',limit:'不超过 2 页，单倍行距',focus:'计算机准备、专业兴趣、目标及课程/研究匹配。',level:HARD}],
    references:{headline:'MBA 与 CS 分别提交；CS 3 封',detail:'CS 官方建议至少 2 封学术推荐；MBA 推荐按 GSB 当期表格。',level:HARD},
    extra:[{name:'独立申请与录取',detail:'必须被 MBA 与 MSCS 分别录取后才能完成联合学位规划。',level:HARD}],
    sources:[{url:'https://www.gsb.stanford.edu/programs/mba/academic-experience/joint-dual-degrees/ms-cs',label:'Stanford MBA + MSCS Joint Degree',type:HARD},{url:'https://www.gsb.stanford.edu/programs/mba/admission/application/essays',label:'Stanford MBA Essays',type:HARD},{url:'https://www.cs.stanford.edu/admissions/graduate-application-checklists',label:'Stanford CS Application Checklist',type:HARD}]
  });

  add([301],{
    language:{headline:'IELTS 7.0；TOEFL 90',detail:'符合 Berkeley 规定的英语授课学位等条件者可豁免。',level:HARD},
    tests:{headline:'GMAT / GRE 必交；特定高 GPA 或博士申请人可豁免',detail:'官网以数量部分 90 百分位作为有竞争力参考；不是总分录取线。',level:HARD},
    writing:[{name:'申请短文',limit:'当期申请系统显示',focus:'量化准备、职业目标、团队贡献和 Berkeley MFE 的具体资源匹配。',level:HARD},{name:'视频短答',limit:'不超过 2 分钟，最多 2 次录制',focus:'按当期题目清晰、自然地回答。',level:HARD}],
    references:{headline:'2 封推荐信',detail:'选择能具体评价数量能力、编程、职业表现与团队合作的人。',level:HARD},
    cv:{headline:'建议 1 页简历',detail:'突出可量化的技术/金融成果、课程和工作经历。',level:INFO},
    extra:[{name:'邀请制面试',detail:'面试会核验数量背景、职业目标和项目匹配。',level:INFO}],
    sources:[{url:'https://mfe.haas.berkeley.edu/admissions/requirements',label:'Berkeley MFE Requirements',type:HARD},quantNet]
  });
  add([302],{
    language:{headline:'TOEFL / IELTS / DET / PTE：按 Columbia Engineering 规则',detail:'非英语授课背景者提交；项目页未公开统一数值最低线，以当年工程学院申请系统为准。',level:HARD},
    tests:{headline:'2026 工程学院 GRE 可选',detail:'未来申请季可能调整；若提交，'+qPlan,level:INFO},
    writing:[{name:'Personal Statement',limit:'按 Columbia Engineering 系统',focus:'金融工程目标、数学/编程准备、项目经历与 IEOR 方向匹配。',level:HARD}],
    references:{headline:'3 封推荐信',detail:'优先覆盖数量课程/研究和实习/工作两类证据。',level:HARD},
    extra:[{name:'视频面试',detail:'工程学院 MS 申请通常包含视频环节；题目和录制规则以当期系统为准。',level:INFO}],
    sources:[{url:'https://ieor.columbia.edu/masters-admissions-faqs',label:'Columbia IEOR Masters Admissions FAQ',type:HARD},{url:'https://www.engineering.columbia.edu/sites/default/files/2026-05/Fall%202026%20Columbia%20Engineering%20Brochure.pdf',label:'Columbia Engineering Fall 2026 Brochure',type:HARD},quantNet]
  });
  add([303],{
    language:{headline:'TOEFL / IELTS / DET：按 MSCF 当期政策',detail:'官网要求符合条件的国际申请人提交，当前公开申请页未列统一最低分。',level:HARD},
    tests:{headline:'GMAT / GRE 必交',detail:'无公开最低分；'+qPlan,level:HARD},
    writing:[{name:'职业路径短文',limit:'最多 350 词',focus:'项目将如何补足技能并推动目标职业。',level:HARD},{name:'挑战短文',limit:'最多 350 词',focus:'具体挑战、行动、结果与反思。',level:HARD},{name:'视频',limit:'90 秒',focus:'为获得一次机会采取了哪些步骤/资源，以及它如何促进职业发展。',level:HARD},{name:'Optional Essay',limit:'最多 2 页',focus:'只用于解释异常或补充主材料无法呈现的重要信息。',level:INFO}],
    references:{headline:'3 封推荐信',detail:'近期学生至少一封学术推荐；项目偏好至少一封职业推荐。应评价数学、统计、编程、金融、英语与团队能力。',level:HARD},
    cv:{headline:'1–2 页简历，12 号字',detail:'工作和实习写明起止月份。',level:HARD},
    sources:[{url:'https://www.cmu.edu/mscf/admissions/apply.html',label:'CMU MSCF Apply',type:HARD},quantNet]
  });
  add([304],{
    language:{headline:'TOEFL 低于 100 通常不建议申请；IELTS 也接受',detail:'官网未单列 IELTS 最低分；英语豁免按 NYU GSAS 规则。',level:INFO},
    tests:{headline:'GRE Mathematics Subject Test 预期提交；GRE General 不要求也不接受',detail:'若确实无法参加数学专项考试，需随申请附简短说明。',level:HARD},
    writing:[{name:'Statement of Purpose',limit:'按 NYU GSAS 系统',focus:'数学成熟度、金融数学兴趣、课程/研究/项目准备与职业方向。',level:HARD}],
    references:{headline:'通常 3 封推荐信',detail:'官方强烈建议至少 2 封来自数学或科学教师，具体评价理论和解题能力。',level:INFO},
    sources:[{url:'https://math.nyu.edu/dynamic/graduate/ms-gsas/admission/',label:'NYU Mathematics MS Admission',type:HARD},quantNet]
  });
  add([305],{
    language:{headline:'IELTS 7.0；TOEFL 90',detail:'这是官网最低分，项目同时说明更高分会更有竞争力。',level:HARD},
    tests:{headline:'GRE 可选；不接受 GMAT',detail:'若提交，'+qPlan,level:HARD},
    writing:[{name:'Candidate Statement 1',limit:'最多 250 词',focus:'目前最显著的准备短板，以及已采取/计划采取的补强步骤。',level:HARD},{name:'Candidate Statement 2',limit:'最多 250 词',focus:'项目、大学与城市如何支持职业目标。',level:HARD},{name:'Candidate Statement 3',limit:'最多 250 词',focus:'补充申请其他部分没有体现的重要信息。',level:HARD},{name:'2 个 Video Statements',limit:'按申请系统计时',focus:'独立完成，核验沟通、动机和即时组织能力。',level:HARD}],
    references:{headline:'3 封推荐信；至少 1 封职业推荐',detail:'其他推荐可来自学术或职业场景，必须提供具体评价。',level:HARD},
    cv:{headline:'完整履历简历',detail:'列明全部教育/工作经历的日期、地点及全职/兼职状态。',level:HARD},
    sources:[{url:'https://finmath.uchicago.edu/admissions/application-requirements/',label:'UChicago FinMath Application Requirements',type:HARD},quantNet]
  });
  add([306],{
    language:{headline:'IELTS 7.5；TOEFL 旧制 105（并有单项要求）',detail:'Cornell Engineering 的统一要求可能随 TOEFL 新制更新；提交前核对当期研究生院换算表。',level:HARD},
    tests:{headline:'当前周期 GRE 不要求',detail:'若下一周期政策变化，以 ORIE MEng 页面为准；不要主动送无入口的成绩。',level:INFO},
    writing:[{name:'Academic Statement of Purpose',limit:'通常约 1–1.5 页；以系统为准',focus:'ORIE/金融工程学术准备、目标与课程资源匹配。',level:HARD},{name:'Personal Statement',limit:'按 Cornell Graduate School 系统',focus:'个人经历、视角、挑战和对共同体的贡献。',level:HARD}],
    references:{headline:'2 封必需，3 封更佳',detail:'至少一封应能评价概率、优化、统计或计算能力。',level:INFO},
    extra:[{name:'异步视频',detail:'申请系统可能包含录制式视频问题，按当期提示完成。',level:INFO}],
    sources:[{url:'https://www.orie.cornell.edu/orie/programs/meng-degree-ithaca/admissions',label:'Cornell ORIE MEng Admissions',type:HARD},quantNet]
  });
  add([307],{
    language:{headline:'LSE Standard：IELTS 7.0、四项均 6.5',detail:'TOEFL 旧制 100，R23/L22/W24/S22；新制换算及豁免按 2026/27 英语页。',level:HARD},
    tests:{headline:'项目页未要求 GRE / GMAT',detail:'不要把 LSE 其他商科项目的测试要求套用到 Financial Mathematics。',level:HARD},
    writing:[{name:'Statement of Academic Purpose',limit:'按 LSE 申请系统',focus:'数学背景、金融数学兴趣、目标与 LSE 课程的具体联系。',level:HARD}],
    references:{headline:'2 封学术推荐信',detail:'重点证明数学训练、课程表现和独立学习能力。',level:HARD},
    sources:[{url:'https://www.lse.ac.uk/study-at-lse/graduate/msc-financial-mathematics',label:'LSE MSc Financial Mathematics',type:HARD},{url:'https://www.lse.ac.uk/study-at-lse/Graduate/Prospective-students/Entry-requirements/English-language-requirements',label:'LSE English Requirements',type:HARD}]
  });
  add([308],{
    language:{headline:'IELTS 7.0，单项 6.5；TOEFL 旧制 100、各项 22',detail:'TOEFL 新制为总分 5.0、各项 5.0；DET 125、单项 115。提交申请时可暂不交，但满足条件会增强完整度。',level:HARD},
    tests:{headline:'GMAT / GRE 非必需，但可增强申请',detail:'Imperial 说明 GMAT 旧制至少 600、当前平均约 666；新考试更重视百分位和均衡性。GRE 未公布目标，Quant 可按 167+ 规划。',level:INFO},
    writing:[{name:'3 道 Personal Statement Questions',limit:'当期申请系统显示',focus:'项目动机、经历、个人贡献和申请匹配。',level:HARD},{name:'Career Planning Question',limit:'当期系统显示',focus:'短期/长期职业目标、目标岗位与行动计划。',level:HARD},{name:'Quantitative Experience Statement',limit:'最多列 5 门课程',focus:'写课程主题、难度层级和实际掌握情况。',level:HARD},{name:'Programming / Software Statement',limit:'按系统',focus:'编程语言、软件、熟练度及实际项目证据。',level:HARD}],
    references:{headline:'2 封推荐信',detail:'可为 2 封学术，或 1 封学术 + 1 封职业；有工作经验者通常建议包含当前主管。',level:HARD},
    extra:[{name:'Kira 在线录制面试',detail:'入围后完成；用于评估动机、表达和项目匹配。',level:HARD}],
    sources:[{url:'https://www.imperial.ac.uk/business-school/masters/risk-management/admissions/',label:'Imperial RMFE Admissions',type:HARD}]
  });
  add([309],{
    language:{headline:'接受 TOEFL / TOEIC / IELTS / Cambridge；官网未公开统一最低分',detail:'符合 HEC 英语学位等豁免规则者可不交；其他申请人按当期系统提交。',level:INFO},
    tests:{headline:'GMAT / GRE / TAGE MAGE 必交',detail:'官网无最低分。'+fPlan,level:HARD},
    writing:[{name:'Motivation Questions',limit:'当期 HEC 申请系统显示',focus:'国际金融动机、目标方向、学术/实习准备和选择 HEC 的理由。',level:HARD}],
    references:{headline:'2 份在线推荐；至少 1 位学术推荐人',detail:'一位应为教授；第二位可来自学术或职业场景，需具体评价分析能力、表现和潜力。',level:HARD},
    cv:{headline:'1 页 CV',detail:'当前项目页明确要求一页；突出金融/数量课程、实习成果、领导协作和国际经历。',level:HARD},
    extra:[{name:'英语 Zoom 面试',detail:'入围后通常进行约 30 分钟线上面试，可能包含金融或数量技术问题，并评估动机与职业目标。',level:HARD},{name:'申请费',detail:'当前项目页列明 €190；缴费后申请才完整。',level:HARD}],
    sources:[{url:'https://www.hec.edu/en/masters-programs/msc-international-finance/admissions',label:'HEC MIF Admissions',type:HARD}]
  });
  add([310],{
    language:{headline:'英语 C1 水平',detail:'认可考试与分数换算按 UZH 当期英语证明清单；申请时不要只写“英语授课”而不核验是否满足豁免。',level:HARD},
    tests:{headline:'GMAT / GRE 自愿提交',detail:'无最低分；若用于增强量化证明，'+qPlan,level:INFO},
    writing:[{name:'Motivation Letter',limit:'最多 1 页，11 号字',focus:'为什么选择该联合项目、研究/课程兴趣、职业路径，以及你的数量优势与准备。',level:HARD},{name:'Course Summary',limit:'最多 6 页，11 号字',focus:'按项目模板清楚映射数学、统计、经济、金融与计算课程，避免只上传课程名称。',level:HARD}],
    references:{headline:'2 封英文推荐信',detail:'由教师或雇主使用正式抬头提交；评价总体能力、动机、成熟度、分析力、主动性/创造力、研究与书面口头表达。',level:HARD},
    extra:[{name:'推荐信格式',detail:'推荐信最多 2 页、11 号字；推荐人最晚须在 2027 年 1 月 22 日提交。',level:HARD},{name:'技术面试',detail:'入围者可能在 3 月参加 Zoom 技术面试；应准备概率、统计、计量、数学金融与编程基础。',level:INFO},{name:'最多 3 份补充材料',detail:'可上传额外推荐、雇主证明、论文或毕业论文摘要；只交真正增量的信息。',level:INFO}],
    sources:[{url:'https://www.msfinance.uzh.ch/en/admission/onlineapplication.html',label:'UZH ETH Quantitative Finance Application',type:HARD}]
  });
  add([311],{
    language:{headline:'IELTS 6.5，单项 5.5；TOEFL 旧制 80 / 新制 4.5',detail:'必须在一次考试中达到；家庭版不接受。全英语学位或英语母语者可按规则豁免。',level:HARD},
    tests:{headline:'GMAT / GRE 非强制，但官方高度建议',detail:'无最低分；量化金融科技申请可把 GRE Quant 167+ 作为本站准备建议。',level:INFO},
    writing:[{name:'Personal Statement',limit:'当期系统显示',focus:'金融科技动机、数学/编程基础、技术项目、职业目标与 HKUST 资源匹配。',level:HARD}],
    references:{headline:'通常 2 封推荐信',detail:'优先包含能评价数学/编程能力的学术推荐。',level:INFO},
    extra:[{name:'先修背景',detail:'编程与数学背景受偏好；用成绩单和项目成果具体证明。',level:INFO}],
    sources:[{url:'https://seng.hkust.edu.hk/academics/taught-postgraduate/msc-fintech',label:'HKUST MSc FinTech',type:HARD},{url:'https://prog-crs.hkust.edu.hk/pgprog/2026-27/mphil-phd-iip',label:'HKUST 2026/27 English Requirements',type:HARD}]
  });
  add([312],{
    language:{headline:'IELTS 6.0；TOEFL 旧制 85',detail:'符合 NUS 规定英语背景者可按规则豁免；TOEFL 新制换算按当期页面。',level:HARD},
    tests:{headline:'GMAT / GRE 可选',detail:'官网不把标化列为必交。若提交量化证明，GRE Quant 167+ 可作为本站准备建议。',level:INFO},
    writing:[{name:'Personal Statement',limit:'当期系统显示',focus:'数量准备、金融工程兴趣、相关项目/实习和在亚洲发展的职业计划。',level:HARD}],
    references:{headline:'至少 1 位推荐人',detail:'优先选择能具体评价数量课程、研究或技术项目的人。',level:HARD},
    sources:[{url:'https://rmi.nus.edu.sg/mfe-program/admission/',label:'NUS MFE Admission',type:HARD}]
  });
  add([313],clone(R[206]||{}));
  if(R[313]){
    R[313].tests={headline:'不要求 GRE / GMAT',detail:'Oxford MLF 课程页明确不寻求这两项成绩。',level:HARD};
    R[313].writing=R[313].writing.filter(x=>x.name!=='MBA 文书');
    R[313].references={headline:'3 封推荐信；至少 2 封学术推荐',detail:'推荐人应具体评价法律分析、写作与研究能力。',level:HARD};
    R[313].extra=[{name:'法律背景',detail:'需要法律本科或认可的同等法律资格；通常不面试。',level:HARD}];
    R[313].sources=[{url:'https://www.ox.ac.uk/admissions/graduate/courses/msc-law-and-finance',label:'Oxford MSc Law and Finance',type:HARD}];
  }
  add([314],{
    language:{headline:'IELTS 7.5，四项均 7.0；TOEFL 旧制 110、各项 25',detail:'Cambridge 对该项目的英语最低要求。',level:HARD},
    tests:{headline:'GMAT / GRE 可选',detail:'学术成绩边缘时可辅助证明分析能力；官网未给目标分。'+qPlan,level:INFO},
    writing:[{name:'Statement of Interest',limit:'500 词 / 5,000 字符以内',focus:'房地产金融兴趣、学术准备、职业目标和 Cambridge Land Economy 匹配。',level:HARD},{name:'Research Title & Summary',limit:'按系统字段',focus:'提出清晰、可行且与项目相关的研究主题。',level:HARD}],
    references:{headline:'2 封推荐信',detail:'至少一封应能评价学术与研究能力。',level:HARD},
    sources:[{url:'https://www.postgraduate.study.cam.ac.uk/courses/directory/lelempref',label:'Cambridge MPhil Real Estate Finance',type:HARD}]
  });
  add([315],{
    language:{headline:'MS&E 期望 IELTS 7.5；TOEFL 旧制 100',detail:'这是 MS&E 当前申请页列出的项目级要求，高于 Stanford 研究生院通用最低线；考试必须在截止日前完成。新制换算按当期页面。',level:HARD},
    tests:{headline:'GRE 按当前 MS&E 周期要求提交',detail:'2025 录取者官方均值：GRE Quant 167、Verbal 159、AWA 3.9；这是班级均值，不是最低线。',level:HARD},
    writing:[{name:'Statement of Purpose',limit:'不超过 2 页、单倍行距',focus:'优化/概率/数据准备、Financial Analytics 兴趣、职业目标及 MS&E 资源匹配。',level:HARD},{name:'Optional Paper Abstract',limit:'最多 2 页、单倍行距，可附全文链接',focus:'仅在已有代表性研究论文时提交。',level:INFO}],
    references:{headline:'3 封推荐信',detail:'优先包含能评价数量课程、研究/技术项目和职业表现的人。',level:HARD},
    sources:[{url:'https://msande.stanford.edu/academics-admissions/graduate/admission',label:'Stanford MS&E Admission',type:HARD},{url:'https://msande.stanford.edu/academics-admissions/graduate/admission/ms-admission-statistics',label:'Stanford MS Admission Statistics',type:HARD}]
  });
  add([316],{
    language:{headline:'TOEFL / IELTS / PTE：符合条件者提交',detail:'没有全英语学位者通常需要；官网候选人画像中 TOEFL 平均约 110，但这不是最低分。',level:INFO},
    tests:{headline:'GMAT / GRE 必交',detail:'官网无最低分；量化竞争力建议重点看 GRE Quant 168+ 或等效 GMAT Quant，属于本站规划建议。',level:HARD},
    writing:[{name:'Essay 1',limit:'250–500 词',focus:'教育目标和最重要的学术/专业成就。',level:HARD},{name:'Essay 2',limit:'250–500 词',focus:'希望走的职业路径，以及为什么 MSFE 是必要选择。',level:HARD}],
    references:{headline:'2 封推荐信，可最多提交 4 封',detail:'教授或经理均可；质量和具体性比数量更重要。',level:HARD},
    cv:{headline:'详细简历',detail:'列出学术资历及高中以后所有相关经历。',level:HARD},
    sources:[{url:'https://academics.business.columbia.edu/msfe/admissions/application-requirements',label:'Columbia MSFE Application Requirements',type:HARD},{url:'https://academics.business.columbia.edu/ms/master-science-financial-economics/msfe-admissions/msfe-candidate-profile',label:'Columbia MSFE Candidate Profile',type:HARD},quantNet]
  });
  add([317],{
    language:{headline:'IELTS 7.5；TOEFL 旧制 100 / 新制 5.5',detail:'Columbia GSAS 最低要求；也接受 DET 等当期列明考试。',level:HARD},
    tests:{headline:'GRE General：不要求',detail:'Columbia GSAS 当前项目页将 GRE General 标为 “No”；不要为本项目额外送 GRE/GMAT。',level:HARD},
    writing:[{name:'Statement of Academic Purpose',limit:'通常最多 1,000 词',focus:'开头明确主要目标，并说明数量课程、金融数学兴趣与 Columbia 资源匹配。',level:INFO},{name:'Personal Statement',limit:'按 GSAS 系统',focus:'个人经历、视角以及如何为学术共同体作出贡献。',level:HARD}],
    references:{headline:'3 封推荐信；至少 2 封学术推荐',detail:'重点评价高阶数学、理论理解和解决问题能力。',level:HARD},
    sources:[{url:'https://www.gsas.columbia.edu/content/mathematics-finance',label:'Columbia GSAS Mathematics of Finance',type:HARD},quantNet]
  });
  add([318],{
    language:{headline:'IELTS 7.0；TOEFL 约 90（按 Tandon 当期表）',detail:'也接受 PTE 等；符合英语授课背景豁免规则者可不交。',level:HARD},
    tests:{headline:'GRE 可选',detail:'官方近期入学班级 GRE Quant 平均约 168.6；这是画像，不是最低分。',level:INFO},
    writing:[{name:'Statement of Purpose',limit:'通常 1–2 页、双倍行距',focus:'为什么该项目、学术/职业兴趣、目标及技术准备。',level:INFO},{name:'Video Essay',limit:'约 1 分钟',focus:'按申请系统题目展示动机、表达和个人特点。',level:HARD}],
    references:{headline:'2 封推荐信',detail:'至少一封应能评价数量与编程能力。',level:HARD},
    sources:[{url:'https://engineering.nyu.edu/academics/programs/financial-engineering-ms',label:'NYU Tandon Financial Engineering',type:HARD},{url:'https://engineering.nyu.edu/admissions/graduate/apply/requirements',label:'NYU Tandon Graduate Requirements',type:HARD},quantNet]
  });
  add([319],{
    language:{headline:'IELTS 7.0；TOEFL 旧制 87',detail:'TOEFL 单项 W25/S24/R21/L17；多数录取者 TOEFL 超过 100。IELTS 7.5 或 TOEFL 100 可避免部分入学英语测试。',level:HARD},
    tests:{headline:'GMAT / GRE 必交；博士申请人可豁免',detail:'官方期望值：GRE Quant 168、Verbal 158；GMAT Focus 655（旧制约 710）。这些是竞争性参考，不是最低线。',level:HARD},
    writing:[{name:'Essay 1',limit:'最多 750 词',focus:'一个同时体现分析力与创造力的项目：问题、方法、个人贡献和结果。',level:HARD},{name:'Essay 2',limit:'最多 750 词',focus:'为什么选择数量金融职业，以及 UCLA MFE 如何支持目标。',level:HARD},{name:'Optional Essay',limit:'最多 375 词',focus:'只解释异常、空档或其他必要补充。',level:INFO}],
    references:{headline:'2 封推荐信',detail:'系统可能显示第三推荐入口，但项目要求以两封为核心；选择能提供具体例证的人。',level:HARD},
    sources:[{url:'https://www.anderson.ucla.edu/degrees/master-of-financial-engineering/admissions/requirements',label:'UCLA MFE Requirements',type:HARD},{url:'https://yocket.com/universities/ucla-anderson-school-of-management/financial-engineering-55980',label:'Yocket UCLA MFE 数据库（交叉核验）',type:THIRD},quantNet]
  });
  add([320],{
    language:{headline:'接受 TOEFL / IELTS / DET 等；官网未公开统一最低分',detail:'英语国家学位/工作经历或高 GMAT/GRE Verbal 百分位可能满足豁免条件，按当期说明核验。',level:INFO},
    tests:{headline:'GMAT / GRE 可选',detail:'无最低分。金融硕士更看整体学术、实习与职业动机；如提交，本站建议 GRE 325+ 或 GMAT Focus 655+。',level:INFO},
    writing:[{name:'Personal Statement',limit:'当期申请系统显示',focus:'申请目的、职业目标与 Vanderbilt MSF 的具体匹配。',level:HARD},{name:'Optional Statement',limit:'按系统',focus:'解释成绩异常、空档或其他必须说明的情况。',level:INFO},{name:'Video Response',limit:'按系统计时',focus:'自然交流，不背稿；展示个人特质与表达。',level:HARD}],
    references:{headline:'1 封推荐信',detail:'必须在轮次截止前完成，选择最能评价学业/实习表现的人。',level:HARD},
    extra:[{name:'Kira 面试',detail:'邀请制，通常包含 4 道口头题和 1 道书面题；以邀请邮件为准。',level:INFO}],
    sources:[{url:'https://business.vanderbilt.edu/masters-in-finance/admissions/application-instructions/',label:'Vanderbilt MSF Application Instructions',type:HARD}]
  });
  add([321],{
    language:{headline:'IELTS 7.0；TOEFL 目标/项目要求 95',detail:'Rackham 绝对最低 TOEFL 较低，但 QFRM 页面建议/要求更高分，应按项目页面执行。',level:HARD},
    tests:{headline:'GRE 必交；Michigan 本校数学学生可按规则豁免',detail:'不接受 GMAT 替代；官网无目标分。本站建议 Quant 167+。',level:HARD},
    writing:[{name:'Statement of Purpose',limit:'按 Rackham 系统',focus:'数学背景、学习与职业目标、项目匹配。',level:HARD},{name:'Personal Statement',limit:'按 Rackham 系统',focus:'个人背景、挑战、成长和继续深造的动力。',level:HARD}],
    references:{headline:'3 封推荐信',detail:'优先覆盖数学课程、编程/研究项目和职业实践。',level:HARD},
    cv:{headline:'1 页简历',detail:'浓缩数量课程、项目、研究、实习和工具。',level:HARD},
    sources:[{url:'https://sites.lsa.umich.edu/quant/apply/',label:'Michigan QFRM Apply',type:HARD},quantNet]
  });
  add([322],{
    language:{headline:'IELTS 7.0；R/L/S 6.5、W 5.5',detail:'TOEFL 旧制 90 且各项 19；新制总分 4.5，R/L/W 4、S 3.5。不接受 DET。',level:HARD},
    tests:{headline:'GRE / GMAT 必交；美国四年制本科 GPA≥3.7 或博士可申请豁免',detail:'无最低分；多次成绩会重点看更高数量部分。本站建议 GRE Quant 167+。',level:HARD},
    writing:[{name:'主文书',limit:'最多 750 词',focus:'申请动机、职业路径与 QCF 匹配。',level:HARD},{name:'项目 / 研究短文',limit:'最多 750 词',focus:'项目意义、方法、结果和经验。',level:HARD},{name:'编程短文',limit:'最多 500 词',focus:'语言、熟练度和实际应用。',level:HARD},{name:'Optional Explanation',limit:'最多 250 词',focus:'解释成绩或经历异常。',level:INFO}],
    references:{headline:'3 封推荐信',detail:'具体评价数量、编程、研究/项目和职业能力。',level:HARD},
    extra:[{name:'面试',detail:'通常围绕简历、项目、学术背景和行为问题。',level:INFO}],
    sources:[{url:'https://qcf.gatech.edu/prospective-students/application-requirements',label:'Georgia Tech QCF Requirements',type:HARD},{url:'https://grad.gatech.edu/english-proficiency',label:'Georgia Tech English Proficiency',type:HARD},quantNet]
  });

  const pkuProfessional={
    language:{headline:'无统一 IELTS / TOEFL 硬性门槛',detail:'推免材料通常要求英语能力证明，可提交四六级、雅思、托福或其他可核验证明；以当年夏令营/推免通知为准。',level:INFO},
    tests:{headline:'不要求 GRE / GMAT',detail:'除非当年特定合作方向另行说明，国内推免不以 GRE/GMAT 作为统一门槛。',level:HARD},
    writing:[{name:'个人陈述 / 自述',limit:'当期报名系统或通知给出',focus:'专业动机、课程与实践证据、发展目标和光华匹配；不虚构统一字数。',level:HARD}],
    references:{headline:'通常 3 封在线推荐信',detail:'一般至少 2 位副教授及以上推荐人；精确数量和职称要求以当年院系通知为准。',level:INFO},
    cv:{headline:'中英文或中文简历',detail:'按通知模板整理成绩排名、实习、科研/竞赛、领导力和社会实践。',level:INFO},
    extra:[{name:'推免核心材料',detail:'前五学期成绩单与排名、推免资格证明、身份证明、英语成绩、奖项/科研/实习证明（如有）。',level:HARD},{name:'夏令营 / 综合考核',detail:'入营后可能含专业面试、英语、展示或笔试；题型以当年通知为准。',level:INFO}],
    sources:[{url:'https://www.gsm.pku.edu.cn/graduate/index.htm',label:'北京大学光华管理学院研究生招生',type:HARD}]
  };
  add([401,402,403,404,405],pkuProfessional);
  const pkuAcademic=clone(pkuProfessional);
  pkuAcademic.writing=[{name:'个人陈述 / 研究兴趣说明',limit:'当期报名系统或通知给出',focus:'研究问题、方法训练、相关课程/RA/论文经历及目标方向；科研证据比通用职业叙事更重要。',level:HARD}];
  pkuAcademic.references={headline:'通常 3 封在线推荐信',detail:'以学术推荐为主，一般至少 2 位副教授及以上推荐人，重点评价研究潜力与方法能力。',level:INFO};
  pkuAcademic.extra=[{name:'学术准备',detail:'前五学期成绩与排名、研究经历、代表性论文/工作论文/研究报告（如有）、英语与数学/计量训练证明。',level:HARD},{name:'研究成果',detail:'“如有”才提交；应说明研究问题、方法和个人贡献，不能为凑材料虚构论文。',level:INFO}];
  add([410,411,412,413,414,415,416,417,418,419],pkuAcademic);

  const tsinghua={
    language:{headline:'无统一 IELTS / TOEFL 硬性门槛',detail:'通常需提交英语能力证明；可使用四六级、雅思、托福等，具体有效形式按当年院系通知。',level:INFO},
    tests:{headline:'不要求 GRE / GMAT',detail:'清华国内推免项目一般不把 GRE/GMAT 设为统一门槛。',level:HARD},
    writing:[{name:'个人自述',limit:'当期系统/通知给出',focus:'专业动机、学术与实践准备、职业或研究目标及清华资源匹配。',level:HARD}],
    references:{headline:'通常 2 封副教授及以上推荐信',detail:'应具体评价课程表现、分析能力、研究/实践潜力和品格。',level:INFO},
    cv:{headline:'中英文一页简历',detail:'若当年通知要求双语，分别控制在一页；写清成绩排名、课程、实习、项目、研究和领导力成果。',level:INFO},
    extra:[{name:'推免核心材料',detail:'成绩单、专业排名、推免资格、英语证明、身份证明，以及科研/竞赛/实习/荣誉证据（如有）。',level:HARD},{name:'综合考核',detail:'可能包括材料评审、面试、英语或专业考核；严格按当年通知准备。',level:INFO}],
    sources:[{url:'https://www.sem.tsinghua.edu.cn/jyjx/zsxx.htm',label:'清华经管招生信息',type:HARD}]
  };
  add([430,431],tsinghua);
  const tcba=clone(tsinghua);
  tcba.language={headline:'TOEFL 100 或 IELTS 7.5',detail:'双硕士英文培养要求；提交有效官方成绩并同时核验当年豁免与送分政策。',level:HARD};
  tcba.tests={headline:'GRE / GMAT 以当年双学位通知为准',detail:'当前站内摘要不把它列为统一硬门槛；如申请系统要求则必须提交。',level:INFO};
  tcba.writing=[{name:'中英文申请陈述',limit:'按当期双学位系统',focus:'商务分析数量准备、跨文化学习动机、两校资源的互补性及职业目标。',level:HARD}];
  tcba.references={headline:'3 封英文或双语推荐信',detail:'覆盖学术数量能力、项目/研究与领导协作能力。',level:HARD};
  tcba.sources=[{url:'https://masters.sem.tsinghua.edu.cn/',label:'清华经管硕士项目招生',type:HARD}];
  add([432],tcba);
  const tlbs=clone(tsinghua);
  tlbs.language={headline:'清华英语证明 + LBS 英语政策',detail:'LBS 接受 IELTS/TOEFL/Cambridge/PTE/DET，但官网未公开统一最低分；是否豁免由 LBS 判断。',level:INFO};
  tlbs.tests={headline:'LBS 端需 GMAT / GRE 或 CFA Level I 路径',detail:'无统一最低分；LBS MFA 官方建议 GMAT Focus 至少 555。',level:HARD};
  tlbs.writing=[{name:'清华个人自述',limit:'按当期推免通知',focus:'国内推免准备、金融目标与清华资源匹配。',level:HARD},{name:'LBS MFA Essays',limit:'题目与字数按 LBS 当期系统',focus:'职业动机、价值观、领导/团队、为什么 MFA 及对 LBS 社群的贡献。',level:HARD}];
  tlbs.references={headline:'分别满足清华与 LBS 推荐要求',detail:'清华通常为学术推荐；LBS MFA 仅 1 封、职业推荐优先，且须在轮次截止前到齐。',level:HARD};
  tlbs.sources=[{url:'https://www.london.edu/masters-degrees/masters-in-financial-analysis/apply?entry=true',label:'LBS MFA Apply',type:HARD},{url:'https://www.sem.tsinghua.edu.cn/jyjx/zsxx.htm',label:'清华经管招生信息',type:HARD}];
  add([433],tlbs);
  const pbcsf=clone(tsinghua);
  pbcsf.writing=[{name:'个人陈述 / 自述',limit:'按当年五道口夏令营或推免通知',focus:'金融动机、数量与经济金融基础、实习/研究证据、职业目标和学院匹配。',level:HARD}];
  pbcsf.sources=[{url:'https://www.pbcsf.tsinghua.edu.cn/jyjx/zsxx.htm',label:'清华五道口招生信息',type:HARD}];
  add([434],pbcsf);

  (window.GRADPATH_PROGRAMS||[]).forEach(p=>{
    if(!R[p.id]) add([p.id],{
      language:{headline:'按当期项目英语要求',detail:'当前官方公开页未给出可确认的统一最低分；提交前核对豁免、总分、单项和有效期。',level:INFO},
      tests:{headline:'按当期项目测试政策',detail:noPublic,level:INFO},
      writing:[{name:'申请陈述',limit:'以当期申请系统为准',focus:'动机、准备、目标和项目匹配。',level:INFO}],
      references:{headline:'按当期项目要求',detail:'确认数量、推荐人类型和截止时间。',level:INFO}
    });
  });
  window.GRADPATH_REQUIREMENTS=R;
  window.GRADPATH_REQUIREMENT_LEVELS={HARD,INFO,PLAN,THIRD};
})();
