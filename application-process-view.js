(function () {
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const labels = {
    official_required: '官网硬性要求',
    official_preferred: '官网明确偏好',
    admissions_advice: '招生团队 / 准备建议',
    alumni_report: '匿名往届经验'
  };
  const badge = (level) => `<span class="process-evidence ${esc(level)}">${esc(labels[level] || level)}</span>`;
  const resourceLinks = (item) => item.resources?.length ? `<div class="process-resources"><strong>官方准备资源</strong>${item.resources.map((resource) => `<a href="${esc(resource.url)}" target="_blank" rel="noopener">${esc(resource.label)} →</a>`).join('')}${item.resourceNote ? `<small>${esc(item.resourceNote)}</small>` : ''}</div>` : '';
  const cards = (items, empty = '官网当前未列出该类项目。') => items?.length ? items.map((item) => `<article class="process-card"><div class="process-card-head"><b>${esc(item.name || item.text)}</b>${badge(item.evidenceLevel)}</div>${item.detail ? `<p>${esc(item.detail)}</p>` : ''}${item.status === 'unknown' ? '<small>状态：官网尚未公开统一安排</small>' : ''}${item.status === 'none' ? '<small>状态：官网明确说明不采用该环节</small>' : ''}${resourceLinks(item)}</article>`).join('') : `<div class="notice">${esc(empty)}</div>`;
  const materialGroup = (title, items) => `<div class="process-material-group"><h3>${esc(title)}</h3>${cards(items)}</div>`;

  function render(process, reports = []) {
    if (!process) return '<section class="panel"><div class="notice">该项目的深度申请流程正在核验中。</div></section>';
    const rounds = process.cycle?.rounds || [];
    return `<section class="panel process-intelligence" id="application-process">
      <div class="section-title"><div><h2>完整申请流程与面试准备</h2><p>官网规则、明确偏好和往届经验分层展示；往届题型不代表本年度固定考纲。</p></div><span class="checked">适用：${esc(process.cycle?.entry || '当前周期')}</span></div>
      <nav class="process-nav" aria-label="申请流程导航"><a href="#process-cycle">关键节点</a><a href="#process-materials">全部材料</a><a href="#process-after-submit">提交之后</a><a href="#process-assessments">视频与面试</a><a href="#process-experiences">往届面经</a><a href="#process-after-admission">录取之后</a></nav>
      <div class="process-legend">${badge('official_required')}${badge('official_preferred')}${badge('admissions_advice')}${badge('alumni_report')}</div>
      <section class="process-block" id="process-cycle"><h3>1. 本申请季关键节点</h3><div class="timeline"><div class="event"><b>申请开放</b><p>${esc(process.cycle?.opening || '官网未单独公布')}</p></div>${rounds.map((round) => `<div class="event"><b>${esc(round.label)} · ${esc(round.date)}</b><p>${esc([round.time, round.timezone, round.timingNote].filter(Boolean).join(' · '))}</p></div>`).join('')}<div class="event"><b>决定时间</b><p>${esc(process.cycle?.decision || '按状态页通知')}</p></div></div><h4>什么才算完整申请</h4><div class="process-cards">${cards(process.completionDefinition)}</div></section>
      <section class="process-block" id="process-materials"><h3>2. 所有申请材料</h3><div class="process-material-grid">${materialGroup('必须提交', process.materials?.required)}${materialGroup('官网明确偏好', process.materials?.preferred)}${materialGroup('可选补充', process.materials?.optional)}${materialGroup('不接受 / 不应提交', process.materials?.rejected)}</div></section>
      <section class="process-block" id="process-after-submit"><h3>3. 提交材料之后</h3><div class="process-cards">${cards(process.postSubmission)}</div></section>
      <section class="process-block" id="process-assessments"><h3>4. 视频、写作、笔试与面试</h3><div class="process-cards">${cards(process.assessments)}</div>${process.preparation?.length ? `<h4>准备到什么程度</h4><div class="process-cards">${cards(process.preparation)}</div>` : ''}</section>
      <section class="process-block" id="process-experiences"><h3>5. 往届面经参考</h3><div class="experience-warning"><b>匿名往届经验 · 非官方规则</b><p>只能用于建立准备框架；题目、平台和面试官安排可能变化。</p></div>${reports.length ? reports.map((report) => `<article class="experience-card"><div><b>${esc(report.cycle)} · ${esc(report.sourcePlatform)}</b>${badge('alumni_report')}</div><p>${esc(report.summary)}</p>${report.behavioralTopics?.length ? `<p><strong>行为方向：</strong>${esc(report.behavioralTopics.join('、'))}</p>` : ''}${report.technicalTopics?.length ? `<p><strong>技术方向：</strong>${esc(report.technicalTopics.join('、'))}</p>` : ''}<small>${esc(report.useNote)}</small><a href="${esc(report.sourceUrl)}" target="_blank" rel="noopener">查看原始经验 →</a></article>`).join('') : '<div class="notice">暂无能够核验项目、年份和原始链接的公开面经。页面不会用机构编写的通用题库冒充真实经历。</div>'}</section>
      <section class="process-block" id="process-after-admission"><h3>6. 录取之后</h3><div class="process-cards">${cards(process.afterAdmission)}</div></section>
      <section class="process-block"><h3>7. 本模块来源</h3>${(process.sources || []).map((source) => `<div class="source"><a href="${esc(source.url)}" target="_blank" rel="noopener">${esc(source.title)} →</a><small>${esc(source.publisher)} · 适用 ${esc(source.applicableCycle)} · 核验 ${esc(source.accessed)}</small></div>`).join('')}</section>
    </section>`;
  }

  window.GRADPATH_RENDER_APPLICATION_PROCESS = render;
})();
