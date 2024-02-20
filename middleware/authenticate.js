const isAuthenticated = (req, res, next) => {
    // Let's check if the 'user' property exits in the 'session' object
    if (req.session.user === undefined) {
        // If the user is not authenticated, return a 401 Unauthorized status
        return res.status(401).json("Unauthorized access. Please login")
    }
    // If the user is authenticated, then proceed to the next middleware or route handler
    next()
}

module.exports = { isAuthenticated };
