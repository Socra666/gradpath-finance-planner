(function(){
  'use strict';
  const KEY='gradpath-question-notes-v1';
  const notes=document.getElementById('questionNotes'),status=document.getElementById('saveStatus'),count=document.getElementById('noteCount'),file=document.getElementById('noteFile');
  let dirty=false,blocked=false;
  const message=(text,error=false)=>{status.textContent=text;status.classList.toggle('error',error);};
  const recount=()=>{count.textContent=notes.value.length.toLocaleString()+' 字符';};
  function save(){
    if(blocked){message('无法读取原记录，为避免覆盖已暂停保存。可先导出当前内容，修复浏览器存储后重新打开。',true);return false;}
    try{localStorage.setItem(KEY,JSON.stringify({version:1,text:notes.value,updatedAt:new Date().toISOString()}));dirty=false;message('已保存到本机 · '+new Date().toLocaleTimeString('zh-CN'));return true;}
    catch{dirty=true;message('保存失败：浏览器存储不可用或已满。请立即导出备份，暂勿关闭页面。',true);return false;}
  }
  try{
    const raw=localStorage.getItem(KEY);
    if(raw!==null){const data=JSON.parse(raw);if(data.version!==1||typeof data.text!=='string')throw new Error('invalid record');notes.value=data.text;message('已读取本机记录 · 编辑后自动保存');}
    else message('还没有记录 · 输入后自动保存到本机');
  }catch{blocked=true;message('原记录读取失败，已暂停覆盖保存。请保留此浏览器的数据，并导出当前内容备份。',true);}
  recount();
  notes.addEventListener('input',()=>{dirty=true;recount();save();});
  document.getElementById('saveNote').addEventListener('click',save);
  document.getElementById('exportNote').addEventListener('click',()=>{
    const blob=new Blob(['\uFEFF'+notes.value],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='GradPath-申请问题-'+new Date().toISOString().slice(0,10)+'.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  document.getElementById('importNote').addEventListener('click',()=>file.click());
  file.addEventListener('change',async()=>{
    const selected=file.files[0];if(!selected)return;
    try{
      if(selected.size>2*1024*1024)throw new Error('文件超过 2 MB，请选择较小的纯文本备份。');
      const text=(await selected.text()).replace(/^\uFEFF/,'');
      if(notes.value&&!confirm('导入将替换当前全部问题。请先导出备份。确定替换吗？'))return;
      notes.value=text;dirty=true;recount();save();
    }catch(error){message('导入失败：'+error.message,true);}finally{file.value='';}
  });
  window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue='';}});
  // Do not silently overwrite notes changed in another tab.
  window.addEventListener('storage',event=>{if(event.key===KEY){blocked=true;message('另一个标签页已修改记录。请导出当前内容，再刷新页面读取最新版本。',true);}});
})();
