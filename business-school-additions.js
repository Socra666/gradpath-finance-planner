// Official-source additions checked 2026-08-31. Unknown dates are not calendar events.
(function(){
  const INFO='官网说明', HARD='官网硬性要求', PLAN='本站规划建议（非校方门槛）';
  const item=(headline,detail,level=INFO)=>({headline,detail,level});
  const writing=(name,limit,focus,level=HARD)=>({name,limit,focus,level});
  const hec='https://www.hec.edu/en/master-s-programs/';
  const boc='https://www.unibocconi.it/en/applying-bocconi/master-science-and-ma-programs/application-and-admissions/';
  const hecRequirements=(mim)=>({
    language:item('英语证明或符合条件的豁免','接受 IELTS、TOEFL、Cambridge 或四项 TOEIC；本招生页未列最低分。完整英语授课学位须提供授课语言证明。'),
    tests:item('GMAT / GRE / TAGE MAGE','提交成绩并按官网送分；本页未公布竞争性录取分数，不能把经验分数当录取线。',HARD),
    cv:item('CV 最多 1 页','成绩单需涵盖全部高等教育及交换；另附学位或在读证明。',HARD),
    references:item(mim?'1 封学术推荐':'2 封推荐，至少 1 封学术','推荐人通过系统提交，必须在所选轮次截止前到齐。',HARD),
    writing:[writing('项目专属 Essays','题目及字数以当期申请系统为准','先选择并保存目标项目，才能查看题目；不要拿其他 HEC 项目的文书套用。')],
    extra:[{name:'受邀面试',detail:'英语 Zoom 面试约 30 分钟。'+(mim?'讨论背景、动机、兴趣与目标。':'可能含财务或会计技术问题。'),level:INFO},{name:'其他材料',detail:'证件照、在线申请及 €170 申请费。',level:HARD}]
  });
  const records=[
    {id:323,school:'HEC Paris',aliases:'HEC 巴黎高商 AFM 财务 会计',name:'Master in Accounting, Finance & Management',degree:'Master · full-time',field:'Accounting Corporate Finance Management 会计 公司金融 财务管理',tags:['金融优先','财务会计','应届友好'],
      overview:'面向希望结合财务分析、会计与管理能力的申请者；适合公司金融及财务相关职业探索，不是金融工程项目。',
      url:hec+'master-accounting-finance-management',apply:hec+'master-accounting-finance-management/admissions',
      deadline:'R1 2026-10-07；R2 2026-11-26；R3 2027-02-17；R4 2027-04-28（巴黎中午）',
      events:[['2026年10月7日 12:00 CEST','Round 1 截止'],['2026年11月26日 12:00 CET','Round 2 截止'],['2027年2月17日 12:00 CET','Round 3 截止'],['2027年4月28日 12:00 CEST','Round 4 截止']],
      materials:['全部高等教育成绩单、学位或在读证明','1 页 CV','项目专属 Essays','2 封推荐（至少 1 封学术）','GMAT/GRE/TAGE MAGE','英语成绩或豁免证明','证件照、申请费','受邀英语 Zoom 面试'],requirements:hecRequirements(false)},
    {id:324,school:'HEC Paris',aliases:'HEC 巴黎高商 MiM GE 管理',name:'Master in Management — Grande École',degree:'MiM · pre-experience',field:'Management Business 管理 综合商科',tags:['商科补充','综合管理','独立申请'],
      overview:'独立 MiM 项目，与库中 HEC–Yale 双学位分开。面向少量或无全职经验的本科毕业生；如以金融就业为目标，需主动选择金融课程与实习，不应等同于 MIF。',
      url:hec+'master-management',apply:hec+'master-management/admissions',
      deadline:'直接申请：R1 2026-10-07；R2 2026-11-26；R3 2027-02-17；R4 2027-04-26（巴黎中午）',
      events:[['2026年10月7日 12:00 CEST','直接申请 Round 1 截止'],['2026年11月26日 12:00 CET','直接申请 Round 2 截止'],['2027年2月17日 12:00 CET','直接申请 Round 3 截止'],['2027年4月26日 12:00 CEST','直接申请 Round 4 截止']],
      materials:['至少三年本科学位或在读证明','全部高等教育成绩单','1 页 CV','项目专属 Essays','1 封学术推荐','GMAT/GRE/TAGE MAGE','英语成绩或豁免证明','证件照、申请费','受邀英语 Zoom 面试'],requirements:hecRequirements(true)},
    {id:325,school:'ESSEC Business School',aliases:'ESSEC 埃塞克 高商 MIF 法国 新加坡',name:'Master in Finance',degree:'MIF · 1 or 2 years',field:'Finance Financial Markets Corporate Finance 金融 公司金融 金融市场',tags:['金融优先','法国/新加坡','可选金融科技方向'],
      overview:'覆盖公司金融、金融市场以及 FinTech & Analytics（新加坡）方向。三年本科通常进入两年路径，四年本科或硕士可申请一年路径；校区、方向在提交后不能更改。',
      url:'https://www.essec.edu/en/program/master-in-finance/',apply:'https://essec.myapply.online/',deadline:'2027 entry：轮次与开放日待确认',events:[['2027 轮次待确认','当前页面仍显示 2026 入学信息，不把旧周期日期作为新截止日']],
      materials:['认证成绩单及评分标准（含高中后经历）','学位/在读证明','英文 CV 最多 1 页','英文动机信最多 1 页','2 封在线推荐','管理类考试成绩','英语成绩或豁免证明','护照、照片、€120 申请费'],
      requirements:{language:item('IELTS ≥6.5；TOEFL iBT ≥95 或新制 5/6','英语成绩在截止时不超过两年；至少三年完整英语授课高等教育可凭官方证明申请豁免。',HARD),tests:item('GMAT / GRE / TAGE MAGE 必交','GMAT/GRE 有效期五年；未公布录取线。',HARD),cv:item('英文 CV 最多 1 页','非英法文成绩与学历文件需认证翻译。',HARD),references:item('2 封在线推荐','官方强烈建议 1 学术 + 1 职业，并非强制各一封。',HARD),writing:[writing('英文动机信','最多 1 页','说明校区、方向选择与个人职业目标。')],extra:[{name:'申请路径','detail':'依据既有学位决定一年或两年路径；公开流程未列统一面试，不虚构视频题。',level:INFO}]}}
    ,{id:326,school:'ESCP Business School',aliases:'ESCP 欧洲高商 巴黎高商 MSc Finance',name:'MSc — Finance Specialisation',degree:'MSc · full-time',field:'Finance Corporate Finance Financial Markets 金融 公司金融 金融市场',tags:['金融优先','欧洲商学院','学分要求'],
      overview:'以金融专业训练与行业实践为核心。需本科及至少 180 ECTS；不足 240 ECTS 者还需额外线上学期，应先核对学位学分认定与总学习成本。',
      url:'https://escp.eu/programmes/specialised-masters-MSc/MSc-finance',apply:'https://escp.eu/programmes/specialised-masters-MSc/MSc-finance',deadline:'2027 entry 待公布；官网当前日历仍为 2026 轮次',events:[['2027 轮次待公布','不沿用官网展示的 2026 年截止日']],
      materials:['本科/硕士学位或在读证明','最近两年大学成绩单','CV','两年内英语成绩','护照、证件照','2 封推荐信（强烈建议）','申请费','受邀个人面试'],
      requirements:{language:item('TOEFL / TOEIC Listening & Reading / IELTS','当前项目页未明确最低分，提交前向项目确认；成绩需在两年内。'),tests:item('当前必交清单未列 GMAT/GRE','不能据此推断后续周期永久免试；2027 系统开放后复核。'),references:item('2 封推荐信：强烈建议','官网没有将其列为统一硬性必交。'),writing:[writing('动机与申请内问答','公开页未给出统一 PS 字数','如系统出现额外问题，按字段限制填写；不假定必须另交长篇 PS。',INFO)],extra:[{name:'面试','detail':'初筛通过后，与学术主任及行业人士进行个人面试；时长、视频平台与是否有技术题待邀请通知。',level:INFO},{name:'学分门槛','detail':'本科至少 180 ECTS；不足 240 ECTS 需额外线上学期。',level:HARD}]}}
    ,{id:327,school:'Bocconi University',aliases:'Bocconi 博科尼 博柯尼 米兰 Finance',name:'MSc in Finance — Finance Track',degree:'MSc · 2 years · 120 ECTS',field:'Finance Corporate Finance Investment 金融 公司金融 投资',tags:['金融优先','两年制','国际申请通道'],
      overview:'两年金融硕士，连接公司金融、资产定价、衍生品与计算方法。本记录仅对应普通 Finance Track；Global Experience 是独立志愿和专门申请流程，不套用这里的时间线。',
      url:'https://www.unibocconi.it/en/programs/master-science/finance',apply:boc+'admissions',deadline:'R1 2026-10-29；R2 2027-01-26；R3 2027-03-11；R4 2027-04-29（意大利 23:59）',
      events:[['2026年10月1日','国际申请首轮开放；具体时刻未公布'],['2026年10月29日 23:59 CET','Round 1 截止'],['2027年1月26日 23:59 CET','Round 2 截止'],['2027年3月11日 23:59 CET','Round 3 截止'],['2027年4月29日 23:59 CEST','Round 4 截止']],
      materials:['成绩单、GPA 转换与学位资格证明','GMAT/GRE 或 Bocconi online test','英文 Dossier 与 Motivation','英文自我介绍视频（可选）','英语证明（录取注册阶段必需）','在线申请及 €100 申请费'],
      requirements:{language:item('IELTS Academic ≥6.5，单项 ≥6；TOEFL iBT ≥88','普通 Finance 为 B2；可走官方认可豁免。申请选拔时不必提交，但录取后须满足注册截止，最晚 2027-06-30。',HARD),tests:item('GMAT / GRE / Bocconi online test 三选一','GMAT 旧制最低500、新制485仅为参选资格；GRE 按官网 V/Q 组合表，非单一总分线，不接受 GRE at Home。',HARD),references:item('普通 Finance 必交清单未列推荐信','不要套用其他合作或特殊项目要求。'),writing:[writing('Dossier 与 Motivation','字段与长度依当期系统','用英文提交经历、能力与项目动机；视频介绍可选，涉及自我介绍、国际视野及应对陌生挑战。')],extra:[{name:'适用人群','detail':'本科在读或毕业不足两年者优先考虑；此时间线为国际申请人，不是 Bocconi 本校生通道。',level:INFO}],sources:[{url:boc+'gmat-and-gre-test',label:'Bocconi 标化参选门槛',type:HARD},{url:boc+'language-requirements-mscma-programs',label:'Bocconi 英语与注册要求',type:HARD}]}}
    ,{id:328,school:'University of St. Gallen',aliases:'St Gallen St.Gallen 圣加仑 HSG MBF 瑞士',name:'Master in Banking and Finance',degree:'MA HSG · MBF',field:'Banking Finance Corporate Finance 金融 银行 公司金融',tags:['金融优先','先修学分门槛','瑞士'],
      overview:'银行与金融硕士涵盖金融市场、机构、公司金融与数量方法。商科/经济学相关先修学分是实质门槛，并非任何本科专业都能直接申请。',
      url:'https://www.unisg.ch/en/studying/programmes/master/banking-and-finance-mbf/',apply:'https://www.unisg.ch/en/studying/admission/admission-master/banking-and-finance/',deadline:'R1 2026-11-30；R2 2027-01-31；R3 2027-02-28；R4 2027-03-31；R5 2027-04-30',
      events:[['2026年10月1日','申请开放；具体时刻未公布'],['2026年11月30日','Round 1 截止；具体时刻未公布'],['2027年1月31日','Round 2 截止；具体时刻未公布'],['2027年2月28日','Round 3 截止；具体时刻未公布'],['2027年3月31日','Round 4 截止；具体时刻未公布'],['2027年4月30日','Round 5 截止；具体时刻未公布']],
      materials:['完整成绩单及学位文件','英文 CV、课外活动证明','英文动机信（最多 3 页）','GMAT/GRE','高中毕业资格证明','护照、照片、签署注册协议','必要认证翻译、CHF250 申请费'],
      requirements:{language:item('要求高水平英语；本页未列统一 IELTS 分数','按招生页链接的语言指引确认是否需证书；不将 C1 等级擅自换算成雅思硬门槛。'),tests:item('通常须 GMAT/GRE','五年内有效；瑞士大学本科特定申请者可不交。GRE 评估重点为 Quant。',HARD),references:item('公开材料清单未列推荐信','活动与实习必须附证明，不能只在简历中自述。'),writing:[writing('英文动机信','最多 3 页','说明 MBF 动机、课外活动、国际与工作经历。')],extra:[{name:'学历先修核查','detail':'普通大学相关本科至少180 ECTS，其中商科/经济至少60、数学/统计至少6；应用科学大学另有标准。在读成绩记录须至少120 ECTS。',level:HARD},{name:'官方评审权重','detail':'本科成绩30%、GMAT/GRE 30%、课外活动15%、动机信25%；特定瑞士大学本科免标化者成绩权重加倍。本站匹配分不是这套招生评分的复刻。',level:INFO},{name:'会计知识','detail':'需证明会计基础；不足者须按学校规定补考试。',level:HARD}]}}
    ,{id:329,school:'INSEAD',aliases:'INSEAD 欧洲工商管理学院 枫丹白露 新加坡 MiM',name:'Master in Management',degree:'MiM · pre-experience',field:'Management Business 管理 综合商科',tags:['商科补充','综合管理','Kira测评'],
      overview:'面向早期职业申请人的综合管理硕士，不是 MFin 或 MFE。适合希望拓宽管理与国际商业能力的人；若目标为纯量化，应与金融工程项目分开比较。',
      url:'https://www.insead.edu/master-programmes/master-management',apply:'https://www.insead.edu/master-programmes/master-management/admissions',deadline:'R1 2026-10-06；R2 2026-12-08；R3 2027-02-23；R4 2027-04-27',
      events:[['2026年10月6日','Round 1 截止'],['2026年12月8日','Round 2 截止'],['2027年2月23日','Round 3 截止'],['2027年4月27日','Round 4 截止'],['各轮截止后48小时内','完成 Kira 视频与书面测评']],
      materials:['成绩单、学历证明','CV','GMAT/GRE','英语证明或豁免','6 项个人问答','2 封推荐（第3封可选）','Kira 视频及书面测评','申请费与系统补充字段'],
      requirements:{language:item('官方语言政策建议 IELTS 7.5 / TOEFL 103 / PTE 70','这些为推荐最低分，不是录取保证；可凭符合条件的英语授课学位证明。另须核对第二、第三语言政策。'),tests:item('GMAT / GRE 必交','成绩有效期五年，并向学校正式送分。',HARD),references:item('2 封必交；第3封可选','建议学术与职业推荐搭配；额外推荐应提供新信息。',HARD),writing:[writing('个人问答','依次最多 200 / 200 / 200 / 40 / 100 / 300 词','依次涉及自我认识、课外活动、高中毕业后的选择、入学前安排、职业目标、补充说明。')],extra:[{name:'Kira 测评','detail':'提交后通过邮件链接参加；各轮截止后48小时内完成。4道视频题，每题准备45秒、回答60秒；最后一道书面题5分钟，总计约15–20分钟。',level:HARD},{name:'签证准备','detail':'官网建议非欧洲申请者尽量选择前三轮，为签证留足时间。',level:INFO}],sources:[{url:'https://www.insead.edu/system/files/2025-11/INSEAD_MIM25_LANGUAGE_POLICY.pdf',label:'INSEAD MiM 语言政策（当前招生页链接版本）',type:INFO}]}}
  ];
  records[1].requirements.extra.push({name:'申请通道互斥',detail:'以上是直接申请轮次；Join a School in France 为另一通道，不能与直接申请并用，其材料及日期须单独核对。',level:HARD});
  records[1].fit='适合各本科背景、少量或无全职经验、希望接受综合管理训练的申请者。金融就业需主动规划课程和实习，并非纯金融学位。';
  records[5].fit='先核对商科/经济及数学统计学分；纯理工背景不应仅凭学校名气判断符合资格。具体门槛见下方学历先修核查。';
  records[6].fit='适合希望建立管理基础与国际商业视野的早期职业申请者；全职经验不是必需。量化金融目标需额外评估课程匹配。';
  records.forEach(p=>{
    p.isRecommended=true;p.term='2027 entry';p.checked='2026-08-31';
    p.requirements.checked=p.checked;
    p.requirements.sources=[{url:p.apply,label:p.school+' 官方申请说明',type:INFO},...(p.requirements.sources||[])];
    if(p.id===325)p.requirements.sources[0].url=p.url;
    p.requirements.extra.push({name:'准备建议（非校方门槛）',detail:'优先准备成绩、课程与可核验实习成果，再按项目动机题定制文书；未公开的考试或文书标准须在当期系统中确认。',level:PLAN});
    window.GRADPATH_PROGRAMS.push(p);
  });
})();
