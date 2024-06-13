const PDFRegister = require('../models/PDFRegister');

const singleFileUpload = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const file = new PDFRegister({
            FileName: req.file.originalname,
            FilePath: req.file.path,
            FileSize: fileSizeFormatter(req.file.size, 2)
        });

        await file.save();
        res.status(201).send('File uploaded successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
};

module.exports = {
    singleFileUpload
};
