(function(){
  'use strict';
  const programs=window.GRADPATH_PROGRAMS||[];
  const DAY=86400000;
  const state={scope:'all',status:'all',query:'',saved:new Set(readJSON('gradpath-saved',[])),watched:new Set(readJSON('gradpath-timeline-watch',[])),done:new Set(readJSON('gradpath-timeline-done',[]))};
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function readJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}}
  function saveSet(key,set){localStorage.setItem(key,JSON.stringify([...set]))}
  function pad(n){return String(n).padStart(2,'0')}
  function isoLocal(y,m,d,h=23,min=59,zone='+08:00'){return `${y}-${pad(m)}-${pad(d)}T${pad(h)}:${pad(min)}:00${zone}`}
  function usDaylightTime(y,m,d){
    const current=Date.UTC(y,m-1,d),marchAnchor=new Date(Date.UTC(y,2,8)).getUTCDay(),novAnchor=new Date(Date.UTC(y,10,1)).getUTCDay();
    const secondSundayMarch=Date.UTC(y,2,8+(7-marchAnchor)%7),firstSundayNovember=Date.UTC(y,10,1+(7-novAnchor)%7);
    return current>=secondSundayMarch&&current<firstSundayNovember;
  }
  function parseExact(text){
    text=String(text||'');
    let m=text.match(/(20\d{2})年\s*(\d{1,2})月\s*(\d{1,2})日(?:\s*(\d{1,2}):(\d{2}))?/);
    if(!m)m=text.match(/(20\d{2})-(\d{1,2})-(\d{1,2})(?:\s*(?:·|\s)\s*(\d{1,2}):(\d{2}))?/);
    if(!m)return null;
    const y=+m[1],mo=+m[2],d=+m[3],hasTime=m[4]!=null,h=hasTime?+m[4]:23,min=hasTime?+m[5]:59;
    const isEastern=/\b(?:ET|EST|EDT)\b/i.test(text),isPacific=/\b(?:PT|PST|PDT)\b/i.test(text),isCEST=/\bCEST\b/i.test(text),isCET=/\bCET\b/i.test(text),isUK=/\b(?:UK|GMT|BST)\b/i.test(text),isHKT=/\bHKT\b/i.test(text);
    const daylight=usDaylightTime(y,mo,d),zone=isEastern?(/EST/i.test(text)?'-05:00':/EDT/i.test(text)?'-04:00':daylight?'-04:00':'-05:00'):isPacific?(/PST/i.test(text)?'-08:00':/PDT/i.test(text)?'-07:00':daylight?'-07:00':'-08:00'):isCEST?'+02:00':isCET?'+01:00':isUK?(/BST/i.test(text)?'+01:00':'+00:00'):isHKT?'+08:00':'+08:00';
    const zoneLabel=isEastern?(text.match(/\b(?:ET|EST|EDT)\b/i)||['ET'])[0].toUpperCase():isPacific?(text.match(/\b(?:PT|PST|PDT)\b/i)||['PT'])[0].toUpperCase():isCEST?'CEST':isCET?'CET':isUK?(text.match(/\b(?:UK|GMT|BST)\b/i)||['UK'])[0].toUpperCase():isHKT?'HKT':'北京时间';
    const iso=isoLocal(y,mo,d,h,min,zone),date=new Date(iso);
    if(Number.isNaN(date.getTime()))return null;
    return {date,iso,y,mo,d,h,min,hasTime,zone,zoneLabel};
  }
  function classify(label,desc){
    const s=`${label} ${desc}`;
    if(/截止|提交完整申请|材料提交/.test(s))return 'deadline';
    if(/测评|笔试|考核|面试/.test(s))return 'assessment';
    if(/开放|开始/.test(s))return 'open';
    return 'milestone';
  }
  function typeName(kind){return {open:'申请开放',deadline:'申请截止',assessment:'笔试 / 考核',milestone:'关键节点'}[kind]||'关键节点'}
  function exactEvents(){
    const out=[];
    programs.forEach(p=>{
      const deadlineParsed=parseExact(p.deadline);
      const rows=(p.events||[]).map(row=>{const parsed=parseExact(row[0]);return parsed?{row,parsed,kind:classify(row[0],row[1])}:null}).filter(Boolean);
      const sameDay=(a,b)=>a.y===b.y&&a.mo===b.mo&&a.d===b.d;
      if(deadlineParsed&&!rows.some(x=>sameDay(x.parsed,deadlineParsed)))out.push(makeEvent(p,'deadline',deadlineParsed,p.deadline,'申请截止时间；若官网未给出具体时刻，则当天截止时刻仍需再次核对。'));
      rows.forEach(x=>out.push(makeEvent(p,x.kind,x.parsed,x.row[0],x.row[1])));
    });
    const dedup=new Map();
    out.forEach(e=>{const k=`${e.program.id}|${e.kind}|${e.date.getTime()}`;if(!dedup.has(k)||e.description.length>dedup.get(k).description.length)dedup.set(k,e)});
    return [...dedup.values()].sort((a,b)=>a.date-b.date);
  }
  function makeEvent(program,kind,parsed,label,description){return {program,kind,date:parsed.date,parsed,label,description,key:`${parsed.date.getTime()}-${kind}`}}
  function groupedEvents(list){
    const map=new Map();
    list.forEach(e=>{if(!map.has(e.key))map.set(e.key,{...e,programs:[],descriptions:[]});const g=map.get(e.key);g.programs.push(e.program);g.descriptions.push(e.description)});
    return [...map.values()].sort((a,b)=>a.date-b.date).map(g=>({...g,programs:uniquePrograms(g.programs)}));
  }
  function uniquePrograms(list){const m=new Map();list.forEach(p=>m.set(p.id,p));return [...m.values()]}
  const allExact=exactEvents();

  function inScope(p){
    if(state.scope==='saved'&&!state.saved.has(p.id))return false;
    if(state.scope==='china'&&!p.isChinaRecommend)return false;
    if(state.scope==='dual'&&!p.isDual)return false;
    const q=state.query.toLowerCase();
    return !q||`${p.school} ${p.aliases||''} ${p.name} ${p.field||''}`.toLowerCase().includes(q);
  }
  function filteredEvents(){
    const now=Date.now();
    return allExact.filter(e=>inScope(e.program)).filter(e=>state.status==='future'?e.date.getTime()>=now:state.status==='past'?e.date.getTime()<now:true);
  }
  function needsOfficialDate(p){return !parseExact(p.deadline)||/待|TBA|尚未|未公布/i.test(p.deadline)}
  function pendingPrograms(){
    return programs.filter(needsOfficialDate).filter(inScope);
  }
  function urgency(date){
    const days=Math.ceil((date-Date.now())/DAY);
    if(days<0)return '已过'; if(days===0)return '今天'; if(days<=7)return `${days} 天内`; if(days<=30)return `${days} 天后`; return '';
  }
  function weekday(parsed){return new Intl.DateTimeFormat('zh-CN',{weekday:'short',timeZone:'UTC'}).format(new Date(Date.UTC(parsed.y,parsed.mo-1,parsed.d)))}
  function displayTime(g){
    if(!g.parsed.hasTime)return `${g.parsed.y}.${pad(g.parsed.mo)}.${pad(g.parsed.d)} · 具体时刻待核对`;
    return `${g.parsed.y}.${pad(g.parsed.mo)}.${pad(g.parsed.d)} · ${pad(g.parsed.h)}:${pad(g.parsed.min)} ${g.parsed.zoneLabel}`;
  }
  function groupTitle(g){
    if(g.programs.length===1)return `${g.programs[0].school} · ${g.programs[0].name} · ${typeName(g.kind)}`;
    const school=commonLabel(g.programs);
    return `${school}${g.programs.length} 个项目 · ${typeName(g.kind)}`;
  }
  function commonLabel(list){
    if(list.every(p=>/北京大学光华/.test(p.school)))return '北大光华 ';
    if(list.every(p=>/清华/.test(p.school)))return '清华 ';
    return '同日 ';
  }
  function groupDescription(g){
    const d=[...new Set(g.descriptions.filter(Boolean))];
    if(g.kind==='open')return d[0]||'申请系统开放。';
    if(g.kind==='deadline')return g.parsed.hasTime?(d[0]||'完成在线申请与材料提交。'):'官网资料已确认日期，但站内未保存具体时刻；请在当日前再次核对。';
    return d[0]||'按项目通知完成相应环节。';
  }
  function render(){renderHero();renderStats();renderRail();renderTimeline();renderPending();updateExport()}
  function renderHero(){
    const future=groupedEvents(allExact.filter(e=>e.date.getTime()>=Date.now()&&!state.done.has(e.key)));
    const next=future[0];
    if(!next){$('#nextCard').innerHTML='<div class="next-kicker">NEXT CONFIRMED EVENT</div><h2>当前没有未来的已确认节点</h2><div class="next-date">请关注下方待官网更新清单</div>';return}
    const days=Math.max(0,Math.ceil((next.date-Date.now())/DAY));
    $('#nextCard').innerHTML=`<div class="next-kicker">NEXT CONFIRMED EVENT</div><h2>${esc(groupTitle(next))}</h2><div class="next-date">${esc(displayTime(next))}</div><div class="countdown"><b>${days}</b><span>天后</span></div>`;
  }
  function renderStats(){
    const future=groupedEvents(allExact.filter(e=>e.date.getTime()>=Date.now())),futureDeadlines=future.filter(e=>e.kind==='deadline'),pending=programs.filter(needsOfficialDate),done=[...state.done].length;
    $('#stats').innerHTML=`<div class="stat"><small>未来确定节点</small><strong>${future.length}</strong><em>组</em></div><div class="stat"><small>其中 Deadline</small><strong>${futureDeadlines.length}</strong><em>组</em></div><div class="stat"><small>日期待公布</small><strong>${pending.length}</strong><em>项目</em></div><div class="stat"><small>已处理节点</small><strong>${done}</strong><em>组</em></div>`;
  }
  function renderRail(){
    const groups=groupedEvents(filteredEvents()),months=new Map();
    groups.forEach(g=>{const k=`${g.parsed.y}-${pad(g.parsed.mo)}`;if(!months.has(k))months.set(k,{y:g.parsed.y,m:g.parsed.mo,count:0,deadline:false});const x=months.get(k);x.count++;x.deadline||=g.kind==='deadline'});
    $('#monthRail').innerHTML=[...months.entries()].map(([k,x])=>`<button class="month-btn ${x.deadline?'has-deadline':''}" data-month="${k}"><b>${x.y} · ${pad(x.m)}月</b><small>${x.count} 个节点</small></button>`).join('')||'<span style="font-size:11px;color:var(--muted)">当前筛选无确定日期</span>';
  }
  function renderTimeline(){
    const groups=groupedEvents(filteredEvents()),nextKey=(groupedEvents(allExact.filter(e=>e.date.getTime()>=Date.now()&&!state.done.has(e.key)))[0]||{}).key;
    const byMonth=new Map();groups.forEach(g=>{const k=`${g.parsed.y}-${pad(g.parsed.mo)}`;if(!byMonth.has(k))byMonth.set(k,[]);byMonth.get(k).push(g)});
    $('#timelineCount').textContent=`当前显示 ${groups.length} 组确定节点 · 同日同类型已自动合并`;
    if(!groups.length){$('#timeline').innerHTML='<div class="empty"><b>当前筛选下没有确定日期</b>可以切换筛选，或在“待官网更新”里查看尚未发布日期的项目。</div>';return}
    $('#timeline').innerHTML=[...byMonth.entries()].map(([month,list])=>{
      const [y,m]=month.split('-');
      return `<div class="month-group" id="month-${month}"><div class="month-label"><b>${m} 月</b><span>${y}</span></div><div class="moments">${list.map(g=>momentHTML(g,g.key===nextKey)).join('')}</div></div>`;
    }).join('');
  }
  function momentHTML(g,isNext){
    const watched=state.watched.has(g.key),done=state.done.has(g.key),visible=g.programs.slice(0,4),rest=g.programs.slice(4),urgent=urgency(g.date);
    const links=list=>`<div class="program-list">${list.map(p=>`<a class="program-link" href="program.html?id=${encodeURIComponent(p.id)}">${esc(`${p.school} · ${p.name}`)}</a>`).join('')}</div>`;
    return `<article class="moment ${g.kind} ${isNext?'is-next':''} ${done?'done':''}" data-key="${esc(g.key)}"><div class="moment-grid"><div class="date-tile"><b>${pad(g.parsed.d)}</b><span>${esc(weekday(g.parsed))}<br>${g.parsed.hasTime?`${pad(g.parsed.h)}:${pad(g.parsed.min)}`:'时间待核'}</span></div><div><div class="type-line"><span class="type-pill">${esc(typeName(g.kind))}</span>${urgent&&g.date>=Date.now()?`<span class="urgency">${esc(urgent)}</span>`:''}${g.programs.length>1?`<span class="type-pill">合并 ${g.programs.length} 项</span>`:''}</div><h3>${esc(groupTitle(g))}</h3><p class="moment-desc">${esc(displayTime(g))}<br>${esc(groupDescription(g))}</p>${links(visible)}${rest.length?`<details class="more-programs"><summary>再查看 ${rest.length} 个同日项目</summary>${links(rest)}</details>`:''}</div><div class="actions"><button class="action watch ${watched?'on':''}" data-watch="${esc(g.key)}">${watched?'★ 已关注':'☆ 关注'}</button><button class="action done-btn ${done?'on':''}" data-done="${esc(g.key)}">${done?'✓ 已处理':'标记完成'}</button><button class="action calendar" data-calendar="${esc(g.key)}">加入日历</button></div></div></article>`;
  }
  function renderPending(){
    const list=pendingPrograms();$('#pendingCount').textContent=`当前显示 ${list.length} 个日期尚未完全公布的项目`;
    $('#pending').innerHTML=list.length?list.map(p=>`<article class="pending-card"><div><div class="pending-school">${esc(p.school)}</div><h3>${esc(p.name)}</h3><p>${esc(p.deadline)}</p></div><a href="program.html?id=${encodeURIComponent(p.id)}">查看项目 →</a></article>`).join(''):'<div class="empty" style="grid-column:1/-1"><b>当前筛选没有待更新项目</b>换一个筛选条件即可查看。</div>';
  }
  function updateExport(){const list=filteredEvents().filter(e=>e.date.getTime()>=Date.now());$('#exportAll').disabled=!list.length;$('#exportAll').textContent=list.length?`导出未来节点 · ${groupedEvents(list).length}`:'暂无未来节点'}
  function icsDate(date){return date.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}
  function icsEscape(s){return String(s||'').replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;')}
  function eventICS(g){
    const start=g.date,end=new Date(start.getTime()+60*60000),alarms=g.kind==='deadline'?['-P30D','-P7D','-P1D']:['-P7D','-P1D'];
    const names=g.programs.map(p=>p.name).join('；'),url=g.programs.length===1?g.programs[0].url:'';
    return ['BEGIN:VEVENT',`UID:${g.key}@gradpath.local`,`DTSTAMP:${icsDate(new Date())}`,`DTSTART:${icsDate(start)}`,`DTEND:${icsDate(end)}`,`SUMMARY:${icsEscape(groupTitle(g))}`,`DESCRIPTION:${icsEscape(`${names}\n${groupDescription(g)}\n请在提交前再次核对官网。`)}`,...(url?[`URL:${url}`]:[]),...alarms.flatMap(x=>['BEGIN:VALARM',`TRIGGER:${x}`,'ACTION:DISPLAY',`DESCRIPTION:${icsEscape(groupTitle(g))} 提醒`,'END:VALARM']),'END:VEVENT'].join('\r\n');
  }
  function downloadICS(groups,name){
    const body=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//GradPath//Application Timeline//ZH-CN','CALSCALE:GREGORIAN','METHOD:PUBLISH',...groups.map(eventICS),'END:VCALENDAR'].join('\r\n');
    const blob=new Blob(['\ufeff'+body],{type:'text/calendar;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('日历文件已生成，可导入系统日历');
  }
  function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),2400)}
  function findGroup(key){return groupedEvents(allExact).find(g=>g.key===key)}

  $('#search').addEventListener('input',e=>{state.query=e.target.value.trim();render()});
  $('#scopeChips').addEventListener('click',e=>{const b=e.target.closest('[data-scope]');if(!b)return;state.scope=b.dataset.scope;$('#scopeChips').querySelectorAll('.chip').forEach(x=>x.classList.toggle('active',x===b));render()});
  $('#statusChips').addEventListener('click',e=>{const b=e.target.closest('[data-status]');if(!b)return;state.status=b.dataset.status;$('#statusChips').querySelectorAll('.chip').forEach(x=>x.classList.toggle('active',x===b));render()});
  $('#monthRail').addEventListener('click',e=>{const b=e.target.closest('[data-month]');if(b)$(`#month-${b.dataset.month}`)?.scrollIntoView({behavior:'smooth',block:'start'})});
  $('#timeline').addEventListener('click',e=>{
    const watch=e.target.closest('[data-watch]'),done=e.target.closest('[data-done]'),cal=e.target.closest('[data-calendar]');
    if(watch){const k=watch.dataset.watch;state.watched.has(k)?state.watched.delete(k):state.watched.add(k);saveSet('gradpath-timeline-watch',state.watched);render();return}
    if(done){const k=done.dataset.done;state.done.has(k)?state.done.delete(k):state.done.add(k);saveSet('gradpath-timeline-done',state.done);render();return}
    if(cal){const g=findGroup(cal.dataset.calendar);if(g)downloadICS([g],`GradPath-${g.parsed.y}${pad(g.parsed.mo)}${pad(g.parsed.d)}.ics`)}
  });
  $('#exportAll').addEventListener('click',()=>{const list=groupedEvents(filteredEvents().filter(e=>e.date.getTime()>=Date.now()));if(list.length)downloadICS(list,'GradPath-未来申请节点.ics')});
  render();
})();
