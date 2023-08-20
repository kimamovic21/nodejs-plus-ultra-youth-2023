import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants.js";

const authMiddleware = (req, res, next) => {
    const token = req.headers['x-access-token'];

    try {
        const result = jwt.verify(token, SECRET_KEY);
        req.user = result.data;
        next();
    }
    catch(error) {
        console.log(error);
        res.status(403).send('Forbidden');
    };
};

export default authMiddleware;