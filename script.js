document.getElementById('pdfForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const input = document.getElementById('pdfFiles');
    if (input.files.length === 0) {
        alert('Please select PDF files to merge.');
        return;
    }

    const mergedPdf = await PDFLib.PDFDocument.create();

    for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const output = document.getElementById('output');
    output.innerHTML = `<a href="${url}" download="merged.pdf">Download Merged PDF</a>`;
});
