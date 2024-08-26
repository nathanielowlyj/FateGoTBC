const model = require("../models/userModel.js");

module.exports = {
//////////////////////////////////////////////////////////
////////              Post /users                 ////////
//////////////////////////////////////////////////////////
    checkIfEmailExist: (req, res, next) =>
    { 
        const {username, email} = req.body; 

        if (!username || !email) {
            res.status(400).json({"message": `Missing required data.`});
            return;
        }

        const data = {
            username: username,
            email: email
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).json({message:`internal server error.`});
            } else {
                if (results.length > 0 && results[results.length-1].email == data.email) {
                    res.status(409).json({
                        message: `email already exists`
                    })
                } else {
                    next();
                } 
            }
        }
        model.checkIfEmailExists(data, callback);
    },

    createNewUser: (req, res, next) =>
    {
        const {username, email} = req.body; 

        const data = {
            username: username,
            email: email
        }
        
        const callback = (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).json({message:`internal server error.`});
            } else {
                req.createdUserId = results.insertID;
                next();
            }
        }
        model.insertSingle(data, callback);
    },

    getUserId: (req, res, next) =>
    {
        const data = {
            username: req.body.username
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).json({message:`internal server error.`});
            } else {
                req.user_id = results[0].user_id
                next();
            } 
        }
        model.getUserId(data, callback);
    },

    createNewUserServants: (req, res, next) =>
    {
        const data = {
            username: req.body.username,
            user_id: res.locals.user_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).json({message:`internal server error.`});
            } else {
                next();
            }
        }
        model.createNewUserServants(data, callback);
    },

    createNewUserInventory: (req, res, next) =>
    {
        const data = {
            username: req.body.username,
            user_id: res.locals.user_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.log(error);
                res.status(500).json({message:`internal server error.`});
            } else {
                next();
            }
        }
        model.createNewUserInventory(data, callback);
    },
//////////////////////////////////////////////////////////
////////             Get /users                   ////////
//////////////////////////////////////////////////////////

    readAllUsers: (req, res, next) =>
    {
        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).json({message:`internal server error.`});
            } 
            else res.status(200).json(results);
        }
        model.selectAll(callback);
    },

//////////////////////////////////////////////////////////
////////          Get /users/:user_id             ////////
//////////////////////////////////////////////////////////

    getUserById: (req, res, next) =>
    {   
        const data = {
            user_id: req.params.user_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).json({message:`internal server error.`});
            } else {
                if (results.length === 0) {
                    res.status(404).json({message:`User not found`})
                } else {
                    res.status(200).json(results[0])
                } 
            }
        }
        model.getUserById(data, callback);
    },

//////////////////////////////////////////////////////////
////////        Get /userServants/:user_id        ////////
//////////////////////////////////////////////////////////

    getByUserId: (req, res, next) =>
    {
        const data = {
            user_id: req.params.user_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).json({message:`internal server error.`});
            } 
            else res.status(200).json(results);
        }
        model.selectServantsOwned(data, callback);
    },

//////////////////////////////////////////////////////////
////////      Get /completedQuests/:user_id       ////////
//////////////////////////////////////////////////////////

    getCompletedQuestsByUserId: (req, res, next) =>
    {
        const data = {
            user_id: req.params.user_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).json({message:`internal server error.`});
            } else {
                if (results.length == 0) {
                    res.status(404).json({message:`There are no completed tasks yet`})
                } else {
                    res.status(200).json(results);
                }
            }
        }
        model.getCompletedQuests(data, callback);
    },

//////////////////////////////////////////////////////////
////////         Put /users/{user_id}             ////////
//////////////////////////////////////////////////////////

    checkIfEmailOrUsernameExists: (req, res, next) =>
    {
        const {username, email} = req.body; 

        if (!username || !email) {
            res.status(400).json({"message": `Missing required data.`});
            return;
        }

        const data = {
            username: username,
            email: email,
            user_id: req.params.user_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).json({message:`internal server error.`});
            } else {
                if (results.length === 0) {
                    res.status(404).end()
                } else if ((results.length > 0 && results[0].email == data.email) || (results.length > 0 && results[0].username == data.username)) {
                    res.status(409).json({
                        message: `email or username already exists`
                    })
                } else {
                    next();
                }
            }
        }
        model.checkIfEmailOrUsernameExists(data, callback);
    },

    updateUserById: (req, res, next) =>
    {
        const {username,email} = req.body; 

        const data = {
            username: username,
            email: email,
            user_id: req.params.user_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).end();
            } else {
                res.status(200).json({
                    user_id: `${data.user_id}`,
                    username: `${data.username}`,
                    email: `${data.email}`
                });
            }
        }
        model.updateSingle(data, callback);
    },

//////////////////////////////////////////////////////////
////////         DELETE /users/{user_id}          ////////
//////////////////////////////////////////////////////////

    deleteByUserId: (req, res, next) =>
    {
        const data = {
            user_id: req.params.user_id
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).json({message:`internal server error.`});
            } else {
                if (results.affectedRows === 0) {
                    res.status(404).end();
                } else {
                    res.status(204).end();
                }
            }
        }
        model.deleteByUserId(data, callback);
    },

//////////////////////////////////////////////////////
//              CONTROLLER FOR LOGIN                //
//////////////////////////////////////////////////////

    login: (req, res, next) => {
        const {username, password} = req.body 

        const data = {
            username:username,
        }

        if (!username || !password) {
            res.status(400).json({
                message:`Missing required data.`
            }) 
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).json(error);
                console.log(error);
            } else {
                if (results.length < 1) {
                    res.status(404).json({
                        message:`User not found`
                    })
                } else {
                    res.locals.user_id = results[0].user_id;
                    res.locals.hash = results[0].password;
                    next();
                }
            }
        }
        model.getLoginData(data,callback)
    },

//////////////////////////////////////////////////////
//             CONTROLLER FOR REGISTER              //
//////////////////////////////////////////////////////

    register: (req, res, next) =>
    {
        const {username, email, password} = req.body 

        const data = {
            username:username,
            email:email,
            password: res.locals.hash
        }

        const message = `User ${username} created successfully.`

        if (!username || !email || !password) {
            res.status(400).json({
                message:`Missing required data.`
            }) 
        }

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.locals.user_id = results.insertId;
                res.locals.message = message;
                next();
            }
        }
        model.insertNewUser(data,callback)
    },

//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS //
//////////////////////////////////////////////////////

    checkUsernameOrEmailExist: (req, res, next) => {
        const data = {
            email: req.body.email,
            username: req.body.username
        };

        const callback = (error, results, fields) => {
            if (error) {
                res.status(500).json(error);
            } else {
                if (results && results.length > 0) {
                    res.status(409).json({
                        message: "Username or email already exists"
                    });
                } else {
                    next();
                }
            }
        };

        model.checkUsernameAndEmail(data, callback);
    }
}