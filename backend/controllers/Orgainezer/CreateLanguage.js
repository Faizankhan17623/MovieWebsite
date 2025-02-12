const language = require('../../models/CreateLanguage')
exports.CreateLanguage = async(req,res)=>{
    try {
        const {langname} = req.body
        const Finding = await language.findOne({name:langname})
        if(Finding){
            return res.status(400).json({
                message:"This name is already been taken please take another one",
                success:false
            })
        }
        const Creation = await language.create({name:langname})
        return res.status(200).json({
            message:"The new language is been created",
            success:true
        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the create language code ",
            success:false
        })
    }
}

exports.updateLanguage = async(req,res)=>{
    try {
        const {newname,id} = req.body
        const Finding = await language.findOne({newname})
        if(Finding){
            return res.status(400).json({
                message:"This name is already been taken please take another one",
                success:false
            })
        }

        const updation = await language.findOneAndUpdate(id,{$push:{name:newname}},{new:true})
        return res.status(200).json({
            message:"The new language is been created",
            success:true
        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the update language code ",
            success:false
        })
    }
}




exports.deleteLanguage = async(req,res)=>{
    try {
        const {id} = req.body
        const Finding = await language.findOne({id})
        if(Finding){
            return res.status(400).json({
                message:"This language name is not present please recheck",
                success:false
            })
        }

        const updation = await language.deleteOne(id)
        return res.status(200).json({
            message:"The language is been deleted",
            success:true
        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the delete language code ",
            success:false
        })
    }
}



exports.Getalllanguage = async(req,res)=>{
    try {
        const Finding = await language.find()
        if(Finding.length<1){
            return res.status(400).json({
                message:"There are no languages created please create one",
                success:false,
                data:Finding
            })
        }

        return res.status(200).json({
            message:"This is the list of all the languages present",
            success:true,
            data:Finding
        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the get all language code ",
            success:false
        })
    }
}



exports.deleteallanguage = async(req,res)=>{
    try {
        const Finding = await language.deleteMany()
        if(Finding.length<1){
            return res.status(400).json({
                message:"There are no languages created please create one",
                success:false,
                data:Finding
            })
        }

        return res.status(200).json({
            message:"Congrogulations all the languages are been deleted",
            success:true,
            data:Finding
        })

    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the delete all language code ",
            success:false
        })
    }
}