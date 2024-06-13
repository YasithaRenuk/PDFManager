const PDFRegister = require('../models/PDFRegister');
const {fileSizeFormatter} = require('../helpers/FileSizeFormatter.helper')

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

module.exports = {
    singleFileUpload
};
