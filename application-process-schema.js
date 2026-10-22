(function () {
  const LEVELS = ['official_required', 'official_preferred', 'admissions_advice', 'alumni_report'];
  const STATUSES = ['required', 'invited', 'selective', 'none', 'unknown'];

  function validateProcess(process) {
    const errors = [];
    if (!process || typeof process !== 'object') return { valid: false, errors: ['process: required'] };
    const sources = new Map((process.sources || []).map((source) => [source.id, source]));
    const checkEvidence = (item, path) => {
      if (!LEVELS.includes(item.evidenceLevel)) errors.push(`${path}.evidenceLevel: unsupported`);
      if (item.evidenceLevel === 'official_required' || item.evidenceLevel === 'official_preferred') {
        const official = (item.sourceIds || []).some((id) => sources.get(id)?.type === 'official');
        if (!official) errors.push(`${path}.sourceIds: official source required`);
      }
    };

    (process.cycle?.rounds || []).forEach((round, index) => {
      if (round.date && !round.timezone && !round.timingNote) errors.push(`cycle.rounds[${index}]: timezone or timingNote required`);
    });
    (process.completionDefinition || []).forEach((item, index) => checkEvidence(item, `completionDefinition[${index}]`));
    for (const group of ['required', 'preferred', 'optional', 'rejected']) {
      (process.materials?.[group] || []).forEach((item, index) => checkEvidence(item, `materials.${group}[${index}]`));
    }
    for (const group of ['postSubmission', 'assessments', 'afterAdmission']) {
      (process[group] || []).forEach((item, index) => {
        if (item.status && !STATUSES.includes(item.status)) errors.push(`${group}[${index}].status: unsupported`);
        checkEvidence(item, `${group}[${index}]`);
      });
    }
    return { valid: errors.length === 0, errors };
  }

  function getProcess(programId) {
    const active = (window.GRADPATH_PROGRAMS || []).some((program) => program.id === Number(programId));
    if (!active) return null;
    return (window.GRADPATH_APPLICATION_PROCESSES || {})[programId] || null;
  }

  window.GRADPATH_PROCESS_SCHEMA_LEVELS = LEVELS;
  window.GRADPATH_VALIDATE_PROCESS = validateProcess;
  window.GRADPATH_GET_PROCESS = getProcess;
  window.GRADPATH_APPLICATION_PROCESSES = window.GRADPATH_APPLICATION_PROCESSES || {};
})();
