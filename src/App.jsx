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
    
    if (selectedSections.part1) {
      selectedPages.push(3, 4, 5);
    }
    if (selectedSections.part2) {
      selectedPages.push(6, 7);
    }
    if (selectedSections.part3) {
      selectedPages.push(8, 9);
    }
    
    return selectedPages.sort((a, b) => a - b);
  };

  const handleDownload = async () => {
    const selectedPages = getSelectedPages();
    const pdfUrl = 'https://25446524.fs1.hubspotusercontent-eu1.net/hubfs/25446524/Research/The%20State%20of%20European%20Crypto%20Markets.pdf';
    alert(`Selected pages: ${selectedPages.join(', ')}\nFull implementation would download a PDF with these pages from: ${pdfUrl}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 classNa
