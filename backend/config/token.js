import jwt from 'jsonwebtoken'


const generateToken = (id,role) => {
    try {
        const token = jwt.sign({id,role}, process.env.JWT_SECRET, {expiresIn: "1d"})
        return token
    } catch(err) {
        console.log("token generation error",err.message)
    
    }
}

export default generateToken