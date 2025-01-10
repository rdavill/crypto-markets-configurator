import React, { useState } from 'react';

const PDFConfigurator = () => {
  const [selectedSections, setSelectedSections] = useState({
    part1: false,
    part2: false,
    part3: false
  });

  const sections = [
    { id: 'part1', label: 'Part 1' },
    { id: 'part2', label: 'Part 2' },
    { id: 'part3', label: 'Part 3' }
  ];

  const toggleSection = (sectionId) => {
    setSelectedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getSelectedPages = () => {
    const mandatoryPages = [1, 10];
    let selectedPages = [...mandatoryPages];
    
    if (selectedSections.part1) selectedPages.push(3, 4, 5);
    if (selectedSections.part2) selectedPages.push(6, 7);
    if (selectedSections.part3) selectedPages.push(8, 9);
    
    return selectedPages.sort((a, b) => a - b);
  };

  const handleDownload = () => {
    const selectedPages = getSelectedPages();
    alert(`Selected pages: ${selectedPages.join(', ')}`);
  };

  return (
    <div>
      <h1>Configure The State of European Crypto Markets</h1>
      {sections.map((section) => (
        <div key={section.id}>
          <input
            type="checkbox"
            checked={selectedSections[section.id]}
            onChange={() => toggleSection(section.id)}
            id={section.id}
          />
          <label htmlFor={section.id}>{section.label}</label>
        </div>
      ))}
      <button onClick={handleDownload}>Download Custom Report</button>
    </div>
  );
};

export default PDFConfigurator;
