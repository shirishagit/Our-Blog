import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "No token, authorization denied", success: false });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
        return res.status(401).json({ message: "Token missing", success: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid", success: false });
    }
};

export default auth;
