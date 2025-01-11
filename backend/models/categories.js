const mongoose = require('mongoose')
const categories = new mongoose.Schema({
    categorieyName:{
        type:String,
        required:true
    },
    subCategoreyname:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subcategorey"
    }
},{timestamps:true})
module.exports = mongoose.model('categories',categories)