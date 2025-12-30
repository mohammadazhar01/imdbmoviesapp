
const role = (requiredRole) => {
    return (req, res, next) => {
        if(!req.user || req.user.role !== requiredRole) {
        return res.json({success: false, message: "Access denied"})
    }
     next()
    }
}

export default role