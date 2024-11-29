export const gradingData = {
  sections: [
    {
      title: 'Scene Size-Up',
      rows: [
        { label: 'BSI', points: 0.5, index: 0 },
        { label: 'MOI', points: 0.5, index: 1 },
        { label: 'Resources', points: 0.5, index: 2 },
        { label: 'C-Spine', points: 0.5, index: 3 },
      ],
    },
    {
      title: 'Primary Assessment',
      rows: [
        { label: 'General Impression', points: 0.5, index: 4 },
        { label: 'LOC/Mental', points: 0.5, index: 5 },
        { label: 'C/C', points: 0.5, index: 6 },
        { label: 'Airway', points: 0.5, index: 7 },
        { label: 'Breathing', points: 0.5, index: 8 },
        { label: 'Circulation', points: 0.5, index: 9 },
        { label: 'GCS', points: 0.5, index: 10 },
        { label: 'Decision', points: 0.5, index: 11 },
      ],
    },
    {
      title: 'Secondary Assessment',
      subsections: [
        {
          title: 'Signs & Symptoms',
          rows: [
            { label: 'Path 1', points: 1.0, index: 12 },
            { label: 'Path 2', points: 1.0, index: 13 },
            { label: 'Path 3', points: 1.0, index: 14 },
          ],
        },
        {
          title: 'Physical Exam',
          subsections: [
            {
              title: 'Head',
              rows: [
                { label: 'Eyes', points: 0.5, index: 15 },
                { label: 'Nose', points: 0.5, index: 16 },
                { label: 'Ears', points: 0.5, index: 17 },
                { label: 'Mouth', points: 0.5, index: 18 },
              ],
            },
            {
              title: 'Neck',
              rows: [
                { label: 'Front', points: 0.5, index: 19 },
                { label: 'Sides', points: 0.5, index: 20 },
                { label: 'Cervical', points: 0.5, index: 21 },
              ],
            },
            {
              title: 'Chest',
              rows: [
                { label: 'Inspection', points: 0.5, index: 22 },
                { label: 'Auscultation', points: 0.5, index: 23 },
                { label: 'Palpation', points: 0.5, index: 24 },
              ],
            },
            {
              title: 'Abdomen',
              rows: [
                { label: 'Inspection', points: 0.5, index: 25 },
                { label: 'Palpation', points: 0.5, index: 26 },
              ],
            },
            {
              title: 'Pelvis',
              rows: [
                { label: 'Palpation', points: 0.5, index: 27 },
                { label: 'Genitalia', points: 0.5, index: 28 },
              ],
            },
            {
              title: 'Right Leg',
              rows: [
                { label: 'Upper', points: 0.5, index: 29 },
                { label: 'Lower', points: 0.5, index: 30 },
              ],
            },
            {
              title: 'Left Leg',
              rows: [
                { label: 'Upper', points: 0.5, index: 31 },
                { label: 'Lower', points: 0.5, index: 32 },
              ],
            },
            {
              title: 'Right Arm',
              rows: [
                { label: 'Upper', points: 0.5, index: 33 },
                { label: 'Lower', points: 0.5, index: 34 },
              ],
            },
            {
              title: 'Left Arm',
              rows: [
                { label: 'Upper', points: 0.5, index: 35 },
                { label: 'Lower', points: 0.5, index: 36 },
              ],
            },
            {
              title: 'Posterior',
              rows: [
                { label: 'Thorax', points: 0.5, index: 37 },
                { label: 'Lumbar', points: 0.5, index: 38 },
                { label: 'Buttocks', points: 0.5, index: 39 },
              ],
            },
          ],
        },
        {
          title: 'Secondary Injuries',
          rows: [
            { label: 'Injury 1', points: 0.5, index: 40 },
            { label: 'Injury 2', points: 0.5, index: 41 },
            { label: 'Injury 3', points: 0.5, index: 42 },
            { label: 'Injury 4', points: 0.5, index: 43 },
            { label: 'Injury 5', points: 0.5, index: 44 },
          ],
        },
      ],
    },
    {
      title: 'Vital Signs & History',
      rows: [
        { label: 'Vitals 1', points: 0, index: 45, disabled: true },
        { label: 'Vitals 2', points: 2.5, index: 46 },
        { label: 'Vitals 3', points: 2.5, index: 47 },
        { label: 'Past Hx', points: 0.5, index: 48 },
        { label: 'Reassessment', points: 0.5, index: 49 },
      ],
    },
  ],
};

export const getAllRows = () => {
  const flattenSections = (sections) => {
    return sections.flatMap((section) => {
      let rows = [];
      if (section.rows) {
        rows = [...rows, ...section.rows];
      }
      if (section.subsections) {
        rows = [...rows, ...flattenSections(section.subsections)];
      }
      return rows;
    });
  };

  return flattenSections(gradingData.sections);
};

export default gradingData;