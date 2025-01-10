import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

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
    
    try {
      // Fetch the original PDF
      const response = await fetch(pdfUrl);
      const pdfBytes = await response.arrayBuffer();
      
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(pdfBytes);
      
      // Create a new PDF document for selected pages
      const newPdfDoc = await PDFDocument.create();
      
      // Copy selected pages to new document
      for (const pageNum of selectedPages) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNum - 1]);
        newPdfDoc.addPage(copiedPage);
      }
      
      // Save the new PDF
      const newPdfBytes = await newPdfDoc.save();
      
      // Create a download link
      const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'selected-crypto-markets-report.pdf';
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Configure The State of European Crypto Markets</h1>
        
        <div className="space-y-4">
          {sections.map((section) => (
            <div 
              key={section.id}
              className="flex items-center space-x-3 p-4 border rounded hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selectedSections[section.id]}
                onChange={() => toggleSection(section.id)}
                id={section.id}
              />
              <label 
                htmlFor={section.id}
                className="font-medium cursor-pointer"
              >
                {section.label}
              </label>
            </div>
          ))}
        </div>

        <button 
          onClick={handleDownload}
          className="w-full mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Download Custom Report
        </button>
      </div>
    </div>
  );
};

export default PDFConfigurator;
