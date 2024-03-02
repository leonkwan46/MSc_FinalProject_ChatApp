import jwt from 'jsonwebtoken'

const authHandler = (req, res, next) => {
    try {
        // Check if token exists
        const token = req.headers.authorization.split(" ")[1]
        if (!token) throw new Error("Authentication failed")

        console.log('===============TOKEN=====================')
        console.log(token)
        console.log('====================================')
        // Verify token
        const user = jwt.verify(token, process.env.JWT_SECRET)
        if (!user) throw new Error("Authentication failed")
        console.log('================VERIFIED USER====================')
        console.log(user)
        console.log('====================================')
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}

export default authHandler