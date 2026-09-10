import pdfParse from 'pdf-parse';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const fileBuffer = req.body.file;

      if (!fileBuffer) {
        return res.status(400).json({ error: "No PDF file attached." });
      }

      const pdfData = await pdfParse(fileBuffer);
      const extractedText = pdfData.text;

      const lines = extractedText.split('\n');
      let csvRows = ['Date,Description,Amount'];

      lines.forEach(line => {
        // Add your transaction regex formatting here
      });

      const csvOutput = csvRows.join('\n');
      return res.status(200).setHeader('Content-Type', 'text/csv').send(csvOutput);
      
    } catch (error) {
      return res.status(500).json({ status: "Error", message: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed. Use POST." });
  }
}