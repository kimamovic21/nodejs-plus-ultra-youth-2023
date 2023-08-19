import fs from 'fs';

export const getUsers = (req, res) => {
    const db = fs.readFileSync('./db.json', 'utf-8');
    const { users } = JSON.parse(db);
    // console.log(users);
    res.send(users || []);
};

export const getUserById = (req, res) => {
    const id = req.params.id;
    const db = fs.readFileSync('./db.json', 'utf-8');
    const { users } = JSON.parse(db);
    // console.log(users);
    const user = users?.find((user) => user.id === id);
    // console.log(user);

    if (user) {
        console.log(user);
        res.send(user);
    }
    else {
        res.status(404).send('User not found');
    };
};

export const createUser = (req, res) => {
    const user  = req.body;
    user.id = uuidv4();

    const db = fs.readFileSync('./db.json', 'utf-8');
    const parsedDb = JSON.parse(db);

    if (parsedDb.users) {
        parsedDb?.users?.push(user);
        console.log(parsedDb);
    }
    else {
        parsedDb.users = [user];
    }

    try {
        fs.writeFileSync('./db.json', JSON.stringify(parsedDb));
        res.status(201).send(user);
    }
    catch (error) {
        res.status(500).send('Something went wrong!');
    };
};

export const updateUser = (req, res) => {
    const user = req.body;
    const id = req.params.id;

    const db = fs.readFileSync('./db.json', 'utf-8');
    const parsedDb = JSON.parse(db);

    const index = parsedDb.users.findIndex((user) => user.id === id);
    // console.log(index);
    parsedDb.users[index] = user;

    try {
        fs.writeFileSync('./db.json', JSON.stringify(parsedDb));
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send('Something went wrong!');
    };
};

export const patchUser = (req, res) => {
    const user = req.body;
    const id = req.params.id;

    const db = fs.readFileSync('./db.json', 'utf-8');
    const parsedDb = JSON.parse(db);

    const index = parsedDb.users.findIndex((user) => user.id === id);
    // console.log(index);

    for (const [key, value] of Object.entries(user)) {
        parsedDb.users[index][key] = value;
    };

    try {
        fs.writeFileSync('./db.json', JSON.stringify(parsedDb, null, '\t'));
        res.status(200).send(parsedDb.users[index]);
    }
    catch (error) {
        res.status(500).send('Something went wrong!');
    };
};

export const deleteUser = (req, res) => {
    const id = req.params.id;

    const db = fs.readFileSync('./db.json', 'utf-8');
    const parsedDb = JSON.parse(db);

    const index = parsedDb.users.findIndex((user) => user.id === id);
    // console.log(index);

    if (index !== -1) {
        try {
            parsedDb.users.splice(index, 1);
            fs.writeFileSync('./db.json', JSON.stringify(parsedDb, null, '\t'));
            res.status(204).send();
        }
        catch (error) {
            res.status(500).send('Something went wrong!');
        };
    }
    else {
        res.status(404).send('User not found');
    };
};