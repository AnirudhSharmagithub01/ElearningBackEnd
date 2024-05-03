import { Request , Response, NextFunction } from "express";
import userModel,{IUser} from "../modles/user_modle";
import ErrorHandler from "../config/ErrorHandler";
import { catchAsyncError } from "../middlewares/catchAsyncError";

// register user
interface IRegistrationBody{
    name:string,
    email:string,
    password:string,
    avatar?:string,
}

export const userRegistration = catchAsyncError(async(req:Request,res:Response,next:NextFunction) =>{
    try {
        
    } catch (error:any) {
        return next(new ErrorHandler(error.message,400));
    }
})