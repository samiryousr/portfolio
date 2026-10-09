import PDFDocument from 'pdfkit';
import { cvData } from '@/data/cv';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const PAGE_MARGIN = 44;
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2;
const INK = '#202126';
const MUTED = '#59606a';
const ACCENT = '#202126';
const RULE = '#d7d9dd';

function addSectionHeading(
  doc: PDFKit.PDFDocument,
  text: string,
  y: number,
) {
  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(ACCENT)
    .text(text.toUpperCase(), PAGE_MARGIN, y);
  doc
    .moveTo(PAGE_MARGIN, y + 14)
    .lineTo(PAGE_WIDTH - PAGE_MARGIN, y + 14)
    .lineWidth(0.6)
    .strokeColor(RULE)
    .stroke();
  return y + 19;
}

function addLink(
  doc: PDFKit.PDFDocument,
  text: string,
  url: string,
  x: number,
  y: number,
) {
  doc.font('Helvetica').fontSize(8.5).fillColor(ACCENT);
  const textWidth = doc.widthOfString(text);
  doc.text(text, x, y, { link: url, underline: true });
  return textWidth;
}

function createCvPdf() {
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 0,
      compress: true,
      info: {
        Title: `${cvData.name} - CV`,
        Author: cvData.name,
        Subject: cvData.title,
      },
    });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    let y = 37;
    doc.font('Helvetica-Bold').fontSize(24).fillColor(INK);
    doc.text(cvData.name, PAGE_MARGIN, y);
    y += 29;

    doc.font('Helvetica-Bold').fontSize(10.5).fillColor(ACCENT);
    doc.text(cvData.title, PAGE_MARGIN, y);
    y += 22;

    let linkX = PAGE_MARGIN;
    const contactItems = [
      { label: cvData.email, url: cvData.emailUrl },
      { label: cvData.github, url: cvData.githubUrl },
      { label: cvData.linkedIn, url: cvData.linkedInUrl },
    ];
    contactItems.forEach((item, index) => {
      const width = addLink(doc, item.label, item.url, linkX, y);
      linkX += width + 13;
      if (index < contactItems.length - 1) {
        doc.font('Helvetica').fontSize(8.5).fillColor(MUTED);
        doc.text('·', linkX - 7, y);
      }
    });
    y += 21;

    y = addSectionHeading(doc, 'Professional Summary', y);
    doc.font('Helvetica').fontSize(9.2).fillColor(INK);
    const summaryHeight = doc.heightOfString(cvData.summary, {
      width: CONTENT_WIDTH,
      lineGap: 2,
    });
    doc.text(cvData.summary, PAGE_MARGIN, y, {
      width: CONTENT_WIDTH,
      lineGap: 2,
    });
    y += summaryHeight + 8;

    y = addSectionHeading(doc, 'Freelance Experience', y);
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(INK);
    doc.text(cvData.experience.title, PAGE_MARGIN, y);
    doc.font('Helvetica').fontSize(8.5).fillColor(MUTED);
    const employerText = `${cvData.experience.employer}  |  ${cvData.experience.dates}`;
    const employerWidth = doc.widthOfString(employerText);
    doc.text(employerText, PAGE_WIDTH - PAGE_MARGIN - employerWidth, y);
    y += 13;

    doc.font('Helvetica-Bold').fontSize(8.7).fillColor(INK);
    doc.text(cvData.experience.project, PAGE_MARGIN, y);
    y += 12;

    doc.font('Helvetica').fontSize(8.5).fillColor(INK);
    cvData.experience.bullets.forEach((bullet) => {
      const bulletText = `- ${bullet}`;
      const bulletHeight = doc.heightOfString(bulletText, {
        width: CONTENT_WIDTH - 8,
        lineGap: 1,
      });
      doc.text(bulletText, PAGE_MARGIN + 8, y, {
        width: CONTENT_WIDTH - 8,
        lineGap: 1,
      });
      y += bulletHeight + 2;
    });
    y += 4;

    y = addSectionHeading(doc, 'Selected Projects', y);
    cvData.projects.forEach((project) => {
      doc.font('Helvetica-Bold').fontSize(9.5).fillColor(INK);
      doc.text(project.name, PAGE_MARGIN, y);
      y += 13;

      doc.font('Helvetica').fontSize(8).fillColor(MUTED);
      doc.text(project.technologies, PAGE_MARGIN, y, {
        width: CONTENT_WIDTH,
      });
      y += 12;

      doc.font('Helvetica').fontSize(8.8).fillColor(INK);
      const descriptionHeight = doc.heightOfString(project.description, {
        width: CONTENT_WIDTH,
        lineGap: 1.5,
      });
      doc.text(project.description, PAGE_MARGIN, y, {
        width: CONTENT_WIDTH,
        lineGap: 1.5,
      });
      y += descriptionHeight + 3;

      let projectLinkX = PAGE_MARGIN;
      const liveWidth = addLink(
        doc,
        'Live Demo',
        project.liveUrl,
        projectLinkX,
        y,
      );
      projectLinkX += liveWidth + 9;
      doc.font('Helvetica').fontSize(8.5).fillColor(MUTED);
      doc.text('·', projectLinkX - 5, y);
      addLink(
        doc,
        'GitHub',
        project.githubUrl,
        projectLinkX + 3,
        y,
      );
      y += 14;
    });

    y = addSectionHeading(doc, 'Technical Skills', y);
    cvData.skills.forEach((skill) => {
      const labelWidth = 104;
      const itemsWidth = CONTENT_WIDTH - labelWidth;
      doc.font('Helvetica').fontSize(8.8);
      const itemsHeight = doc.heightOfString(skill.items, {
        width: itemsWidth,
        lineGap: 1,
      });
      doc.font('Helvetica-Bold').fillColor(INK);
      doc.text(skill.category, PAGE_MARGIN, y, {
        width: labelWidth - 8,
      });
      doc.font('Helvetica').fillColor(MUTED);
      doc.text(skill.items, PAGE_MARGIN + labelWidth, y, {
        width: itemsWidth,
        lineGap: 1,
      });
      y += Math.max(14, itemsHeight + 3);
    });
    y += 7;

    y = addSectionHeading(doc, 'Education', y);
    doc.font('Helvetica-Bold').fontSize(9.2).fillColor(INK);
    doc.text(cvData.education.institution, PAGE_MARGIN, y);
    doc.font('Helvetica').fillColor(MUTED);
    doc.text(
      `${cvData.education.program}  |  ${cvData.education.dates}`,
      PAGE_MARGIN,
      y + 13,
    );
    y += 34;

    if (y > PAGE_HEIGHT - PAGE_MARGIN) {
      reject(new Error(`CV content exceeds one A4 page (${Math.ceil(y)}pt).`));
      doc.end();
      return;
    }

    doc.end();
  });
}

export async function GET() {
  const pdf = await createCvPdf();

  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Samir_Yousri_CV.pdf"',
      'Content-Length': String(pdf.byteLength),
      'Cache-Control': 'no-store',
    },
  });
}
