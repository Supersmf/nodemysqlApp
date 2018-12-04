const fs = require('fs');
const pdfkit = require('pdfkit');

const createPdf = (item) => {
	let bufferBase64 = new Buffer.from( item.image.data, 'binary').toString('base64');
	let base64Flag = 'data:image/jpeg;base64,' + bufferBase64;
	let doc = new pdfkit();

	doc.pipe(fs.createWriteStream('pdf/file.pdf'));
	doc.text(`${item.firstName} ${item.lastName}`, 100, 100);
	doc.image(base64Flag, {width: 400});
	doc.end();
}

module.exports = createPdf;
	