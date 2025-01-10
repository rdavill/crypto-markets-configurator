import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Configure The State of European Crypto Markets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            {sections.map((section) => (
              <div 
                key={section.id}
                className="flex items-center space-x-3 p-4 border rounded hover:bg-gray-50"
              >
                <Checkbox
                  checked={selectedSections[section.id]}
                  onCheckedChange={() => toggleSection(section.id)}
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

          <div className="pt-4">
            <Button 
              className="w-full"
              onClick={handleDownload}
            >
              Download Custom Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PDFConfigurator;
