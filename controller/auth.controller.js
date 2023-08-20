import fs from 'fs';
import { v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ROLES, SALT_ROUNDS, SECRET_KEY } from '../constants.js';
import User from '../model/user.model.js';

export const registerUser = async (req, res) => {
    const { password, ...user } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const userToSave = new User({ ...user, password: hashedPassword, role: ROLES.USER});
        await userToSave.save();
        res.status(201).send('Success');
    }
    catch (error) {
        res.status(500).send('Could not register user!');
    };

    // const db = fs.readFileSync('./db.json', 'utf-8');
    // const parsedDb = JSON.parse(db);

    // try {
    //     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    //     const userToSave = {
    //         ...user,
    //         password: hashedPassword,
    //         id: uuidv4(),
    //         role: ROLES.USER
    //     };
    //     parsedDb.users.push(userToSave);

    //     fs.writeFileSync('./db.json', JSON.stringify(parsedDb));
    //     res.status(201).send({...user, id: userToSave.id});
    // }
    // catch(error) {
    //     res.status(500).send('Something went wrong!');
    // };
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    const match = await bcrypt.compare(password, user.password);

    try {
        if (match) {
        const token = jwt.sign(
            {data: {id: user.id, role: user.role}}, 
            SECRET_KEY, { expiresIn: 24 * 60 * 60 }
        );
        res.status(200).send(token);
        }
        else {
            res.status(401).send('Login failed');
        };
    } 
    catch (error) {
        res.status(500).send('Something went wrong');
    };

    // const { email, password } = req.body;

    // const db = fs.readFileSync('./db.json', 'utf-8');
    // const parsedDb = JSON.parse(db);
    // const user = parsedDb.users.find((user) => user.email === email);

    // const match = await bcrypt.compare(password, user.password);

    // if (match) {
    //     const token = jwt.sign(
    //         {
    //             data: {
    //                 id: user.id, 
    //                 role: user.role
    //             },
    //         }, 
    //         SECRET_KEY, { 
    //             expiresIn: 24 * 60 * 60
    //         }
    //     );
    //     res.status(200).send(token);
    // }
    // else {
    //     res.status(401).send('Login failed');
    // }
};  

export const validateUser = (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);
        res.status(200).send('Success');
    }
    catch (error) {
        res.status(401).send('Invalid');
    };
};