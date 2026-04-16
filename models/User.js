import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    password:{
        type:String
    },
    profilePicture:{
        type:String
    },
    bio:{
        type:String
    },
    followers:[
        {
            follower:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ],
    following:[
        {
            followed:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ]

},{timestamps:true})

export const User = mongoose.model("User",UserSchema);