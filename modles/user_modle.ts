import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const emailRegaxPattern:RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


export interface IUser extends Document{
    name: string;
    email:string;
    password: string;
    avatar:{
        public_id:string;
        url:string;
    },
    role:string;
    isVerified:boolean;
    courses:string[]; // array of courseId
    comparePassword:(password:string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        validate:{
            validator: function(value:string){
                return emailRegaxPattern.test(value);
            },
            message:"Please enter a valid email..."
        },
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minlength: [6,"Password must be at least 6 characters"],
        select:false,
    },
    avatar:{
        public_id:String,
        url:String,
    },
    role:{
        type:String,
        default:"user",
    },
    isVerified:{
        type:Boolean,
        default: false,
    },
    courses:[
        {
            courseId: String,
        }
    ],
},{timestamps:true});


// hash password before saving
userSchema.pre<IUser>('save',async function(next) {
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
});

// compare password
userSchema.methods.comparePassword = async function(enteredPassword:string):Promise<boolean> {
    return await bcrypt.compare(enteredPassword,this.password);
}

const userModel:Model<IUser> = mongoose.model("User",userSchema);

export default userModel;

