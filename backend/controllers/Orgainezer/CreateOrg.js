const bcrypt = require('bcrypt')
const USER = require('../../models/user')
const date = require('date-and-time')
const jwt = require('jsonwebtoken')
const cookieParser  = require('cookie-parser')
const OTP = require('../../models/otp')
const ORGData = require('../../models/Org_data')
const {uploadDatatoCloudinary}= require('../../utils/imageUploader')
const qs = require('qs')


// This is the function that is going to create the route in the orgainezer in the line no 10   
exports.CreateOrgainezer = async(req,res)=>{
    try {
        const {name,password,email,usertype="Organizer",number,countrycode,otp} = req.body
    
        if(!name || !password || !email || !number || !countrycode || !otp){
            return res.status(400).json({
                message:"The input fields are been required",
                success:false
            })
        }

        const Finding = await USER.findOne({userName:name})
        if(Finding){
            return res.status(400).json({
                message:"The username is already beeen taken please take another one",
                success:false,
                extra:`email that is using the usernam ${Finding.email}`
            })
        }
        const EmailFinding = await USER.findOne({email:email})
        if(EmailFinding && EmailFinding !== number){
            return res.status(400).json({
                message:"The email is already beeen taken please take another one",
                success:false
            })
        }


        const numberRecord = await USER.findOne({number}).populate("resetPasswordExpires")
        if(numberRecord && numberRecord.email !== email){
            return res.status(409).json({
                message: "The number is already taken and linked to a different email.",
                success: false,
                data: `number: ${number}, linked email: ${numberRecord.email}`
            });
        }
const otps = await OTP.find({ email:email }).sort({createdAt:-1}).limit(1)
// console.log("This is the otp records",otps)

    if(otps.length === 0 ) {
                return res.status(400).json({
                    message: "No OTP found for this email. Please request a new OTP.",
                    success: false
                }); 
            }
            
            if (otp !== otps[0].otp){
                return res.status(400).json({
                    message: "The OTP is not correct please try again",
                    success: false
                });
            }

// now we will hash the password 
const hasing = await bcrypt.hash(password, 10);
const now = new Date();
const pattern = date.compile('ddd, YYYY/MM/DD HH:mm:ss');
let ps = date.format(now, pattern);

const Creation = new USER({
    userName: name,
    email: email,
    password: hasing,
    confirmpass: hasing,
    number: number,
    countrycode: countrycode,
    usertype: usertype,
    createdAt: ps,
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    verified: false
});


// USER.id = Creation._id
  await Creation.save()

return res.status(200).json({
    message: "The orgainezer is been created",
    success: true,
});
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).json({
            message:"There is an error in the create orgainezer code",
            success:false
        })
    }
}

// This is the function that is going to create the route in the orgainezer in the line no 11
exports.OrgaineserLogin = async(req,res)=>{
    try{
            const {email,password} = req.body
            if(!email || !password){
                return res.status(400).json({
                    message:"The input fields are been required",
                    success:false
                })
            }
    
            const user = await USER.findOne({email:email}) 
                .populate('resetPasswordExpires')
                .populate({path:'showsCreated',model:'Show'})
                .populate({path:'UserBannerliked',model:'Show'})
                .populate({path:'UserBannerhated',model:'Show'})
                .populate({path:'messageReceived',model:'Message'})
                .populate({path:'comment',model:'Comment'})
                .exec()

            if(!user){
                return res.status(404).json({
                    message:"The email is not been found",
                    success:false
                })
            }

            if(user.usertype === 'Viewer'){
                return res.status(400).json({
                    message:"The User is an Viewer Please Use The Viewer Login",
                    success:false
                })
            }
            const compare = await bcrypt.compare(password,user.confirmpass)
    
            if(!compare){
                return res.status(400).json({
                    message:"please enter the right password",
                    success:false
                })
            }

                const {userName,usertype,verified,number,_id ,image} = user
                const now = new Date();
                const pattern = date.compile('DD/MM/YYYY HH:mm:ss');
                let lastLoginTime = date.format(now, pattern);
                // console.log("This is the id",_id)
                await USER.findByIdAndUpdate(_id,{$push:{lastlogin:lastLoginTime}},{new:true})


                // console.log("This is the login code",login)
                const jwtCreation = jwt.sign({usertype,verified,id:_id},process.env.JWT_PRIVATE_KEY,{ expiresIn: '24h', algorithm: 'HS256' })
                const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                      httpOnly:true,
            secure: false, 
            sameSite: 'Lax'
                }

                     user.token = jwtCreation;
                    user.password = undefined;  
                    user.id = _id.toString()

                    // console.log("This is the user",user)
                    // console.log(_id)

                res.cookie('token',jwtCreation,options).status(200).json({
                    message:"The user is been loged in",
                    success:true,
                    token:jwtCreation,
                    user
                })
        }catch(error){
            console.log(error)
            console.log(error.message)
            return res.status(500).json({
                message:"error in the login code",
                success:false
            })
            
        }
}

function WordCounts(text){
    const MaxWords = 250 
      if (typeof text !== 'string' || text.trim() === '') return null 
    const TextSpliting = text.trim().split(/\s+/).filter(Boolean).length

    if(TextSpliting > MaxWords){
      return `Text exceeds maximum allowed ${MaxWords} words (${TextSpliting})`
    }

    return null
}

const normalizeBoolean = (val) => {
  if (val === "true" || val === true) return true;
  if (val === "false" || val === false) return false;
  return null; // invalid
};

// Make sure express-fileupload or multer middleware is set up in your Express app
// Example: app.use(require('express-fileupload')());

exports.OrgData = async (req, res) => {
  try {
    const parsedBody = req.body;

    const {
      First, Last, Email, Countrycode, number, countryname, statename, cityname,
      Sameforlocalandpermanent, local, permanent, gender, website, totalProjects,
      Experience, shortbio, notableProjects, SocialMedia, ongoingProject,
      projectspllanned, Project = [], Genre, subGenre, Screen, Target, Distribution,
      Dist = [], Promotions, Assistance, support, mainreason, certifications, cert = [],
      ExperienceCollabrating, collabrotion, role, experience
    } = parsedBody;



const NotableKeys = Object.keys(req.body).filter(key => key.startsWith("notable["))
let notable = []
    if(notableProjects && notableProjects.toString().trim().toLowerCase() === "true"){
      const notablename = new Map()
      const Name = new Set()
      const Url = new Set()
      const DuplicateNames =[]
      const DuplicateUrls = []
// console.log("This is the notable keys",NotableKeys)
      NotableKeys.forEach(key =>{
         const match = key.match(/notable\[(\d+)\]\[(.+)\]/);
    if (match) {
      const index = match[1];
      const field = match[2];
      if (!notablename.has(index)) notablename.set(index, {});
      notablename.get(index)[field] = req.body[key];
    }
      })

      notable = Array.from(notablename.values())

      // console.log("This is the notable",notable)

      for (const project of notable) {
        const { name, url,Role } = project;

          if (!name || !Role || !url) {
      return res.status(400).json({
        success: false,
        message: "Required fields (name, Role, or url) are missing in notable projects.",
        data: project
      });
    }

          if (Name.has(name)) DuplicateNames.push(name); else Name.add(name);
          if (Url.has(url)) DuplicateUrls.push(url); else Url.add(url);
        }

        if (DuplicateNames.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Duplicate entries found in notable projects",
            names: DuplicateNames,
          });
        }
        if (DuplicateUrls.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Duplicate URLs found in notable projects",
            urls: DuplicateUrls
          });
        }
    }else{
      notable = []
    }

    // Parse social[] from form-data
const socialKeys = Object.keys(req.body).filter(key => key.startsWith("social["));
let social = [];
// Check if SocialMedia is true (case-insensitive)
if (SocialMedia && SocialMedia.toString().trim().toLowerCase() === "true") {
  const socialMap = new Map();
  const Url = new Set()
  const DuplicateUrls = []


  socialKeys.forEach(key => {
    const match = key.match(/social\[(\d+)\]\[(.+)\]/);
    if (match) {
      const index = match[1];
      const field = match[2];
      if (!socialMap.has(index)) socialMap.set(index, {});
      socialMap.get(index)[field] = req.body[key];
    }
  });

  social = Array.from(socialMap.values());
  // console.log("✅ Parsed Social:", social);

   const MediaMap = {
        LinkedIn: "https://www.linkedin.com/",
        YouTube: "https://www.youtube.com/",
        Instagram: "https://www.instagram.com/",
        IMDB: "https://www.imdb.com/",
        Twitter: "https://x.com/"
      };

    for (const project of social) {
          const {  mediaName,follwers,urls } = project;

              if (!mediaName || !follwers || !urls) {
      return res.status(400).json({
        success: false,
        message: "Required fields (mediaName, followers or urls) are missing in notable projects.",
        data: project
      });
    }

          // console.log("This are the urls",urls)
          // console.log("THis are the projects",project)
          if (Url.has(urls)) DuplicateUrls.push(urls); else Url.add(urls);

        const baseUrl = MediaMap[project.mediaName];
        if (!baseUrl) {
          return res.status(400).json({
            success: false,
            message: `Unsupported mediaName: ${project.mediaName}`
          });
        }

        if (!project.urls.startsWith(baseUrl)) {
          return res.status(400).json({
            success: false,
            message: `Invalid URL for ${project.mediaName}. It should start with '${baseUrl}'`
          });
        }

        }
        
        if (DuplicateUrls.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Duplicate URLs found in notable projects",
            urls: DuplicateUrls
          });
        }

} else {
  social = [];
}
// console.log("Final social array:", social);


    // Parse ongoing[] from form-data
    const ongoingKeys = Object.keys(req.body).filter(key => key.startsWith("ongoing["));
    let ongoing =[]
    if(ongoingProject && ongoingProject.toString().trim().toLowerCase() === "true"){
       const ongoingMap = new Map();
    ongoingKeys.forEach(key => {
      const match = key.match(/ongoing\[(\d+)\]\[(.+)\]/);
      if (match) {
        const index = match[1];
        const field = match[2];
        if (!ongoingMap.has(index)) ongoingMap.set(index, {});
        ongoingMap.get(index)[field] = req.body[key];
      }
    });
    ongoing = Array.from(ongoingMap.values())
    // const script = req.files?.
    // .map((item, index) => ({
    //   ...item,
    //   script: req.files?.[`ongoing[${index}][script]`] || null
    // }));
    // console.log("✅ Parsed Ongoing:", ongoing);
const errors = [];
  for (let index = 0; index < ongoing.length; index++) {
    const project = ongoing[index];

    // Validate fields
    if (!project.name || !project.startdate || !project.enddate || !project.released) {
      errors.push({ index, message: "Missing required fields", data: project });
    }

    // Validate script file
    const script = req.files?.[`ongoing[${index}][script]`];

    const fileType = 'application/pdf'

     if (Array.isArray(script)) {
    return res.status(400).json({
      success: false,
      message: `Only one file is allowed for ongoing[${index}][script]`,
    });
  }

  if(script.mimetype !== fileType){
    return res.status(400).json({
      success: false,
      message:"only send pdf file as input",
    });
  }

    if (!script) {
      errors.push({ index, message: "Missing script file", data: project });
    }
    // console.log(script)
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Some ongoing projects are invalid",
      errors
    });
  }

  console.log("✅ Parsed Ongoing:", ongoing);
    }else{
      ongoing = []
    }

    // Validate required fields
    const RequiredFields = {
      First, Last, Email, Countrycode, number, countryname, statename, cityname,
      Sameforlocalandpermanent, local, permanent, gender, totalProjects, Experience,
      shortbio, notableProjects, SocialMedia, ongoingProject, Genre, subGenre, Screen,
      Target, Distribution, mainreason, certifications, ExperienceCollabrating,
      collabrotion, role, experience
    };
    
    const missingFields = Object.keys(RequiredFields).filter((key) => {
      const value = RequiredFields[key];
      if (value === undefined || value === null) return true;
      if (typeof value === "string" && value.trim() === "") return true;
      return false;
    });
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `These fields are required: ${missingFields.join(", ")}`,
      });
    }

    // Validate textarea word count
    const textareaFields = ['shortbio', 'mainreason'];
    const textareaErrors = textareaFields
      .map(field => {
        if (!Object.prototype.hasOwnProperty.call(req.body, field)) return null;
        const val = req.body[field];
        if (typeof val !== 'string' || val.trim() === '') return null;
        const err = WordCounts(val); // assuming WordCounts function exists
        return err ? `${field}: ${err}` : null;
      })
      .filter(Boolean);
    if (textareaErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'One or more text fields exceed the 250-word limit',
        fields: textareaErrors
      });
    }

    // Notable Projects Duplicate Check
    // if (notableProjects && notableProjects === true) {
    //   if (Array.isArray(notable)) {
    //     const nameSet = new Set();
    //     const urlSet = new Set();
    //     const duplicateNames = [];
    //     const duplicateUrls = [];

    //     for (const project of notable) {
    //       const { name, url } = project;
    //       if (nameSet.has(name)) duplicateNames.push(name); else nameSet.add(name);
    //       if (urlSet.has(url)) duplicateUrls.push(url); else urlSet.add(url);
    //     }

    //     if (duplicateNames.length > 0) {
    //       return res.status(400).json({
    //         success: false,
    //         message: "Duplicate entries found in notable projects",
    //         names: duplicateNames,
    //       });
    //     }
    //     if (duplicateUrls.length > 0) {
    //       return res.status(400).json({
    //         success: false,
    //         message: "Duplicate URLs found in notable projects",
    //         urls: duplicateUrls
    //       });
    //     }
    //   } else {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Notable must be an array of objects"
    //     });
    //   }
    // }

    // // Social Media Validation
    // if (SocialMedia && String(SocialMedia).toLowerCase() === "true") {
    //   const MediaMap = {
    //     LinkedIn: "https://www.linkedin.com/",
    //     YouTube: "https://www.youtube.com/",
    //     Instagram: "https://www.instagram.com/",
    //     IMDB: "https://www.imdb.com/",
    //     Twitter: "https://x.com/"
    //   };

    //   for (const soc of social) {
    //     if (!soc || !soc.mediaName || !soc.urls || !soc.follwers) {
    //       return res.status(400).json({
    //         success: false,
    //         message: "Each social item must include 'mediaName', 'urls', and 'follwers'."
    //       });
    //     }

    //     const baseUrl = MediaMap[soc.mediaName];
    //     if (!baseUrl) {
    //       return res.status(400).json({
    //         success: false,
    //         message: `Unsupported mediaName: ${soc.mediaName}`
    //       });
    //     }

    //     if (!soc.urls.startsWith(baseUrl)) {
    //       return res.status(400).json({
    //         success: false,
    //         message: `Invalid URL for ${soc.mediaName}. It should start with '${baseUrl}'`
    //       });
    //     }
    //   }
    // }

    // Ongoing Projects File Handling
    // if (String(ongoingProject).toLowerCase() === "true") {
    //   ongoing.forEach((project, index) => {
    //     const { name, script } = project;
    //     if (script) {
    //       if (script.mimetype !== "application/pdf") {
    //         return res.status(400).json({
    //           success: false,
    //           message: `Invalid file type for ${name}. Only PDFs allowed.`,
    //         });
    //       }
    //       console.log(`✅ File received for ${name}: ${script.name}`);
    //     } else {
    //       console.log(`⚠️ No file uploaded for ${name}`);
    //     }
    //   });
    // }

    return res.status(200).json({
      success: true,
      message: "All required fields are present and validated!",
    });

  } catch (error) {
    console.log("❌ Error:", error.message);
    return res.status(400).json({
      success: false,
      message: "There is an error in the Organizer Data code",
    });
  }
};
