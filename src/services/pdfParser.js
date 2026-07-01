const { PdfReader } = require('pdfreader');

function parsePdf(file_buffer) {
    return new Promise((resolve, reject) => {
        let fullText = '';
        new PdfReader().parseBuffer(file_buffer, (err, item) => {
            if (err) {
                reject(err);
            } else if (!item) {
                // end of file
                resolve(fullText);
            } else if (item.text) {
                fullText += item.text + ' ';
            }
        });
    });
}

module.exports = parsePdf;