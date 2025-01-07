const mongoose = require('mongoose')
const subcategorey = new mongoose.Schema({
    subCategoreyName:{
        type:String
    }
},{timestamps:true})
module.exports = mongoose.model('subcategorey',subcategorey)