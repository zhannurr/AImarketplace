const jwt = require("jsonwebtoken");

function checkToken (req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied, no token provided" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

function checkAdmin (req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied, no token provided" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

        if (decoded.role != "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = { checkToken, checkAdmin };