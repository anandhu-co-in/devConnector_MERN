const mongoose=require('mongoose');

//Explore a big about the model syntax

const ProfileSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId, //user is the link to the user of this profile
        ref:'user'
    },
    company:{
        type:String
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    status:{
        type:String,
        required : true
    },
    skills:{
        type:[String], //To strore array of skill strings
        required:true
    },
    bio:{
        type:String
    },
    githubusername:{
        type:String
    },

    experience:[

        {
            title:{
                type:String,
                required:true
            },
            company:{
                type:String,
                required:true
            },
            location:{
                type:String,
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date,
            },
            
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }
        }
  
    ],

    education:[

        {
            school:{
                type:String,
                required:true
            },
            degree:{
                type:String,
                required:true
            },
            fieldofstudy:{
                type:String,
                required:true
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date,
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String,
            }
        }
    ],

    social:{

        youtube:{
            type:String,
        },
        twitter:{
            type:String,
        },
        facebook:{
            type:String,
        },
        linkedin:{
            type:String,
        },
        instagram:{
            type:String,
        }
    },
    
    date:{
        type:Date,
        default:Date.now
    }

});


module.exports=mongoose.model('profile',ProfileSchema)