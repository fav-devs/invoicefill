import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useInvoice } from '@/context/InvoiceContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PdfGeneratorProps {
  previewRef: React.RefObject<HTMLDivElement>;
}

const PdfGenerator: React.FC<PdfGeneratorProps> = ({ previewRef }) => {
  const { invoice } = useInvoice();

  const generatePdf = async () => {
    if (!previewRef.current) return;

    try {
      // Show loading state
      console.log('Generating PDF...');

      // Create canvas from the preview element
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Calculate dimensions to fit the content properly
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add the image to the PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Save the PDF
      pdf.save(`Invoice_${invoice.invoiceNumber}.pdf`);
      
      console.log('PDF generated successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Button 
      onClick={generatePdf} 
      className="w-full"
    >
      Generate PDF
    </Button>
  );
};

export default PdfGenerator;
