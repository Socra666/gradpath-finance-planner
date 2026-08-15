(function(){
  // 每个项目都保留两个语义明确的官方入口。若官网用同一页承载介绍与申请，
  // program 和 apply 可以相同，渲染层会自动合并为一个按钮。
  window.GRADPATH_OFFICIAL_LINKS={
    101:{program:'https://mitsloan.mit.edu/mfin/explore-program/mfin-curriculum',apply:'https://mitsloan.mit.edu/mfin/admissions/how-to-apply'},
    102:{program:'https://som.yale.edu/programs/mms-asset-management',apply:'https://som.yale.edu/programs/mms-asset-management/admissions/application-information'},
    103:{program:'https://bcf.princeton.edu/academic-programs/master-in-finance/',apply:'https://bcf.princeton.edu/academic-programs/master-in-finance/apply-for-the-master-in-finance-program/'},
    104:{program:'https://extension.harvard.edu/academics/programs/finance-graduate-program/',apply:'https://extension.harvard.edu/registration-admissions/degree-program-admissions/how-to-apply-to-a-graduate-degree-program/'},
    105:{program:'https://icme.stanford.edu/academics-admission/icme-master-science',apply:'https://icme.stanford.edu/academics-admission/icme-graduate-program-application'},
    106:{program:'https://www.sbs.ox.ac.uk/oxford-experience/coming-oxford/msc-financial-economics',apply:'https://apply.sbs.ox.ac.uk/'},
    107:{program:'https://www.ox.ac.uk/admissions/graduate/courses/msc-mathematical-and-computational-finance',apply:'https://www.ox.ac.uk/admissions/graduate/courses/msc-mathematical-and-computational-finance'},
    108:{program:'https://www.postgraduate.study.cam.ac.uk/courses/directory/bmjbmpfin',apply:'https://www.postgraduate.study.cam.ac.uk/courses/directory/bmjbmpfin/apply'},
    109:{program:'https://www.postgraduate.study.cam.ac.uk/courses/directory/ececmpmfe',apply:'https://www.postgraduate.study.cam.ac.uk/courses/directory/ececmpmfe/apply'},
    110:{program:'https://www.postgraduate.study.cam.ac.uk/courses/directory/bmjbmffin',apply:'https://www.postgraduate.study.cam.ac.uk/courses/directory/bmjbmffin/apply'},
    111:{program:'https://www.london.edu/masters-degrees/masters-in-financial-analysis?entry=true',apply:'https://www.london.edu/masters-degrees/masters-in-financial-analysis/apply?entry=true'},
    112:{program:'https://www.london.edu/masters-degrees/masters-in-finance-full-time?entry=true',apply:'https://www.london.edu/masters-degrees/masters-in-finance-full-time/apply?entry=true'},
    113:{program:'https://masters.hkubs.hku.hk/our-programmes/master-of-finance/',apply:'https://portal.hku.hk/tpg-admissions/programme-listing?faculty=hku-business-school'},
    114:{program:'https://masters.hkubs.hku.hk/our-programmes/master-of-finance-in-financial-technology/',apply:'https://portal.hku.hk/tpg-admissions/programme-listing?faculty=hku-business-school'},
    115:{program:'https://masters.hkubs.hku.hk/our-programmes/master-of-wealth-management/',apply:'https://portal.hku.hk/tpg-admissions/programme-listing?faculty=hku-business-school'},

    201:{program:'https://som.yale.edu/programs/joint-degrees/mba-mms-asset-management',apply:'https://som.yale.edu/programs/joint-degrees/mba-mms-asset-management'},
    202:{program:'https://som.yale.edu/programs/mms-global-business-and-society/admissions/m2m-pathways',apply:'https://som.yale.edu/programs/mms-global-business-and-society/admissions/m2m-pathways'},
    203:{program:'https://som.yale.edu/programs/mms-global-business-and-society/admissions/m2m-pathways',apply:'https://som.yale.edu/programs/mms-global-business-and-society/admissions/m2m-pathways'},
    204:{program:'https://som.yale.edu/programs/mms-global-business-and-society/admissions/m2m-pathways',apply:'https://som.yale.edu/programs/mms-global-business-and-society/admissions/m2m-pathways'},
    205:{program:'https://www.sbs.ox.ac.uk/oxford-experience/coming-oxford/oxford-1plus1-mba',apply:'https://www.sbs.ox.ac.uk/oxford-experience/coming-oxford/oxford-1plus1-mba'},
    206:{program:'https://www.law.ox.ac.uk/msc-law-and-finance',apply:'https://www.sbs.ox.ac.uk/oxford-experience/coming-oxford/oxford-1plus1-mba'},
    207:{program:'https://www.gsb.stanford.edu/programs/mba/academic-experience/joint-dual-degrees',apply:'https://www.gsb.stanford.edu/programs/mba/academic-experience/joint-dual-degrees'},

    301:{program:'https://mfe.haas.berkeley.edu/',apply:'https://mfe.haas.berkeley.edu/admissions/requirements'},
    302:{program:'https://www.engineering.columbia.edu/academics/programs/masters-programs/master-science-programs/financial-engineering-ms',apply:'https://www.engineering.columbia.edu/admissions-aid/graduate-admissions/how-apply/application-requirements'},
    303:{program:'https://www.cmu.edu/mscf/',apply:'https://www.cmu.edu/mscf/admissions/apply.html'},
    304:{program:'https://math-finance.cims.nyu.edu/about/',apply:'https://math-finance.cims.nyu.edu/admissions/'},
    305:{program:'https://finmath.uchicago.edu/',apply:'https://finmath.uchicago.edu/admissions/'},
    306:{program:'https://www.duffield.cornell.edu/orie/meng/financial-engineering-concentration/',apply:'https://www.duffield.cornell.edu/orie/meng/meng-admissions-requirements-ithaca/'},
    307:{program:'https://www.lse.ac.uk/study-at-lse/graduate/msc-financial-mathematics',apply:'https://www.lse.ac.uk/study-at-lse/graduate/prospective-students/how-to-apply'},
    308:{program:'https://www.imperial.ac.uk/business-school/masters/risk-management/',apply:'https://www.imperial.ac.uk/business-school/masters/risk-management/admissions/'},
    309:{program:'https://www.hec.edu/en/MIF',apply:'https://www.hec.edu/en/all-masters-admissions'},
    310:{program:'https://www.msfinance.uzh.ch/en.html',apply:'https://www.msfinance.uzh.ch/en/admission/onlineapplication.html'},
    311:{program:'https://seng.hkust.edu.hk/academics/taught-postgraduate/msc-fintech',apply:'https://fytgs.hkust.edu.hk/applynow'},
    312:{program:'https://rmi.nus.edu.sg/mfe-program/',apply:'https://rmi.nus.edu.sg/mfe-program/application/'},
    313:{program:'https://www.ox.ac.uk/admissions/graduate/courses/msc-law-and-finance',apply:'https://www.ox.ac.uk/admissions/graduate/courses/msc-law-and-finance'},
    314:{program:'https://www.postgraduate.study.cam.ac.uk/courses/directory/lelempref',apply:'https://www.postgraduate.study.cam.ac.uk/courses/directory/lelempref/apply'},
    315:{program:'https://msande.stanford.edu/academics-admissions/graduate/ms-program',apply:'https://msande.stanford.edu/academics-admissions/graduate/admission'},
    316:{program:'https://academics.business.columbia.edu/msfe',apply:'https://academics.business.columbia.edu/msfe/admissions/application-requirements'},
    317:{program:'https://www.gsas.columbia.edu/content/mathematics-finance',apply:'https://www.gsas.columbia.edu/content/mathematics-finance'},
    318:{program:'https://engineering.nyu.edu/academics/programs/financial-engineering-ms',apply:'https://engineering.nyu.edu/admissions/graduate/apply'},
    319:{program:'https://www.anderson.ucla.edu/degrees/master-of-financial-engineering',apply:'https://www.anderson.ucla.edu/degrees/master-of-financial-engineering/admissions/requirements'},
    320:{program:'https://business.vanderbilt.edu/masters-in-finance/',apply:'https://business.vanderbilt.edu/masters-in-finance/admissions/application-instructions/'},
    321:{program:'https://sites.lsa.umich.edu/quant/',apply:'https://sites.lsa.umich.edu/quant/admissions/'},
    322:{program:'https://qcf.gatech.edu/',apply:'https://www.qcf.gatech.edu/prospective-students/application-requirements'},

    401:{program:'https://www.gsm.pku.edu.cn/mfin/index.htm',apply:'https://www.gsm.pku.edu.cn/__local/D/91/1A/58DDA27E9594E6CFDC313A901D8_496D5812_1BDAF.pdf'},
    402:{program:'https://www.gsm.pku.edu.cn/mfin/index.htm',apply:'https://www.gsm.pku.edu.cn/__local/D/91/1A/58DDA27E9594E6CFDC313A901D8_496D5812_1BDAF.pdf'},
    403:{program:'https://www.gsm.pku.edu.cn/ba/xmgk/xmjx.htm',apply:'https://www.gsm.pku.edu.cn/ba/zsxx/cjwt.htm'},
    404:{program:'https://www.gsm.pku.edu.cn/mfin/index.htm',apply:'https://www.gsm.pku.edu.cn/__local/D/91/1A/58DDA27E9594E6CFDC313A901D8_496D5812_1BDAF.pdf'},
    405:{program:'https://www.gsm.pku.edu.cn/mpacc/',apply:'https://www.gsm.pku.edu.cn/mpacc/info/1204/3902.htm'},
    410:{program:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf',apply:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf'},
    411:{program:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf',apply:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf'},
    412:{program:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf',apply:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf'},
    413:{program:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf',apply:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf'},
    414:{program:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf',apply:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf'},
    415:{program:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf',apply:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf'},
    416:{program:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf',apply:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf'},
    417:{program:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf',apply:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf'},
    418:{program:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf',apply:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf'},
    419:{program:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf',apply:'https://www.gsm.pku.edu.cn/__local/C/1C/04/DD8A38C8BCBE5B49FFCAE0D2DD1_12417E5F_1AA56.pdf'},
    430:{program:'https://masters.sem.tsinghua.edu.cn/jrss1.htm',apply:'https://masters.sem.tsinghua.edu.cn/info/1291/3612.htm'},
    431:{program:'https://masters.sem.tsinghua.edu.cn/glssxm1/xmgk.htm',apply:'https://masters.sem.tsinghua.edu.cn/info/1291/3612.htm'},
    432:{program:'https://masters.sem.tsinghua.edu.cn/qhdx_glbydxswfxsssxwxm1.htm',apply:'https://masters.sem.tsinghua.edu.cn/info/1291/3612.htm'},
    433:{program:'https://masters.sem.tsinghua.edu.cn/jrss1/gjhz.htm',apply:'https://masters.sem.tsinghua.edu.cn/info/1291/3612.htm'},
    434:{program:'https://www.pbcsf.tsinghua.edu.cn/bkwm/jrss_qrz_.htm',apply:'https://www.pbcsf.tsinghua.edu.cn/info/1146/10497.htm'}
  };

  const normalize=url=>String(url||'').trim().replace(/[?#].*$/,'').replace(/\/+$/,'').toLowerCase();
  window.GRADPATH_GET_OFFICIAL_LINKS=function(program){
    const item=window.GRADPATH_OFFICIAL_LINKS[program.id]||{program:program.url,apply:program.url};
    const programUrl=item.program||item.apply||program.url;
    const applyUrl=item.apply||item.program||program.url;
    return {program:programUrl,apply:applyUrl,same:normalize(programUrl)===normalize(applyUrl)};
  };
})();
