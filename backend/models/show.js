const mongoose  = require("mongoose");

const showschema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true,
    },
    cast:{
        type:String,
        required:true
    },
    showtype:{
        required:true,
        type:String,
        enum:["online","Theatre"]
    },
    onlineShows:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"onlinesection"
    },
    categories:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('shows',showschema)