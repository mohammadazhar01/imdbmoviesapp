import jwt from 'jsonwebtoken'

const authUser = (req,res,next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.json({success: false ,message: "Not authenticated"})
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch(err) {
        res.json({message: "invalid token"})
    }
}

export default authUser