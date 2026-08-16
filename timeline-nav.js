(function(){
  const header=document.querySelector('header');
  if(!header||header.querySelector('[data-timeline-nav]'))return;
  const link=document.createElement('a');
  link.href='timeline.html';link.textContent='申请时间线';link.dataset.timelineNav='1';link.className='gradpath-timeline-link';
  const vault=document.createElement('a');
  vault.href='documents.html';vault.textContent='个人资料库';vault.dataset.vaultNav='1';vault.className='gradpath-vault-link';
  const style=document.createElement('style');
  style.textContent='.gradpath-timeline-link,.gradpath-vault-link{display:inline-flex;align-items:center;gap:6px;color:#174c3c!important;text-decoration:none;border-radius:11px;padding:9px 12px;font-size:12px;font-weight:900;white-space:nowrap}.gradpath-timeline-link{background:#dff36d}.gradpath-vault-link{background:#fff;border:1px solid #174c3c}.gradpath-timeline-link:before{content:"◷";font-size:15px}.gradpath-vault-link:before{content:"▣";font-size:14px}@media(max-width:650px){header{height:auto!important;min-height:68px;gap:8px}header .nav{display:none}.gradpath-timeline-link,.gradpath-vault-link{padding:8px 9px;font-size:11px}#assessBtn{padding:8px!important;font-size:11px}header>div:last-child{gap:5px!important}}';
  document.head.appendChild(style);
  const back=header.querySelector('.back');
  if(back){const group=document.createElement('div');group.style.cssText='display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end';back.before(group);group.append(link,vault,back)}
  else{const right=header.lastElementChild;if(right&&right!==header.firstElementChild){right.insertBefore(vault,right.firstChild);right.insertBefore(link,vault)}else header.append(link,vault)}
})();
