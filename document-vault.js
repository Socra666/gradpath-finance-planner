(function(){
  const programs=window.GRADPATH_PROGRAMS||[],requirements=window.GRADPATH_REQUIREMENTS||{};
  const categories=[
    {key:'identity',icon:'证',title:'身份与基础信息',desc:'护照、身份证、证件照、姓名拼音等',sensitive:true},
    {key:'academic',icon:'学',title:'学术与成绩材料',desc:'成绩单、在读/毕业证明、排名、课程说明'},
    {key:'tests',icon:'分',title:'语言与标化',desc:'IELTS、TOEFL、GRE、GMAT、CET 成绩'},
    {key:'writing',icon:'文',title:'主文书与简历',desc:'PS/SOP、CV、Essay 素材库及版本'},
    {key:'references',icon:'荐',title:'推荐信资料',desc:'推荐人信息、推荐信版本与提交记录',sensitive:true},
    {key:'experience',icon:'历',title:'实习与工作经历',desc:'证明信、工作成果、项目说明与联系人'},
    {key:'research',icon:'研',title:'科研与量化项目',desc:'论文、RA、代码项目、作品集与研究摘要'},
    {key:'awards',icon:'奖',title:'荣誉、竞赛与活动',desc:'获奖证书、领导力、社会实践和志愿经历'},
    {key:'finance',icon:'资',title:'资金、签证与合规',desc:'资金证明、签证、体检和录取后文件',sensitive:true},
    {key:'application',icon:'申',title:'申请回执与结果',desc:'申请表、付款回执、面试、Offer 与押金'}
  ];
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmtSize=n=>n<1024?`${n} B`:n<1048576?`${(n/1024).toFixed(1)} KB`:`${(n/1048576).toFixed(1)} MB`;
  const fmtDate=n=>new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(n));
  const uid=()=>`${Date.now()}-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`;
  const $=s=>document.querySelector(s),MAX_SIZE=50*1024*1024;
  let db,state={mode:'master',projectId:null,category:'all',query:'',files:[]},uploadContext=null,previewUrl=null;

  function openDb(){return new Promise((resolve,reject)=>{const req=indexedDB.open('gradpath-document-vault',1);req.onupgradeneeded=()=>{const d=req.result,store=d.createObjectStore('files',{keyPath:'id'});store.createIndex('scope','scope');store.createIndex('projectId','projectId');store.createIndex('category','category');store.createIndex('requirementKey','requirementKey');store.createIndex('createdAt','createdAt')};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
  function allFiles(){return new Promise((resolve,reject)=>{const req=db.transaction('files','readonly').objectStore('files').getAll();req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error)})}
  function getFile(id){return new Promise((resolve,reject)=>{const req=db.transaction('files','readonly').objectStore('files').get(id);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
  function putFile(record){return new Promise((resolve,reject)=>{const req=db.transaction('files','readwrite').objectStore('files').put(record);req.onsuccess=()=>resolve();req.onerror=()=>reject(req.error)})}
  function removeFile(id){return new Promise((resolve,reject)=>{const req=db.transaction('files','readwrite').objectStore('files').delete(id);req.onsuccess=()=>resolve();req.onerror=()=>reject(req.error)})}
  function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2600)}
  function categoryFor(text){const t=String(text).toLowerCase();if(/passport|身份证|护照|证件照|identity/.test(t))return'identity';if(/ielts|toefl|gre|gmat|语言|英语|标化|考试|test/.test(t))return'tests';if(/推荐|reference|referee/.test(t))return'references';if(/essay|statement|文书|简历|resume|cv|自述|sop|ps/.test(t))return'writing';if(/实习|工作|employment|internship|经历/.test(t))return'experience';if(/科研|研究|论文|项目|research|portfolio|代码|编程/.test(t))return'research';if(/竞赛|荣誉|奖|活动|领导|志愿|award/.test(t))return'awards';if(/资金|签证|visa|bank|财力/.test(t))return'finance';if(/申请费|回执|面试|视频|笔试|offer|押金|录取/.test(t))return'application';return'academic'}
  function categoryTitle(key){return categories.find(x=>x.key===key)?.title||'其他材料'}
  function fileExt(name){const x=name.split('.').pop();return x&&x.length<6?x:'FILE'}
  function filteredMaster(){return state.files.filter(f=>f.scope==='master'&&(state.category==='all'||f.category===state.category)&&(!state.query||`${f.name} ${f.note||''} ${categoryTitle(f.category)}`.toLowerCase().includes(state.query.toLowerCase()))).sort((a,b)=>b.createdAt-a.createdAt)}
  function projectFiles(id){return state.files.filter(f=>f.scope==='project'&&Number(f.projectId)===Number(id)).sort((a,b)=>b.createdAt-a.createdAt)}
  function requirementList(p){
    const req=requirements[p.id],items=[...(p.materials||[])];
    (req?.writing||[]).forEach(x=>items.push(x.name+(x.limit?`｜${x.limit}`:'')));
    (req?.extra||[]).forEach(x=>items.push(x.name));
    const clean=[];items.forEach(x=>{const label=String(x).trim(),norm=label.toLowerCase().replace(/[（(].*?[）)]/g,'').replace(/\s+/g,' ');if(label&&!clean.some(y=>y.norm===norm))clean.push({norm,label})});
    clean.push({norm:'project-research',label:'项目调研与 Why this programme 素材'});
    clean.push({norm:'submission',label:'网申表、付款回执与提交确认'});
    clean.push({norm:'interview-prep',label:'面试、视频或笔试准备与复盘'});
    clean.push({norm:'offer',label:'录取结果、奖学金、押金与入学材料'});
    return clean.map((x,i)=>({key:`req-${i}-${x.norm.slice(0,42)}`,label:x.label,category:categoryFor(x.label)}));
  }
  function fileActions(f,compact=false){return `<div class="${compact?'':'file-actions'}"><button class="mini" data-preview="${f.id}">查看</button><button class="mini" data-download="${f.id}">下载</button><button class="mini delete" data-delete="${f.id}">删除</button></div>`}
  function fileCard(f){return `<article class="file-card"><div class="file-type">${esc(fileExt(f.name))}</div><div class="file-main"><b title="${esc(f.name)}">${esc(f.name)}</b><div class="file-meta">${esc(categoryTitle(f.category))}${f.projectId?` · ${esc(programs.find(p=>p.id===Number(f.projectId))?.name||'项目分库')}`:''} · ${fmtSize(f.size)} · ${fmtDate(f.createdAt)}</div></div>${fileActions(f)}</article>`}
  async function storageInfo(){if(!navigator.storage?.estimate)return{used:state.files.reduce((s,f)=>s+f.size,0),quota:0};const e=await navigator.storage.estimate();return{used:e.usage||0,quota:e.quota||0}}
  async function refresh(){state.files=await allFiles();render()}
  function setMode(mode){state.mode=mode;state.projectId=null;state.query='';history.replaceState(null,'',mode==='master'?'documents.html':'documents.html?view=projects');render()}

  async function renderMaster(){
    const files=filteredMaster(),master=state.files.filter(f=>f.scope==='master'),covered=new Set(master.map(f=>f.category)).size,total=master.reduce((s,f)=>s+f.size,0),storage=await storageInfo(),pct=storage.quota?Math.min(100,storage.used/storage.quota*100):0;
    $('#content').innerHTML=`<div class="content-head"><div><h2>个人总库</h2><p>保存可以复用于多个项目的原件、主版本和经历证明。</p></div><div class="actions"><button class="action" id="exportManifest">导出目录清单</button><button class="primary" id="masterUpload">＋ 上传到所选分类</button></div></div><div class="stats"><div class="stat"><small>总库文件</small><b>${master.length}</b></div><div class="stat"><small>已覆盖分类</small><b>${covered}/10</b></div><div class="stat"><small>总库文件大小</small><b>${fmtSize(total)}</b></div><div class="stat"><small>浏览器存储占用</small><b>${fmtSize(storage.used)}</b><div class="storage-line"><i style="width:${pct}%"></i></div></div></div><div class="toolbar"><input id="fileSearch" placeholder="搜索文件名、分类或备注" value="${esc(state.query)}"><select id="uploadCategory">${categories.map(c=>`<option value="${c.key}" ${state.category===c.key?'selected':''}>${esc(c.title)}</option>`).join('')}</select><button class="primary" id="toolbarUpload">选择文件</button></div><div class="category-grid">${categories.map(c=>{const count=master.filter(f=>f.category===c.key).length;return `<button class="category-card" data-category="${c.key}"><span class="icon">${c.icon}</span><span><b>${esc(c.title)}${c.sensitive?'<span class="sensitive">敏感</span>':''}</b><p>${esc(c.desc)}</p></span><span class="count-pill">${count} 份</span></button>`}).join('')}</div><div class="section-label"><h3>${state.category==='all'?'全部总库文件':categoryTitle(state.category)}</h3><span>${files.length} 份</span></div><div class="files">${files.length?files.map(fileCard).join(''):'<div class="empty"><b>这里还没有文件</b>先选择分类，再上传你的第一份材料。支持 PDF、Word、图片、表格和压缩包等常见格式。</div>'}</div>`;
    $('#fileSearch').oninput=e=>{state.query=e.target.value;clearTimeout(e.target._t);e.target._t=setTimeout(renderMaster,180)};
    $('#uploadCategory').onchange=e=>state.category=e.target.value;
    $('#masterUpload').onclick=$('#toolbarUpload').onclick=()=>beginUpload({scope:'master',category:$('#uploadCategory').value});
    document.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>{state.category=b.dataset.category;renderMaster()});
    $('#exportManifest').onclick=exportManifest;
  }

  function renderProjectGrid(){
    const q=state.query.trim().toLowerCase(),list=programs.filter(p=>!q||`${p.school} ${p.name} ${p.degree||''} ${p.track||''}`.toLowerCase().includes(q));
    $('#content').innerHTML=`<div class="content-head"><div><h2>项目分库</h2><p>每个项目都有独立材料清单；针对性文书、提交回执和面试准备不会和总库混在一起。</p></div></div><div class="project-toolbar"><input class="project-search" id="projectSearch" placeholder="搜索学校或项目名称" value="${esc(state.query)}"></div><div class="project-grid">${list.map(p=>{const reqs=requirementList(p),files=projectFiles(p.id),done=reqs.filter(r=>files.some(f=>f.requirementKey===r.key)).length,pct=reqs.length?Math.round(done/reqs.length*100):0;return `<a class="project-card" href="documents.html?project=${p.id}"><div class="school">${esc(p.school)}</div><h3>${esc(p.name)}</h3><p>${files.length} 份文件 · ${done}/${reqs.length} 项已准备</p><div class="project-foot"><div class="progress"><i style="width:${pct}%"></i></div><span class="project-progress">${pct}%</span></div></a>`}).join('')||'<div class="empty">没有找到匹配的项目，请换一个关键词。</div>'}</div>`;
    $('#projectSearch').oninput=e=>{state.query=e.target.value;clearTimeout(e.target._timer);e.target._timer=setTimeout(renderProjectGrid,180)};
  }

  function renderProject(p){
    const reqs=requirementList(p),files=projectFiles(p.id),done=reqs.filter(r=>files.some(f=>f.requirementKey===r.key)).length,pct=reqs.length?Math.round(done/reqs.length*100):0;
    $('#content').innerHTML=`<div class="project-hero"><div class="project-hero-top"><div><div class="school">${esc(p.school)}</div><h2>${esc(p.name)}</h2><p>${esc(p.degree||p.track||'项目专属申请材料')}</p></div><a class="back-link" href="documents.html?view=projects">← 返回所有项目分库</a></div></div><div class="progress-card"><div class="progress-top"><span>材料准备进度</span><span>${done}/${reqs.length} · ${pct}%</span></div><div class="progress big"><i style="width:${pct}%"></i></div></div><div class="section-label"><h3>项目专属材料清单</h3><span>上传针对 ${esc(p.school)} / ${esc(p.name)} 的最终版本</span></div><div class="requirements">${reqs.map(r=>{const attached=files.filter(f=>f.requirementKey===r.key),isDone=attached.length>0;return `<article class="requirement ${isDone?'done':''}"><div class="req-top"><span class="req-check">${isDone?'✓':'·'}</span><div class="req-name"><b>${esc(r.label)}</b><small>${esc(categoryTitle(r.category))}${attached.length?` · ${attached.length} 个版本`:' · 尚未上传'}</small></div><button class="upload-req" data-upload-req="${esc(r.key)}" data-upload-category="${esc(r.category)}">＋ 上传资料</button></div>${attached.length?`<div class="req-files">${attached.map(f=>`<div class="req-file"><span title="${esc(f.name)}">${esc(f.name)} · ${fmtSize(f.size)}</span>${fileActions(f,true)}</div>`).join('')}</div>`:''}</article>`}).join('')}</div>`;
    document.querySelectorAll('[data-upload-req]').forEach(b=>b.onclick=()=>beginUpload({scope:'project',projectId:p.id,requirementKey:b.dataset.uploadReq,category:b.dataset.uploadCategory}));
  }

  function render(){
    $('#masterMode').classList.toggle('active',state.mode==='master');
    $('#projectMode').classList.toggle('active',state.mode==='projects');
    const master=state.files.filter(f=>f.scope==='master');
    $('#categoryNav').innerHTML=categories.map(c=>`<button class="cat-btn ${state.mode==='master'&&state.category===c.key?'active':''}" data-side-category="${c.key}"><span>${c.icon}</span>${esc(c.title)}<em>${master.filter(f=>f.category===c.key).length}</em></button>`).join('');
    document.querySelectorAll('[data-side-category]').forEach(b=>b.onclick=()=>{state.mode='master';state.projectId=null;state.category=b.dataset.sideCategory;history.replaceState(null,'','documents.html');render()});
    if(state.mode==='master')renderMaster();
    else if(state.projectId){const p=programs.find(x=>x.id===Number(state.projectId));p?renderProject(p):(state.projectId=null,renderProjectGrid())}
    else renderProjectGrid();
  }

  function beginUpload(context){uploadContext=context;const input=$('#fileInput');input.value='';input.click()}
  async function uploadSelected(fileList){
    const incoming=[...fileList];if(!incoming.length||!uploadContext)return;
    const oversized=incoming.filter(f=>f.size>MAX_SIZE);if(oversized.length){toast(`单个文件不能超过 50 MB：${oversized[0].name}`);return}
    try{
      for(const file of incoming)await putFile({id:uid(),name:file.name,type:file.type||'',size:file.size,lastModified:file.lastModified||Date.now(),blob:file,scope:uploadContext.scope,projectId:uploadContext.projectId||null,category:uploadContext.category||categoryFor(file.name),requirementKey:uploadContext.requirementKey||null,note:'',createdAt:Date.now()});
      toast(`已安全保存 ${incoming.length} 份文件，仅此浏览器可见`);await refresh();
    }catch(err){console.error(err);toast('保存失败，可能是浏览器存储空间不足')}
  }

  async function previewFile(id){
    const f=await getFile(id);if(!f)return;const ext=fileExt(f.name).toLowerCase(),supportedImage=f.type.startsWith('image/'),supportedPdf=f.type==='application/pdf'||ext==='pdf',supportedText=f.type.startsWith('text/')||['txt','md','csv','json'].includes(ext);if(previewUrl)URL.revokeObjectURL(previewUrl);previewUrl=URL.createObjectURL(f.blob);$('#previewTitle').textContent=f.name;const body=$('#previewBody');
    if(supportedImage)body.innerHTML=`<img src="${previewUrl}" alt="${esc(f.name)}">`;
    else if(supportedPdf||supportedText)body.innerHTML=`<iframe src="${previewUrl}" title="${esc(f.name)}"></iframe>`;
    else body.innerHTML=`<div class="preview-note"><b>此格式暂不支持浏览器内预览</b><p>你仍可以点击“下载”在本机应用中打开。</p><button class="primary" data-download="${f.id}">下载文件</button></div>`;
    $('#previewDialog').showModal();
  }
  async function downloadFile(id){const f=await getFile(id);if(!f)return;const url=URL.createObjectURL(f.blob),a=document.createElement('a');a.href=url;a.download=f.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
  async function deleteFile(id){const f=state.files.find(x=>x.id===id);if(!f||!confirm(`确定从此设备删除“${f.name}”吗？此操作无法撤销。`))return;await removeFile(id);toast('文件已从本机资料库删除');await refresh()}

  function exportManifest(){
    const rows=[['资料库','学校/项目','分类','文件名','大小(B)','上传时间'],...state.files.sort((a,b)=>b.createdAt-a.createdAt).map(f=>[f.scope==='master'?'个人总库':'项目分库',f.projectId?`${programs.find(p=>p.id===Number(f.projectId))?.school||''}｜${programs.find(p=>p.id===Number(f.projectId))?.name||''}`:'',categoryTitle(f.category),f.name,f.size,new Date(f.createdAt).toISOString()])],csv='\ufeff'+rows.map(row=>row.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\r\n'),url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=`GradPath-资料目录-${new Date().toISOString().slice(0,10)}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('已导出文件目录（不包含文件内容）')
  }

  async function requestPersistentStorage(){if(!navigator.storage?.persist){toast('当前浏览器不支持锁定本地存储');return}const granted=await navigator.storage.persist();toast(granted?'已请求浏览器长期保留本地资料':'浏览器未授予长期保留；请定期备份重要文件')}

  document.addEventListener('click',e=>{const preview=e.target.closest('[data-preview]'),download=e.target.closest('[data-download]'),del=e.target.closest('[data-delete]');if(preview)previewFile(preview.dataset.preview);else if(download)downloadFile(download.dataset.download);else if(del)deleteFile(del.dataset.delete)});
  $('#fileInput').onchange=e=>uploadSelected(e.target.files);
  $('#masterMode').onclick=()=>setMode('master');
  $('#projectMode').onclick=()=>setMode('projects');
  $('#persistStorage').onclick=requestPersistentStorage;
  $('#previewClose').onclick=()=>$('#previewDialog').close();
  $('#previewDialog').addEventListener('close',()=>{if(previewUrl){URL.revokeObjectURL(previewUrl);previewUrl=null}$('#previewBody').innerHTML=''});

  async function init(){
    if(!('indexedDB'in window)){$('#content').innerHTML='<div class="empty"><b>当前浏览器不支持本地资料库</b>请使用最新版 Chrome、Edge 或 Safari。</div>';return}
    try{db=await openDb();state.files=await allFiles();const params=new URLSearchParams(location.search),project=params.get('project');if(project){state.mode='projects';state.projectId=Number(project)}else if(params.get('view')==='projects')state.mode='projects';render()}catch(err){console.error(err);$('#content').innerHTML='<div class="empty"><b>资料库暂时无法打开</b>请检查浏览器是否允许此网站使用本地存储。</div>'}
  }
  init();
})();
