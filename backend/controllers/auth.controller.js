import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs'
import generateToken from "../config/token.js";

export const login = async(req, res) => {
    try {
      
        const {email, password} = req.body

        const user =await User.findOne({email})

        if(!user) {
            return res.json({success: false, message: "User does not exist"})
        }

        const isMatch = await bcryptjs.compare(password, user.password)
        if(!isMatch) {
            return res.json({success: false, message: "Password does not match"})
        }
    
        const token = generateToken(user._id,user.role)

        res.cookie("token",token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24*60*60*1000
        })
    
        res.status(200).json({success:true, message: "Login successful",user: {id: user._id, email: user.email, role: user.role}})
    } catch(err) {
        console.log(err)
         res.json({success: false, message: "Sever error1"})
    }

}


export const register = async( req, res) => {
    try {
        const {name, email, password, role} = req.body

        if(!name || !email || !password || !role){
            res.json({success: false, message:"All fields are required"})
        }

        const existingUser = await User.findOne({email})

        if(existingUser) {
            return res.json({success: false, message: "User already exist"})
        }

        const hashedPass = await bcryptjs.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPass,
            role
        })

        res.status(201).json({success: true, message: "User registered successfully"})
    } catch(err) {
        console.log(err)
        res.json({success: false, message: "Server error"})
    }

}

export const isAuth = (req, res) => {
    try {
        const user = req.user
        res.json({success: true, user:{id:user.id, role: user.role}})
    } catch(err){
        console.log(err)
    }
}

export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: "strict"
        });
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}