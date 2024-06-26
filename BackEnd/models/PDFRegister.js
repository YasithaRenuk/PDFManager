const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PDFRegisterSchema = new Schema({
    OwnerEmail:{
        type:String,
        require:true
    },
    FilePath:{
        type:String,
        require:true
    },
    FileName:{
        type:String,
        require:true
    },
    FileSize:{
        type:String,
        require:true
    }
},
{timestamps:true}
)

const PDFRegister = mongoose.model("PDFRegister",PDFRegisterSchema)

module.exports = PDFRegister;