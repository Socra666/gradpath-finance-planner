(function(){
  const programs=window.GRADPATH_PROGRAMS||[], id=Number(new URLSearchParams(location.search).get('id')), p=programs.find(x=>x.id===id), app=document.querySelector('#app');
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  if(!p){app.innerHTML='<div class="empty"><h1>没有找到这个项目</h1><p>项目可能已被移除或链接不完整。</p><a class="official" href="index.html">返回项目列表</a></div>';return}
  document.title=p.name+'｜GradPath 项目详解';
  const req=(window.GRADPATH_REQUIREMENTS||{})[p.id]||null;
  const official=window.GRADPATH_GET_OFFICIAL_LINKS?window.GRADPATH_GET_OFFICIAL_LINKS(p):{program:p.url,apply:p.url,same:true};
  const normalizeUrl=url=>String(url||'').trim().replace(/[?#].*$/,'').replace(/\/+$/,'').toLowerCase();

  const summaries={
    101:'MIT Sloan 的一年制或一年半制金融硕士，面向应届生与早期职业申请者。项目把现代金融理论、分析工具和职业实践结合起来，并允许学生通过选修方向强化金融工程、资本市场、公司金融或金融科技能力。',
    102:'Yale SOM 面向早期职业申请者的九个月 STEM 资产管理项目。培养重点不是泛商科，而是投资决策、量化方法、受托责任和资产管理行业实践。',
    103:'Princeton Bendheim Center for Finance 的高强度两年制金融项目，以金融经济学、数学、数据方法和计算能力见长，尤其适合量化研究、交易、资产管理和金融工程方向。',
    104:'Harvard Extension School 的 Finance ALM，采用“先修读指定课程、达到成绩要求、再申请正式入学”的绩效型录取路径。它主要为在职或需要灵活学习方式的人设计，不应与传统全日制商学院 MFin 直接等同。',
    105:'Stanford ICME 计算与数学工程硕士中的 Mathematical & Computational Finance 方向，核心是以应用数学、计算方法和建模解决现代金融问题，技术属性明显强于普通金融硕士。',
    106:'Oxford Saïd 与经济系共同提供的九个月金融经济学硕士，重点连接金融理论、经济学分析与市场实践，属于面向优秀应届生的高强度授课型项目。',
    107:'Oxford 数学研究所的十个月数学与计算金融硕士，围绕随机分析、数值方法、金融计算、机器学习与毕业论文展开，适合数学基础很强并希望进入量化金融的申请者。',
    108:'Cambridge Judge 的研究导向 MPhil in Finance，以金融理论、计量与研究训练为核心，可衔接金融研究、博士或研究密集型行业岗位。',
    109:'Cambridge 经济系的 Finance and Economics MPhil，强调微观、宏观、计量经济学与金融经济学的严谨训练，对经济学课程和数学准备要求较高。',
    110:'Cambridge Judge 面向已有金融工作经验人士的职业型 Master of Finance。项目重点是职业进阶、行业实践和领导力，不是为零经验应届生设计的常规 MFin。',
    111:'LBS 面向应届生和毕业不久申请者的金融分析硕士，课程与伦敦金融市场、职业发展和实践项目紧密结合，适合投行、资产管理、咨询与公司金融方向。',
    112:'LBS 面向已有金融行业经验人士的全日制 Masters in Finance，强调从既有职业成果出发完成能力升级，录取时会重点判断经验深度和职业目标。',
    113:'港大经管学院授课型金融硕士，覆盖公司金融、投资、金融市场与资产管理，适合希望在香港或亚洲金融市场发展的应届生和早期职业申请者。',
    114:'港大经管学院金融科技硕士，把金融、数据、编程和技术应用结合，适合具备一定数学或计算背景、希望进入金融科技与量化应用岗位的申请者。',
    115:'港大财富管理硕士围绕资产配置、投资产品、客户需求与财富管理行业展开，职业方向更偏私人银行、家族办公室、投资顾问和资产管理。',
    201:'Yale SOM 校内 MBA 与资产管理 MMS 的双学位路径。申请人需要被两个项目独立录取，第一年完成 MBA 核心训练，第二年专注资产管理。',
    202:'HKUST MiM 与 Yale MMS in Global Business and Society 的两年 M2M 路径。它是“管理学 + 全球商业”双学位，并非两个纯金融学位；金融方向主要通过选修、实习和职业选择实现。',
    203:'HEC MiM 与 Yale MMS in Global Business and Society 的 M2M 双学位，可借助 HEC 的金融方向形成金融职业路径，但学位定位仍是管理与全球商业。',
    204:'UBC Master of Management 与 Yale GBS 的两年双学位，为非商科或早期职业学生提供管理与全球商业训练；金融含量需要通过课程和经历主动构建。',
    205:'Oxford 1+1 路径把第一年的 MSc Financial Economics 与第二年的 Oxford MBA 结合。申请人需分别满足两个项目要求，适合希望先建立金融深度、再拓展综合管理能力的人。',
    206:'Oxford Law and Finance 与 MBA 的 1+1 路径，第一年连接法律、交易和公司金融，第二年完成 MBA；法律学术背景是申请第一阶段的重要前提。',
    207:'Stanford MBA 与 MS Computer Science 的校内联合路径，适合金融科技、量化技术或科技创业目标。申请复杂度高，必须同时满足商学院与计算机项目的独立要求。',
    301:'Berkeley Haas 一年制 MFE，以金融工程、数据、编程、职业实践和实习为核心，春季入学节奏与传统秋季硕士不同。',
    302:'Columbia IEOR 的金融工程硕士，利用纽约区位提供资产管理、金融科技、机器学习、交易与优化等方向，是典型的工程学院量化项目。',
    303:'CMU MSCF 是由 Tepper、数学和统计等单位共同支持的计算金融项目，强调数学、面向对象编程、金融市场理解、沟通能力与实践实习。',
    304:'NYU Courant 数学金融硕士，以严格应用数学、概率、随机过程和计算为基础，适合数学成熟度较高并计划进入量化研究、定价或交易岗位的申请者。',
    305:'UChicago 金融数学硕士为五学季职业型量化项目，连接金融数学、风险、计算和职业实践，适合有扎实微积分、线代和概率基础的申请者。',
    306:'Cornell ORIE MEng 的金融工程方向，以运筹学、优化、概率统计与工程实践切入金融问题，属于工程型而非传统商学院金融硕士。',
    307:'LSE 金融数学硕士是十个月高强度量化项目，强调数学金融、风险与组合问题；滚动录取意味着准备充分后尽早提交通常更合理。',
    308:'Imperial 商学院风险管理与金融工程硕士，结合金融工程、量化风险、资产配置与实践应用，对概率、微积分、矩阵代数等先修基础要求明确。',
    309:'HEC Paris 国际金融硕士可在资本市场和公司金融方向间建立主线，适合希望进入投行、市场、投资或企业金融并在欧洲发展的申请者。',
    310:'UZH 与 ETH 联合量化金融硕士，把 UZH 的金融与经济训练和 ETH 的数学、统计与计算资源结合，项目规模较小且量化强度高。',
    311:'HKUST 一年制金融科技硕士，聚焦金融、人工智能、数据与区块链等交叉主题，申请时需要证明数学、编程和金融兴趣之间的连贯性。',
    312:'NUS 风险管理研究所金融工程硕士，提供八月和一月入学路径，内容覆盖衍生品、风险、量化方法和金融实践，适合希望在亚洲金融中心发展的申请者。',
    313:'Oxford 法学院与 Saïd 商学院联合开设的十个月 Law and Finance 硕士，以公司交易、金融经济学、估值和商法为核心。它对法律本科或同等法律资格有明确门槛，不应被当作面向所有商科背景的普通 MFin。',
    314:'Cambridge Land Economy 的十个月房地产金融 MPhil，把金融、经济与法律用于全球商业地产和投资市场。适合房地产投资、REPE、资产管理、银行与相关研究方向。',
    315:'Stanford MS&E 的 Financial Analytics 专业方向，以概率、优化、数据与金融建模连接风险管理、投资、FinTech 和金融市场问题；它是工程学院的分析型 MS，不是传统商学院 MFin。',
    316:'Columbia Business School 两年制 STEM Financial Economics MS，课程衔接 Finance PhD 与 MBA 资源，强调金融经济学、计量、机器学习、投资与资产管理，学术强度明显高于一般授课型金融硕士。',
    317:'Columbia 数学系与统计系支持的 Mathematics of Finance MA，聚焦随机过程、PDE、数值方法、衍生品、交易与风险；全日制通常两到三个学期，并对学术推荐和数量课程准备要求很高。',
    318:'NYU Tandon 金融工程硕士把衍生品、风险、算法交易、金融科技、软件与机器学习结合，提供 applied lab 和多种 capstone 选择；与 NYU Courant Mathematics in Finance 是两个独立项目。',
    319:'UCLA Anderson 十五个月 MFE，以商学院资源连接金融工程、计算、风险与职业实践。它接受优秀应届生，但当前班级也包含有全职经验者，申请必须证明高强度数学和编程准备。',
    320:'Vanderbilt Owen 面向应届生和早期职业申请者的加速型 MS Finance，课程及职业支持偏投行、投资、公司金融与资产管理；申请更重视实习、沟通和职业动机，而不是科研数量。',
    321:'Michigan 数学系与统计系联合管理的 Quantitative Finance and Risk Management MS，以高阶数学、统计、编程和金融问题为核心，适合量化分析、风险、交易与金融工程方向。',
    322:'Georgia Tech 的跨学院 MS-QCF 由科学、工程和商学院资源共同支持，强调量化金融、计算、数据与就业实践；秋季与春季路径长度和实习安排不同。'
  };
  function intro(){if(summaries[p.id])return summaries[p.id];if(/学术硕士/.test(p.name))return `${p.school}的${p.name}属于研究导向推免项目，重点考察本科成绩、研究潜力、方法训练、推荐信和夏令营/综合考核表现。研究成果可以是重要证明，但官方材料通常允许“如有”提交，不应虚构论文。`;if(/金融硕士/.test(p.name))return `${p.school}的${p.name}属于全日制专业型金融培养路径，面向具备推免资格的优秀本科生，强调学业基础、金融或数据实践、综合素质以及夏令营/综合考核表现。`;return `${p.school}的${p.name}是${p.degree}项目，官方定位集中在${p.tags.join('、')}等方向。详情页依据当前项目页和招生通知整理。`}
  function category(){let t=(p.name+' '+p.degree+' '+p.field+' '+p.tags.join(' ')).toLowerCase(),n=p.name.toLowerCase();if(p.id===314)return 'asset';if(/学术硕士|mphil|research-focused|研究导向/.test(t))return 'research';if(/post-experience|mba|需金融经验|有工作经验/.test(t))return 'experienced';if(/asset management|wealth management|资产管理|财富管理/.test(n))return 'asset';if(/fintech|financial technology|金融科技/.test(n))return 'fintech';if(/financial engineering|computational|mathematical|quantitative|金融工程|量化|商务分析|business analytics/.test(t))return 'quant';if(p.isChinaRecommend)return 'recommend';return 'finance'}
  const categoryInfo={finance:{fit:'适合金融、经济、会计、数学、工程等背景，希望进入投行、投资、咨询、公司金融或金融市场的应届生/早期职业申请者。',focus:['学业表现和金融基础','高相关实习及可量化成果','职业目标与项目资源的连接','沟通、团队与领导力']},asset:{fit:'适合对投资研究、组合管理、财富管理或资产配置有持续投入，并能证明市场理解与受托意识的申请者。',focus:['投资与市场理解','资产管理/研究/交易相关经历','数量分析和决策能力','清晰长期职业承诺']},quant:{fit:'适合数学、统计、计算机、工程、物理或量化经济背景，能够证明微积分、线代、概率、统计和编程能力的申请者。',focus:['高阶数学课程与成绩','Python/C++/数据项目','量化实习或研究的技术深度','标化中的数量能力']},fintech:{fit:'适合同时具备金融理解和编程/数据能力，希望进入金融科技、数据分析、AI 金融应用或数字金融岗位的申请者。',focus:['编程与数据处理','金融问题意识','可复现的技术项目','技术与职业目标的连接']},research:{fit:'适合有明确研究兴趣、较强经济学/数学训练、RA 或论文经历，并考虑研究岗位或博士发展的申请者。',focus:['核心课程与学术排名','研究问题、方法和个人贡献','学术推荐信的具体力度','研究方向与院系资源匹配']},experienced:{fit:'适合已有相关全职经历、希望完成职业升级或转向管理/更复杂金融岗位的申请者；工作成果比单纯实习数量更重要。',focus:['全职经验的深度与影响','晋升、领导力和决策责任','明确职业转折点','项目对下一阶段的必要性']},recommend:{fit:'适合获得推免资格、学业排名突出，并能在材料和综合考核中证明专业潜力与综合素质的本科生。',focus:['前五学期成绩与排名','推荐信与个人自述','科研、竞赛或实习证据','夏令营/综合考核表现']}};
  function topics(){let t=(p.field+' '+p.name).toLowerCase(),out=[];const add=(test,title,body)=>{if(test.test(t))out.push([title,body])};add(/finance|金融/,'金融理论与市场','理解定价、市场机制、企业与投资决策。');add(/asset|investment|wealth|投资|资产|财富/,'投资与资产配置','覆盖投资研究、组合构建、风险与客户/机构目标。');add(/quant|mathemat|comput|engineering|量化|数学|计算|工程/,'数量方法','使用概率、统计、优化、数值方法或随机模型解决金融问题。');add(/data|machine learning|ai|fintech|数据|机器学习|人工智能|金融科技/,'数据与技术','把编程、数据分析和机器学习用于金融场景。');add(/econom|经济/,'经济学分析','以微观、宏观或计量框架解释金融与经济现象。');add(/account|会计/,'会计与公司决策','分析财务报告、企业价值与资本配置。');add(/management|mba|管理|商业/,'管理与领导力','训练组织、战略、团队协作与综合商业决策。');add(/research|mphil|学术|研究/,'研究训练','形成研究问题，使用规范方法完成论文或独立研究。');return out.slice(0,6)}
  function classifyMaterial(x){if(/如适用|如有|可选|非必需|可补充|偏好提交|强烈建议|按当期|按新周期|部分.*必须|不接收|不要求|无需/.test(x))return 'optional';if(/背景证明|先修|经历证明|资格证明|课程列表|研究成果|准备度证明/.test(x))return 'evidence';return 'required'}
  function materialNote(x){let t=x.toLowerCase();if(/成绩单|transcript/.test(t))return '准备所有就读院校的完整记录；非英文材料通常需合规英文翻译。先上传扫描件还是寄送正式件，以申请系统为准。';if(/简历|resume|cv/.test(t))return '写明起止月份、岗位、职责和可核验成果；不要只列机构名称。若项目规定一页或禁止单独上传，严格遵守。';if(/推荐/.test(t)){if(p.id===101)return 'MIT 要求 3 封：在读生通常 2 封学术 + 1 封近期实习推荐，且至少一位能评价数量能力；须在截止日前在线提交。';if(p.id===102)return 'Yale 要求 2 封，推荐人应能以具体事例评价你的能力、判断和影响。';if(p.id===103)return 'Princeton 要求 3 封；有至少两年全职经验者可由雇主写两封，但至少一封必须为学术推荐。';if(p.id===111)return 'LBS MFA 仅接受 1 位推荐人，推荐表必须在所选轮次截止前完成；官方优先职业推荐人，必要时可用学术推荐人。';return '尽早录入推荐人邮箱；确认数量、推荐人类型、语言、提交方式，以及是否必须在轮次截止前到齐。'}if(/essay|statement|陈述|短文|文书|自述/.test(t))return '围绕动机、目标、项目匹配和可验证经历逐题作答；不能用一篇通用个人陈述替代所有问题。';if(/gmat|gre/.test(t))return '确认必交、可选还是不接受，再核对有效期、送分代码和截止日是否允许先自报。';if(/toefl|ielts|det|英语|外语/.test(t))return '核对豁免条件、最低总分与单项、有效期和官方送分要求；“如适用”不代表所有国际生都能免交。';if(/视频|测评|面试|笔试/.test(t))return '形式、发生时间、设备要求与准备方法见下方“视频、笔试、测评与面试”。';if(/申请费/.test(t))return '通常在提交申请时在线支付；如需费用减免，应在付款前申请。';if(/数学|编程|先修|课程/.test(t))return '通过成绩单中的课程与成绩、项目说明或申请表专项栏目证明；只在简历里笼统自称通常不够。';if(/科研|竞赛|荣誉|成果/.test(t))return '只提交真实、可解释且能说明个人贡献的材料；“如有”意味着缺少时不应硬凑。';return '申请系统开放后核对文件格式、页数、语言、命名和截止时间。'}
  function assessment(){let exact=(window.GRADPATH_ASSESSMENTS||{})[p.id];if(exact)return exact;if(p.isChinaRecommend)return {items:[['院系通知后｜夏令营或综合考核','提交材料后由院系筛选入营/复试名单。笔试、面试、展示、英语或专业考核的组合由当年院系通知决定；当前官网未公开题型时，不依据往届帖子认定本年流程。'],['获得资格后｜推免系统确认','优秀营员或预录取不等于最终录取；仍须取得本校推免资格，并在教育部推免系统完成志愿、复试及待录取确认。']]};if(p.isDual)return {items:[['双重或联合审核','双学位通常需要完成两套或联动审核。是否分别面试、是否先由第一年学校提名，以路径页和两校通知为准。'],['重点准备','除常规动机外，需要解释为什么必须同时取得两个学位，以及两个阶段如何共同服务职业目标。']]};return {items:[['提交前｜申请系统附加题','系统开放后逐项核对是否出现视频、限时写作、数学题或额外短文；有些题型只在申请系统内显示。'],['提交后｜面试或补充测评','当前官方摘要未确认统一必考形式。只有收到项目官方邀请才安排；不要把第三方往届流程当作本周期硬性要求。']]}}
  function prepPlan(){let c=category(),first=c==='quant'?'补齐概率、统计、线代、优化/随机过程和编程，并完成一个可复现项目。':c==='research'?'尽早参与 RA 或论文，形成研究问题、方法、结果和个人贡献，并建立学术推荐关系。':c==='experienced'?'整理全职经历中的晋升、决策责任、业务影响和职业转折逻辑。':c==='recommend'?'保持前五学期成绩与排名，同步沉淀科研、竞赛、实习和综合考核表达。':'建立金融课程、相关实习和持续行业兴趣三条证据线。';return [['提前 9–12 个月',first],['提前 4–8 个月','完成语言与标化规划，确定推荐人；建立逐项目材料表，避免一套文书通投。'],['目标轮次前 8 周','完成成绩单翻译、简历和文书初稿；让推荐人了解目标项目、代表性成果和截止日期。'],['目标轮次前 2 周','完成设备与视频练习、逐文件复核、送分和推荐信追踪；不要压线提交。'],['提交之后','检查状态页和邮箱，准备行为面试、项目动机、课程/实习细节与可能的技术追问。']]}
  const mats={required:[],optional:[],evidence:[]};p.materials.forEach(x=>mats[classifyMaterial(x)].push(x));
  const known=!/待|以新|以.*为准|已关闭|分别更新|各自周期|分轮次|同时申请|预计/.test(p.deadline), info=categoryInfo[category()]||categoryInfo.finance;
  const testInfo=assessment(),advice=(window.GRADPATH_ADVICE||[]).filter(x=>x.ids.includes(p.id)), cases=(window.GRADPATH_CASES||[]).filter(x=>x.ids.includes(p.id));
  const officialSources=official.same?[{url:official.program,label:'项目官网与申请入口',type:'官方一手来源'}]:[{url:official.program,label:'官网项目介绍',type:'官方一手来源'},{url:official.apply,label:'官网申请入口',type:'官方一手来源'}];
  const sourceRows=[...officialSources,...((req&&req.sources)||[]),...(testInfo.source?[{url:testInfo.source,label:'测评与面试官方说明',type:'官方一手来源'}]:[]),...advice.map(x=>({url:x.source,label:x.title,type:x.label})),...cases.filter(x=>x.trust==='高').map(x=>({url:x.source,label:x.program+' 班级/目标画像',type:x.type}))];
  const uniqueSources=sourceRows.filter((x,i,a)=>x.url&&a.findIndex(y=>normalizeUrl(y.url)===normalizeUrl(x.url))===i);
  function materialCol(title,list,kind){return `<div class="material-col"><h3>${title}</h3>${list.length?list.map(x=>`<div class="mat ${kind}"><div><b>${esc(x)}</b><small>${esc(materialNote(x))}</small></div></div>`).join(''):'<div class="notice">当前官方摘要中没有单列该类材料。</div>'}</div>`}
  function levelClass(level){if(/硬性/.test(level||''))return 'hard';if(/第三方/.test(level||''))return 'third';if(/规划/.test(level||''))return 'plan';return 'info'}
  function badge(level){return `<span class="req-badge ${levelClass(level)}">${esc(level||'官网说明')}</span>`}
  function reqCard(title,item){if(!item)return '';return `<div class="req-card"><div class="req-head"><h3>${esc(title)}</h3>${badge(item.level)}</div><b class="req-main">${esc(item.headline)}</b><p>${esc(item.detail)}</p></div>`}
  function writingCard(item){return `<div class="req-doc"><div class="req-head"><b>${esc(item.name)}</b>${badge(item.level)}</div>${item.limit?`<small>长度 / 形式：${esc(item.limit)}</small>`:''}<p>${esc(item.focus)}</p></div>`}
  function extraCard(item){return `<div class="req-doc"><div class="req-head"><b>${esc(item.name)}</b>${badge(item.level)}</div><p>${esc(item.detail)}</p></div>`}
  function officialButtons(){return official.same?`<div class="official-links"><a class="official" href="${official.program}" target="_blank" rel="noopener">项目官网与申请入口 →</a></div>`:`<div class="official-links"><a class="official secondary" href="${official.program}" target="_blank" rel="noopener">官网项目介绍 →</a><a class="official" href="${official.apply}" target="_blank" rel="noopener">官网申请入口 →</a></div>`}
  function barPanel(){
    const engine=window.GRADPATH_EVALUATOR;if(!engine)return '';
    const model=engine.archetype(p),keys=Object.keys(model.weights),maxWeight=Math.max(...keys.map(k=>model.weights[k]));
    const weightBars=keys.map(k=>`<div class="weight-row"><b>${esc(engine.labels[k])}</b><div class="weight-track"><i style="width:${Math.round(model.weights[k]/maxWeight*100)}%"></i></div><span>${model.weights[k]}%</span></div>`).join('');
    let personal='<div class="notice">你还没有保存个人背景。回到首页填写“个人能力评估”后，这里会自动显示该项目下的个人表现 Bar、匹配分和规划概率区间。<br><a class="back" href="index.html">前往首页评估 →</a></div>';
    const saved=engine.savedProfile();
    if(saved&&Number(saved.gpa)>0){
      const profile=Object.assign({program:String(p.id),school:0,scale:4,gpa:0,rank:0,courses:'',code:'',projects:'',englishType:'none',english:0,greQ:0,greV:0,gmat:0,internships:[],research:'',awards:'',leadership:'',intl:'',finance:'',goals:''},saved,{internships:Array.isArray(saved.internships)?saved.internships:[]});
      const result=engine.evaluate(p,profile);
      const dimBars=keys.map(k=>`<div class="weight-row"><b>${esc(engine.labels[k])}</b><div class="weight-track"><i style="width:${result.dims[k]}%"></i></div><span>${result.dims[k]}</span></div>`).join('');
      personal=`<div class="match-summary"><b>${result.score}</b><div><strong>${esc(result.verdict)}</strong><br><span>规划概率区间 ${result.lo}%–${result.hi}%</span></div></div><div class="weight-chart match-chart">${dimBars}</div><div class="notice">个人 Bar 读取你保存在当前浏览器的评估资料；概率区间仅用于选校规划，不是校方录取率或录取承诺。</div>`;
    }
    return `<section class="panel"><div class="bar-header"><div><h2>项目评估 Bar</h2><p>先按项目类型决定权重，再用你的真实背景计算匹配表现。</p></div><span class="status">${esc(model.name)}</span></div><h3>该项目采用的非等权模型</h3><div class="weight-chart">${weightBars}</div><div class="notice">条形长度按本项目的最高单项权重缩放，右侧百分比才是实际权重。它是 GradPath 的规划模型，不是学校公开的录取评分表。</div><h3>我的当前匹配表现</h3>${personal}</section>`;
  }
  function requirementPanel(){if(!req)return '';
    return `<section class="panel requirement-panel"><div class="section-title"><div><h2>申请材料精确要求</h2><p>逐项目拆开语言、标化、文书、推荐信与附加环节；分数和字数旁会标明信息性质。</p></div><span class="checked">核验于 ${esc(req.checked)}</span></div><div class="req-legend">${badge('官网硬性要求')}${badge('官网说明')}${badge('本站规划建议（非校方门槛）')}${badge('第三方数据库（仅供交叉参考）')}</div><div class="req-grid">${reqCard('语言成绩',req.language)}${reqCard('GRE / GMAT',req.tests)}${reqCard('推荐信',req.references)}${reqCard('简历',req.cv)}${reqCard('成绩单',req.transcript)}</div><h3>文书题目、字数与内容偏向</h3><div class="req-docs">${req.writing.length?req.writing.map(writingCard).join(''):'<div class="notice">官网公开页没有披露独立文书题目或字数；申请系统开放后再按字段核验。</div>'}</div>${req.extra&&req.extra.length?`<h3>视频、面试与其他材料</h3><div class="req-docs">${req.extra.map(extraCard).join('')}</div>`:''}<div class="accuracy-note"><b>怎样看“建议分数”：</b>只有标为“官网硬性要求”或“官网说明”的数字来自学校；本站规划区间和第三方数据库都不会被写成录取线。若官网不收 GRE，本页不会建议你为该项目送分。</div></section>`
  }
  const saved=new Set(JSON.parse(localStorage.getItem('gradpath-saved')||'[]'));
  const progressItems=req?[`核验语言：${req.language.headline}`,`核验标化：${req.tests.headline}`,`推荐信：${req.references.headline}`,`简历：${req.cv.headline}`,`成绩单：${req.transcript.headline}`,...req.writing.map(x=>`文书：${x.name}`),...(req.extra||[]).map(x=>`附加：${x.name}`)]:p.materials;
  app.innerHTML=`<section class="hero"><div class="school">${esc(p.school)}</div><h1>${esc(p.name)}</h1><div class="sub">${esc(p.degree)} · ${esc(p.term)}</div><div class="tags">${p.tags.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}<span class="status ${known?'':'wait'}">${known?'日期已明确':'新周期待核验'}</span></div></section><div class="layout"><div class="main">
  <section class="panel"><h2>项目介绍</h2><p class="lead">${esc(intro())}</p><h3>适合什么样的人</h3><p>${esc(info.fit)}</p><div class="notice">本页中文内容是对官方项目定位的提炼，不是官网逐字翻译；课程与要求发生冲突时，以页面底部官方来源为准。</div></section>
  ${barPanel()}
  <section class="panel"><h2>培养内容与项目属性</h2><div class="topic-grid">${topics().map(x=>`<div class="topic"><b>${x[0]}</b><p>${x[1]}</p></div>`).join('')}</div><p class="notice">这里展示的是官网定位所对应的学习主题，不冒充当年逐门课程清单；选修课和课程名称可能每年调整。</p></section>
  <section class="panel"><h2>申请轮次与日期</h2><div class="topic"><b>当前可确认的截止信息</b><p>${esc(p.deadline)}</p></div><h3>准备与申请时间线</h3><div class="timeline">${p.events.map(e=>`<div class="event"><b>${esc(e[0])}</b><p>${esc(e[1])}</p></div>`).join('')}</div>${known?'':'<div class="notice">2027 入学轮次尚未由项目完整公布。页面保留准备顺序，但不把上一申请季的日期写成当前日期。</div>'}</section>
  ${requirementPanel()}
  <section class="panel"><h2>材料清单：必须、条件性与能力证明</h2><div class="material-grid">${materialCol('必须提交',mats.required,'')}${materialCol('条件性 / 可选择材料',mats.optional,'optional')}${materialCol('背景与准备度证明',mats.evidence,'evidence')}</div><h3>如何理解分类</h3><p>“必须提交”意味着当前项目摘要将其列入完整申请；“条件性”包括语言豁免、可选标化和“如有”成果；“背景证明”可能不是单独上传入口，但必须通过成绩单、简历、文书或推荐信体现。</p></section>
  <section class="panel"><h2>视频、笔试、测评与面试</h2><div class="timeline">${testInfo.items.map(x=>`<div class="event"><b>${esc(x[0])}</b><p>${esc(x[1])}</p></div>`).join('')}</div>${testInfo.source?`<a class="back" href="${testInfo.source}" target="_blank" rel="noopener">查看该环节官方说明 →</a>`:'<div class="notice">当前官方摘要没有披露更细的形式。页面宁可保留未知，也不把往届经验写成确定规则。</div>'}</section>
  <section class="panel"><h2>申请流程</h2><div class="timeline"><div class="event"><b>1. 资格与先修课核验</b><p>先确认学位、数学/经济/编程先修、工作经验和语言豁免条件。</p></div><div class="event"><b>2. 建立完整材料包</b><p>准备成绩单、简历、文书、推荐信、考试和项目要求的附加问题。</p></div><div class="event"><b>3. 在目标轮次前提交</b><p>推荐信和测试成绩也要在该轮次满足“完整申请”定义；不能只提交主表。</p></div><div class="event"><b>4. 测评、面试与补件</b><p>按项目要求完成视频、写作、数学测评或面试，并持续检查申请状态页。</p></div><div class="event"><b>5. 决定、条件与入学确认</b><p>收到录取后核对押金、最终成绩单、语言、签证和资金证明等条件。</p></div></div></section>
  <section class="panel"><h2>项目筛选重点</h2><div class="topic-grid">${info.focus.map((x,i)=>`<div class="topic"><b>${i+1}. ${x}</b><p>${i===0?'这是该类项目最先建立可信度的部分。':'需要用具体课程、经历、结果或推荐信证据支撑。'}</p></div>`).join('')}</div></section>
  <section class="panel"><h2>申请准备建议</h2><div class="timeline">${prepPlan().map(x=>`<div class="event"><b>${esc(x[0])}</b><p>${esc(x[1])}</p></div>`).join('')}</div></section>
  <section class="panel"><h2>招生团队 / 官方观点</h2>${advice.length?advice.map(x=>`<div class="advice"><b>${esc(x.title)}</b><ul>${x.points.map(v=>`<li>${esc(v)}</li>`).join('')}</ul><a class="back" href="${x.source}" target="_blank" rel="noopener">查看原文 →</a></div>`).join(''):'<div class="notice">暂未收录该项目单独的招生团队观点摘要。请优先阅读下方官方项目页。</div>'}</section>
  <section class="panel"><h2>公开班级画像与案例</h2><p class="notice">案例不等于最低门槛，也不参与个人评估。官方班级画像是群体统计；社区自报信息可能不完整。</p>${cases.length?`<div class="source-grid">${cases.map(x=>`<div class="case"><span class="trust ${x.trust==='低'?'low':''}">${esc(x.trust)}可信度 · ${esc(x.type)}</span><h3>${esc(x.school)} · ${esc(x.year)}</h3><p><b>GPA：</b>${esc(x.gpa)}</p><p><b>标化：</b>${esc(x.test)}</p><p><b>经历：</b>${esc(x.experience)}</p><p><b>结果：</b>${esc(x.outcome)}</p><a class="back" href="${x.source}" target="_blank" rel="noopener">原始来源 →</a></div>`).join('')}</div>`:'<div class="notice">暂无与该项目直接对应、且能够核验的公开画像。</div>'}</section>
  <section class="panel"><h2>来源与核验状态</h2>${uniqueSources.map(x=>`<div class="source"><a href="${x.url}" target="_blank" rel="noopener">${esc(x.label)} →</a><small>${esc(x.type)} · 本页整理日期：${esc((req&&req.checked)||window.GRADPATH_DATA_DATE||'2026-08-15')}</small></div>`).join('')}<div class="notice">官方项目页是申请要求的最高优先级。第三方数据库只在官网没有提供画像或分数建议时用于交叉参考，不用于确认硬性要求。</div></section>
  </div><aside class="sidecol"><div class="side"><div class="school">申请关键节点</div><div class="deadline">${esc(p.deadline)}</div><div class="sub">${esc(p.term)}</div>${officialButtons()}<button class="save" id="saveBtn">${saved.has(p.id)?'★ 已收藏':'☆ 收藏项目'}</button><h3>我的材料进度</h3>${progressItems.map((x,i)=>`<label class="check"><input type="checkbox" data-check="${i}" ${localStorage.getItem('detail-precise-check-'+p.id+'-'+i)==='1'?'checked':''}><span>${esc(x)}</span></label>`).join('')}</div></aside></div>`;
  document.querySelector('#saveBtn').onclick=()=>{saved.has(p.id)?saved.delete(p.id):saved.add(p.id);localStorage.setItem('gradpath-saved',JSON.stringify([...saved]));document.querySelector('#saveBtn').textContent=saved.has(p.id)?'★ 已收藏':'☆ 收藏项目'};
  document.querySelectorAll('[data-check]').forEach(x=>x.onchange=()=>localStorage.setItem('detail-precise-check-'+p.id+'-'+x.dataset.check,x.checked?'1':'0'));
})();
