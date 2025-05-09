// utils/generatePdf.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePdf = async (elementId) => {
  const element = document.getElementById(elementId);
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF();
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 295; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save('certificate.pdf');

  // Show alert after download
  alert('Your PDF has been downloaded successfully!');
};
