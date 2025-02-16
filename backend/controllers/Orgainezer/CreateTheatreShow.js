const CreateShow = require('../../models/CreateShow')
const {uploadDatatoCloudinary} = require('../../utils/imageUploader')
const genre = require('../../models/genre')
const subgenre = require('../../models/subgenre')
const language = require('../../models/CreateLanguage')
const hashtags = require('../../models/CreateHashtags')
const cast = require('../../models/Createcast')
const USER = require('../../models/user')
const message = require('../../models/Createmessage')
const mongoose = require('mongoose')
const date = require('date-and-time')
const cookie = require('cookie-parser')
const Theatres = require('../../models/Theatres')
// Helper function to convert total seconds to the duration format
function convertSecondsToDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor((totalSeconds % 3600) % 60)
  
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
}  
exports.CreateShow = async(req,res)=>{
    try {
        const {title,tagline,releasedate,genreid,subgenereid,languagename,showType="Theatre",castid,directorname,producername,writersname,totalbudget,hashid} = req.body
        const image = req.files.image
        const trailer = req.files.trailer
        // console.log('THis is the image ',image.size)
        // console.log("This is the trailer",trailer.size)
        const max_upload_size = 100
        if(!title || !tagline || !releasedate || !genreid || !subgenereid || !languagename  || !castid || !directorname ||!producername||!writersname || !totalbudget || !hashid ){
            return res.status(400).json({
                message:"This input fields are been required",
                success:false
            })
        }

        
        if(!req.files.image || !req.files.trailer || !req.files){
            return res.status(400).json({
                message:"The input fields of the images are been required",
                success:false
            })
        }

        const Image_Format = ['png','jpeg','jpg']
        const Video_Format = ['mp4','mov','mkv','gif','mkv','mpeg']

        let imageTypes = image.mimetype.split('/')[1].toLowerCase();

        let VideoTypes = trailer.mimetype.split('/')[1].toLowerCase()


        if(!Image_Format.includes(imageTypes)){
            return res.status(400).json({
                message:`The image type is not valid The valid types are ${Image_Format}`,
                success:false
            })
        }


        if(!Video_Format.includes(VideoTypes)){
            return res.status(400).json({
                message:`The video type is not valid The valid types are ${Video_Format}`,
                success:false
            })
        }

        if(image.size / (1024*1024) > max_upload_size && trailer.size / (1024*1024) > max_upload_size){
            return res.status(400).json({
                 error: `THe image file or the video fie is too large maximum allowed is ${max_upload_size}mb`
            })
        }

        const FindingTitle = await CreateShow.findOne({title:title})
        const FindingTagline = await CreateShow.findOne({tagline})
        const findingGenreid  = await genre.findOne({_id:genreid})
        const findingsubGenreid  = await subgenre.findOne({_id:subgenereid})
        const FindingLanguage = await language.findOne({name:languagename})
        const castFinding = await cast.findOne({_id:castid})

        // const directorFinding = await  CreateShow.findOne({directorname})
        // const producerFinding  = await  CreateShow.findOne({producername})
        // const writerFinding  = await  CreateShow.findOne({writersname})

        const haahsFinding = await hashtags.findOne({hashid})

        if(FindingTitle){
            return res.status(400).json({
                message:"This title is already been present pleasea take antoher one",
                success:false
            })
        }

        if(FindingTagline){
            return res.status(400).json({
                message:"This tagline is already presnnt please take antoher one",
                success:false
            })
        }

        if(!findingGenreid){
            return res.status(400).json({
                message:"This genre id is not present please re check",
                success:false
            })
        }

        if(!findingsubGenreid){
            return res.status(400).json({
                message:"This sub genre id is not present please re chek it again",
                success:false
            })
        }

        if(!FindingLanguage){
            return res.status(400).json({
                message:"This language is not present please check it again",
                success:false
            })
        }

        if(!castFinding){
            return res.status(400).json({
                message:"This cast is not present please check the name",
                success:false
            })
        }   
        if(haahsFinding){
            return res.status(400).json({
                message:"The hash id is not present please re check it again",
                success:false
            })
        }
        
        const now = new Date()
        const pattern = date.compile('ddd, DD/MM/YYYY HH:mm:ss');
        let ps = date.format(now, pattern);
        const releasingDate =   date.parse(releasedate,'DD/MM/YYYY')


        if(!releasingDate || isNaN(releasingDate.getTime())){
            return res.status(400).json({ message: "The release date is not valid. Use DD/MM/YYYY format.", success: false });
        }

        const formattedReleaseDate = date.format(releasingDate, 'ddd, DD MMM YYYY');
        if( now > releasingDate){
            return res.status(400).json({
                message:'The release date should be in future not in the past',
                date:`Date today ${ps} \n Date you are trying to release on ${releasingDate}`,
                success:false
            })
        }


        if(formattedReleaseDate === ps){
            return res.status(400).json({
                message: 'The show cannot be uploaded on the same day it is created. Choose a future date.',
                success: false,
                date: `Today: ${ps}, You entered: ${formattedReleaseDate}`
            });
        }

        const diff = releasingDate.getTime() - now.getTime()
        const uploadingAfter = 2 * 24 * 60 * 60 * 1000


        let uploadingAfterDays = now.getTime() + uploadingAfter
        if( diff < uploadingAfter){
            return res.status(400).json({
                message:'The release date should be atleast after two days of creating the show',
                date:`Date today ${ps} \n Date you can release ${date.format(new Date(uploadingAfterDays),'ddd, DD MMM YYYY')}`,
                success:false
            })
        }

        if (!process.env.CLOUDINARY_FOLDER_NAME) {
            return res.status(500).json({
                message: "Cloudinary folder name is not defined in the environment variables",
                success: false
            });
        }

        var postersending 
        var trailerSending

        try {
            postersending = await uploadDatatoCloudinary(image,process.env.CLOUDINARY_FOLDER_NAME,1000,1000)
            trailerSending = await uploadDatatoCloudinary(trailer,process.env.CLOUDINARY_FOLDER_NAME)
        } catch (uploadError) {
            console.log("THis is the cloudinary uploding error",uploadError)
            return res.status(500).json({
                message: "Error uploading files to Cloudinary",
                success: false
            });
        }


        let conversion =  convertSecondsToDuration(trailerSending.duration)
        // console.log("This is the whole conversion",conversion)
        const Creation = await CreateShow.create({
            title:title,
            tagline:tagline,
            Posterurl:postersending.secure_url,
            trailerurl:trailerSending.secure_url,
            showType:showType,
            createdAt:ps,
            uploaded:false,
            VerifiedByTheAdmin:false,
            directorname:directorname,
            producername:producername,
            writersname:writersname,
            totalbudget:totalbudget,
            releasedate:formattedReleaseDate,
            genre:genreid,
            language:FindingLanguage._id,
            TotalDuration:conversion,
            hashtags:hashid
        })

        // const updatinGGenreid = await 
        // console.log("This is the created show",Creation)
        return res.status(200).json({
            message:"The show is been created",
            success:true,
            data:Creation
        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the create show code",
            success:false
        })
    }
}


exports.UpdateShowtitle = async(req,res)=>{
    try {
        const id = req.params.id
        const {newTitle} = req.body
        let updating = id.toString()
        const Finding = await CreateShow.findOne({_id:updating})
        if(!Finding){
            return res.status(400).json({
                message:"This show is not presentplease rechek the id",
                success:false
            })
        }

        if(newTitle === Finding.title){
            return res.status(400).json({
                message:"The old and the new title both are the same",
                success:false
            })
        }
        if(Finding.VerifiedByTheAdmin === false && Finding.uploaded === false){
            const Updating = await CreateShow.findByIdAndUpdate(id,{title:newTitle},{new:true})
            return res.status(200).json({
                message:"The title is been updated",
                success:true,
                data:Updating
            })
        }
        return res.status(400).json({
            message:"The show is already been verified and cannot update it's title",
            success:false
        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the update show title code",
            success:false
        })
    }
}


exports.UpdateShowtagline = async(req,res)=>{
    try {
        const id = req.params.id
        const {newTagline} = req.body
        let updating = id.toString()
        const Finding = await CreateShow.findOne({_id:updating})
        if(!Finding){
            return res.status(400).json({
                message:"This show is not present please rechek the id",
                success:false
            })
        }

        if(newTitle === Finding.title){
            return res.status(400).json({
                message:"The old and the new tagline both are the same",
                success:false
            })
        }
        if(Finding.VerifiedByTheAdmin === false && Finding.uploaded === false){
            const Updating = await CreateShow.findByIdAndUpdate(id,{title:newTagline},{new:true})
            return res.status(200).json({
                message:"The title is been updated",
                success:true,
                data:Updating
            })
        }
        return res.status(400).json({
            message:"The show is already been verified and cannot update it's tagline",
            success:false
        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the update show title code",
            success:false
        })
    }
}


// we will Think about it later 
// exports.UpdateGenreAndSubGenre = async(req,res)=>{
//     try {
//         const id = req.params.id
//         const {newGenreId,newSubGenreId} = req.body
//         let updating = id.toString()
//         const Finding = await CreateShow.findOne({_id:updating})
//         if(!Finding){
//             return res.status(400).json({
//                 message:"This show is not present please rechek the id",
//                 success:false
//             })
//         }

//         const GenreFinding = await genre.findOne({_id:newGenreId})
//         const SubGenreFinding = await subgenre.findOne({_id:newSubGenreId})

//         if(newGenreId === Finding.genre.toString()){
//             return res.status(400).json({
//                 message:"The old and the new genre both are the same ",
//                 success:false
//             })
//         }
//         if(Finding.VerifiedByTheAdmin === false && Finding.uploaded === false){
//             const Updating = await CreateShow.findByIdAndUpdate(id,{title:newTagline},{new:true})
//             return res.status(200).json({
//                 message:"The title is been updated",
//                 success:true,
//                 data:Updating
//             })
//         }
//         return res.status(400).json({
//             message:"The show is already been verified and cannot update it's tagline",
//             success:false
//         })
//     } catch (error) {
//         console.log(error)
//         console.log(error.message)
//         return res.status(500).json({
//             message:"There is an error in the update show title code",
//             success:false
//         })
//     }
// }


exports.UpdateTitleImage = async(req,res)=>{
    try {
        const newImage = req.files.newImage
        const id = req.params.id

        if(!req.files || req.files.newImage || !req.files){
            return res.status(400).json({
                message:"The input fields are required",
                success:false
            })
        }

        let updating = id.toString()
        const Finding = await CreateShow.findOne({_id:updating})
        if(!Finding){
            return res.status(400).json({
                message:"This show is not present please rechek the id",
                success:false
            })
        }


        if(Finding.VerifiedByTheAdmin === false && Finding.uploaded === false){
            let imageUpdating
            try {
                imageUpdating = await uploadDatatoCloudinary(newImage,process.env.CLOUDINARY_FOLDER_NAME,1000,1000)
                const updating = await CreateShow.findByIdAndUpdate(id,{Posterurl:imageUpdating.secure_url},{new:true})
                return res.json({
                    message:"The new image is been uploaded",
                    success:true
                })            
            } catch (uploadError) {
                    console.log("THis is the cloudinary uploding error",uploadError)
                    return res.status(500).json({
                        message: "Error uploading files to Cloudinary",
                        success: false
                    });
            }
        }

        return res.status(400).json({
            message:"The show is already been verified and cannot update it's poster",
            success:false
        })

    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the update show title code",
            success:false
        })
    }
}

exports.UpdateTitletrailer = async(req,res)=>{
    try {
        const newTrailer = req.files.newTrailer
        const id = req.params.id

        if(!req.files || req.files.newTrailer || !req.files){
            return res.status(400).json({
                message:"The input fields are required",
                success:false
            })
        }

        let updating = id.toString()
        const Finding = await CreateShow.findOne({_id:updating})
        if(!Finding){
            return res.status(400).json({
                message:"This show is not present please rechek the id",
                success:false
            })
        }


        if(Finding.VerifiedByTheAdmin === false && Finding.uploaded === false){
            let imageUpdating
            try {
                imageUpdating = await uploadDatatoCloudinary(newImage,process.env.CLOUDINARY_FOLDER_NAME)
                let conversion =  convertSecondsToDuration(imageUpdating.duration)
                const updating = await CreateShow.findByIdAndUpdate(id,{trailerurl:imageUpdating.secure_url,TotalDuration:conversion},{new:true})
                return res.json({
                    message:"The new trailer is been uploaded",
                    success:true
                })            
            } catch (uploadError) {
                    console.log("THis is the cloudinary uploding error",uploadError)
                    return res.status(500).json({
                        message: "Error uploading files to Cloudinary",
                        success: false
                    });
            }
        }

        return res.status(400).json({
            message:"The show is already been verified and cannot update it's poster",
            success:false
        })

    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the update show title code",
            success:false
        })
    }
}

exports.SendCustomMessage = async(req,res)=>{
    try {
        const id = req.params.id
        const messages = req.body
        const Finding = await USER.findOne({_id:id})
        if(!Finding){
            return res.status(400).json({
                message:"This user is not present please recheck your id",
                success:false
            })
        }

        const updatin = await message.create({
            to:id,
            message:messages
        })
        await CreateShow.updateOne({customeMessage:updatin.id})
        return res.status(200).json({
            message:"The message is been send",
            success:false
        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the update show title code",
            success:false
        })
    }
}


exports.PosterLike = async(req,res)=>{
    try{

        const id = req.query.id
        const userId = req.USER.id
        // console.log("This is the user id",userId)
        if(!id){
            return res.status(400).json({
                message:"The input is been required",
                success:false
            })
        }
        
        const Finding = await CreateShow.findById(id)
        if(!Finding){
            return res.status(400).json({
                message:"The show is not been found please check the inputs",
                success:false
            })
        }
        const revise = await USER.findOne({UserBannerliked:id})
        if(revise){
            return res.status(400).json({
                message:"you have already liked this show",
                success:false
            })
        }

        let liking ;

        if(Finding.BannerLiked < 0){
            liking = await CreateShow.findByIdAndUpdate(id,{BannerLiked:0},{new:true})
        }

        if(Finding.BannerDisLiked < 0){
            liking = await CreateShow.findByIdAndUpdate(id,{BannerDisLiked:0},{new:true})
        }

        liking = await CreateShow.findByIdAndUpdate(id,{$inc:{BannerLiked:1}},{new:true})
        await USER.updateOne({$push:{UserBannerliked:id}})

        const FindingFromuserDislike = await USER.findByIdAndUpdate(userId,{$pull:{UserBannerhated:id}},{new:true})
        await CreateShow.findByIdAndUpdate(id,{$inc:{BannerDisLiked:-1}},{new:true})
        console.log(FindingFromuserDislike)
        return res.status(200).json({
            message:"you have liked the banner",
            success:true
        })
    }catch(error){
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the update show title code",
            success:false
        })
    }
}


exports.BannerDisliked = async(req,res)=>{
    try{
        const id = req.query.id
        const userId = req.USER.id
        if(!id){
            return res.status(404).json({
                message:"The input fields are been required",
                success:false
            })
        }

        const Finding = await CreateShow.findOne({_id:id})
        if(!Finding){
            return res.status(404).json({
                message:"The show with this id is not present please re-check your inputs",
                success:false
            })
        }

        const revise = await USER.findOne({UserBannerhated:id})
        if(revise){
            return res.status(400).json({
                message:"you have already hated this show",
                success:false
            })
        }

        let liking ;

        if(Finding.BannerLiked < 0){
            liking = await CreateShow.findByIdAndUpdate(id,{BannerLiked:0},{new:true})
        }

        if(Finding.BannerDisLiked < 0){
            liking = await CreateShow.findByIdAndUpdate(id,{BannerDisLiked:0},{new:true})
        }


        liking = await CreateShow.findByIdAndUpdate(id,{$inc:{BannerDisLiked:1}},{new:true})
        await USER.updateOne({$push:{UserBannerhated:id}})

        const FindingFromuserDislike = await USER.findByIdAndUpdate(userId,{$pull:{UserBannerliked:id}},{new:true})
        await CreateShow.findByIdAndUpdate(id,{$inc:{BannerLiked:-1}},{new:true})
        console.log(FindingFromuserDislike)

        return res.status(200).json({
            message:"you have disliked this show",
            success:true
        })
    }catch(error){
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the banner disliked code",
            success:false
        })
    }
}



exports.AllotedToTheatres = async(req,res)=>{
    try {
        const showid =  req.query.showid.toString()
        const Theatreid = req.query.Theatreid.toString()

        if(!showid || !Theatreid){
            return res.status(404).json({
                message:"The input id is been required",
                success:false
            })
        }

        const Finding = await CreateShow.findById(showid)
        const TheatreFinding = await Theatres.findById(Theatreid)

        const TheatreShowChecking = await Theatres.findOne({TheatreallloteToshows:showid})
        if(TheatreShowChecking){
            return res.status(400).json({
                message:"you have already alloted this theatre to this show",
                success:false
            })
        }

        const showTheatreChecking = await CreateShow.findOne({AllotedToTheNumberOfTheatres:Theatreid})
        if(showTheatreChecking){
            return res.status(400).json({
                message:"you have already alloted the show to this theatre please recheck you inputs",
                success:false
            })
        }

        if(!Finding){
            return res.status(400).json({
                message:"The show is not been Found please re-check the input",
                success:false
            })
        }
        if(!TheatreFinding){
            return res.status(400).json({
                message:"The Theatre is not been Found please re-check the input",
                success:false
            })
        }

        if(Finding.uploaded === true && Finding.VerifiedByTheAdmin === true){
            return res.status(500).json({
                message:"you cannot allot the theatre after the show is verified by the admin",
                success:false
            })
        }

        const updating  = await CreateShow.findByIdAndUpdate(showid,{$push:{AllotedToTheNumberOfTheatres:TheatreFinding._id}},{new:true})
        await Theatres.updateOne({$push:{TheatreallloteToshows:Finding._id}})
        return res.status(200).json({
            message:'The theatre is been selected for the show',
            success:true,
            data:updating
        })
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the Alloted to the theatre code",
            success:false
        })
    }
}


exports.uploadtheshow = async(req,res)=>{
    try {
        const id = req.query.id

        if(!id){
            return res.status(404).json({
                message:"The id is not been found",
                success:false
            })
        }

        const Finding = await CreateShow.findById(id)

        if(!Finding){
            return res.status(400).json({
                message:"The show is not been found please check inputs",
                success:false
            })
        }

        if(Finding.VerifiedByTheAdmin === false){
            return res.status(400).json({
                message:"you canot upload the show untill it is verified by the admin",
                success:false
            })
        }

        if(Finding.VerifiedByTheAdmin === true){
            const updating = await CreateShow.findByIdAndUpdate(id,{uploaded:true},{new:true})
            console.log("This is the updatedd result",updating)
            return res.status(200).json({
                message:"you show is been uploaded",
                success:true
            })
        }
        

    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the upload the show  code",
            success:false
        })
    }
}