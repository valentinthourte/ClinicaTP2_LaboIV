import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportarPdfService {

  constructor() { }

  async generarPDF(subtitulo: string, encabezados: any[], filas: any[], titulo = 'Documento', nombreArchivo = 'documento', logoPath = 'assets/logo_negro.png') {
    const doc = new jsPDF();
    const width = doc.internal.pageSize.getWidth();

    const logo = new Image();
    logo.src = logoPath;

    logo.onload = () => {
      const logoWidth = 40;
      const logoHeight = 40;
      const xPos = (width - logoWidth) / 2;
      const yPos = 10;

      doc.addImage(logo, 'PNG', xPos, yPos, logoWidth, logoHeight);
      doc.setFontSize(10);
      doc.text(`Emitido el: ${new Date().toLocaleDateString('es-AR')}`, width - 60, 10);

      const yTitulo = yPos + logoHeight + 10;
      doc.setFontSize(18);
      const tituloWidth = doc.getTextWidth(titulo);
      doc.text(titulo, (width - tituloWidth) / 2, yTitulo);

      if (subtitulo) {
        doc.setFontSize(12);
        const subtituloWidth = doc.getTextWidth(subtitulo);
        doc.text(subtitulo, (width - subtituloWidth) / 2, yTitulo + 8);
      }

      autoTable(doc, {
        head: [encabezados],
        body: filas,
        startY: subtitulo ? yTitulo + 14 : yTitulo + 10,
        headStyles: {
          fillColor: [53, 112, 221],
          textColor: 255,
          halign: 'center',
          fontStyle: 'bold'
        },
        styles: {
          halign: 'center'
        }
      });

      doc.save(`${nombreArchivo}_${new Date().toISOString().slice(0, 10)}.pdf`);
    };
  }

    async generarPDFConFoto(
    subtitulo: string,
    encabezados: any[],
    filas: any[],
    fotoPerfilPath: string,
    titulo = 'Documento',
    nombreArchivo = 'documento',
    logoPath = 'assets/logo_negro.png'
  ) {
    const doc = new jsPDF();
    const width = doc.internal.pageSize.getWidth();

    const logo = new Image();
    logo.src = logoPath;

    logo.onload = () => {
      
      const logoWidth = 20;
      const logoHeight = 20;
      const xLogo = 10;
      const yLogo = 10;

      doc.addImage(logo, 'PNG', xLogo, yLogo, logoWidth, logoHeight);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Clínica VT', xLogo + logoWidth + 5, yLogo + 14);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Emitido el: ${new Date().toLocaleDateString('es-AR')}`, width - 60, yLogo + 5);

      let yOffset = yLogo + logoHeight + 10;
      if (fotoPerfilPath) {
        const foto = new Image();
        foto.src = fotoPerfilPath;
        foto.onload = () => {
          const fotoSize = 30;
          const xFoto = (width - fotoSize) / 2;
          doc.setDrawColor(0);
          doc.setLineWidth(0.5);
          doc.addImage(foto, 'JPEG', xFoto, yOffset, fotoSize, fotoSize, '', 'FAST');
          yOffset += fotoSize + 8;
          renderTextoYTabla();
        };
      }

      const renderTextoYTabla = () => {
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        const tituloWidth = doc.getTextWidth(titulo);
        doc.text(titulo, (width - tituloWidth) / 2, yOffset);
        yOffset += 8;

        if (subtitulo) {
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          const subtituloWidth = doc.getTextWidth(subtitulo);
          doc.text(subtitulo, (width - subtituloWidth) / 2, yOffset);
          yOffset += 8;
        }
        autoTable(doc, {
          head: [encabezados],
          body: filas,
          startY: yOffset,
          headStyles: {
            fillColor: [53, 112, 221],
            textColor: 255,
            halign: 'center',
            fontStyle: 'bold'
          },
          styles: {
            halign: 'center'
          }
        });
        doc.save(`${nombreArchivo}_${new Date().toISOString().slice(0, 10)}.pdf`);
      };
    };
  }


  // async generarPDFConFoto(subtitulo: string, encabezados: any[], filas: any[], titulo = 'Documento', nombreArchivo = 'documento', fotoPerfilPath: string = "", logoPath = 'assets/logo_negro.png') {
  //   try {
      
  //     const doc = new jsPDF();
  //     const width = doc.internal.pageSize.getWidth();
  
  //     const logo = new Image();
  //     logo.src = logoPath;
  
  //     logo.onload = () => {
  //       const logoWidth = 20;
  //       const logoHeight = 20;
  //       const xLogo = 10;
  //       const yLogo = 10;
  
  //       doc.addImage(logo, 'PNG', xLogo, yLogo, logoWidth, logoHeight);
  //       doc.setFontSize(14);
  //       doc.setFont('helvetica', 'bold');
  //       doc.text('Clínica VT', xLogo + logoWidth + 5, yLogo + 14);
  
  //       doc.setFontSize(10);
  //       doc.setFont('helvetica', 'normal');
  //       doc.text(`Emitido el: ${new Date().toLocaleDateString('es-AR')}`, width - 60, yLogo + 5);
  
  //       let yOffset = yLogo + logoHeight + 10;
  //       if (fotoPerfilPath) {
  //         const foto = new Image();
  //         foto.src = fotoPerfilPath;
  //         foto.onload = () => {
  //           const fotoSize = 30;
  //           const xFoto = (width - fotoSize) / 2;
  //           doc.setDrawColor(0);
  //           doc.setLineWidth(0.5);
  //           doc.addImage(foto, 'JPEG', xFoto, yOffset, fotoSize, fotoSize, '', 'FAST');
  //           yOffset += fotoSize + 8;
  //           this.renderTextoYTabla(doc, titulo, subtitulo, encabezados, filas, yOffset);
  //         };
  //       } else {
  //         this.renderTextoYTabla(doc, titulo, subtitulo, encabezados, filas, yOffset);
  //       }
  //       doc.save(`${nombreArchivo}_${new Date().toISOString().slice(0, 10)}.pdf`);
  //     };
  //   }
  //   catch(err: any) {
  //     throw new Error(`Error al generar PDF: ${err.message}`);
  //   }
  // }

  //   renderTextoYTabla(
  //   doc: jsPDF,
  //   titulo: string,
  //   subtitulo: string,
  //   encabezados: any[],
  //   filas: any[],
  //   startY: number
  // ) {
  //   const width = doc.internal.pageSize.getWidth();

  //   doc.setFontSize(18);
  //   doc.setFont('helvetica', 'bold');
  //   const tituloWidth = doc.getTextWidth(titulo);
  //   doc.text(titulo, (width - tituloWidth) / 2, startY);
  //   let nextY = startY + 8;

  //   if (subtitulo) {
  //     doc.setFontSize(12);
  //     doc.setFont('helvetica', 'normal');
  //     const subtituloWidth = doc.getTextWidth(subtitulo);
  //     doc.text(subtitulo, (width - subtituloWidth) / 2, nextY);
  //     nextY += 8;
  //   }

  //   autoTable(doc, {
  //     head: [encabezados],
  //     body: filas,
  //     startY: nextY,
  //     headStyles: {
  //       fillColor: [53, 112, 221],
  //       textColor: 255,
  //       halign: 'center',
  //       fontStyle: 'bold'
  //     },
  //     styles: {
  //       halign: 'center'
  //     }
  //   });

  //   return doc;
  // }

}
