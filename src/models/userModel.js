const pool = require('../services/db');

module.exports = {

//////////////////////////////////////////////////////////
////////              Post /users                 ////////
//////////////////////////////////////////////////////////

    checkIfEmailExists: (data, callback) => 
    {
        const SQLSTATEMENT = `
        SELECT *
        FROM ca2.user
        WHERE email = ?;
        `;
        const VALUES = [data.email];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

    insertSingle: (data, callback) =>
    {
        const SQLSTATEMENT = `
        INSERT INTO user (username, email)
        VALUES (?, ?);
        `;
        const VALUES = [data.username, data.email];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

    getUserId: (data, callback) =>
    {
        const SQLSTATEMENT = `
        SELECT user_id FROM user WHERE username = ?
        `;
        const VALUES = [data.username];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

    createNewUserServants: (data, callback) =>
    {
        const SQLSTATEMENT = `
        INSERT INTO userServants (user_id, username, servant_id, img_id, servant_name, atk, hp)
        VALUES (?, ?, 0, 800100 , 'Mash', 9, 14);
        `;
        const VALUES = [data.user_id, data.username];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

    createNewUserInventory: (data, callback) =>
    {
        const SQLSTATEMENT = `
        INSERT INTO userInventory (user_id, username,saber_gem,lancer_gem,archer_gem,caster_gem,rider_gem,assassin_gem,berserker_gem,saint_quartz)
        VALUES (?, ?,0,0,0,0,0,0,0,10);
        `;
        const VALUES = [data.user_id, data.username];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

//////////////////////////////////////////////////////////
////////             Get /users                   ////////
//////////////////////////////////////////////////////////

    selectAll: (callback) =>
    {
        const SQLSTATEMENT = `
        SELECT * FROM ca2.userInventory;
        `;

        pool.query(SQLSTATEMENT, callback);
    },

//////////////////////////////////////////////////////////
////////         Get /users/{user_id}             ////////
//////////////////////////////////////////////////////////

    getUserById: (data, callback) => 
    {
        const SQLSTATEMENT = `
            SELECT * FROM ca2.userInventory
            WHERE user_id = ?
        `;

        const VALUES = [data.user_id];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

//////////////////////////////////////////////////////////
////////        Get /userServants/:user_id        ////////
//////////////////////////////////////////////////////////

    selectServantsOwned: (data, callback) =>
    {
        const SQLSTATEMENT = `
        SELECT * FROM ca2.userServants 
        WHERE user_id = ?
        `;

        const VALUES = [data.user_id];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

//////////////////////////////////////////////////////////
////////      Get /completedQuests/:user_id       ////////
//////////////////////////////////////////////////////////

    getCompletedQuests: (data, callback) =>
    {
        const SQLSTATEMENT = `
        SELECT * FROM ca2.questProgress
        WHERE user_id = ?
        `;

        const VALUES = [data.user_id];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

//////////////////////////////////////////////////////////
////////         Put /users/{user_id}             ////////
//////////////////////////////////////////////////////////

    checkIfEmailOrUsernameExists: (data, callback) =>
    {
        const SQLSTATEMENT = `
        SELECT *
        FROM user
        WHERE user_id = ?;
        `;
        const VALUES = [data.user_id];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

    updateSingle: (data, callback) => 
    {
        const SQLSTATEMENT = `
        UPDATE user 
        SET username = ?, email = ?
        WHERE user_id = ?;
        `;
        const VALUES = [data.username, data.email, data.user_id];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

//////////////////////////////////////////////////////////
////////         DELETE /users/{user_id}          ////////
//////////////////////////////////////////////////////////

    deleteByUserId: (data, callback) => 
    {
        const SQLSTATEMENT = `
        DELETE FROM user 
        WHERE user_id = ?;
        `;
        const VALUES = [data.user_id];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

//////////////////////////////////////////////////////////
////////               Login Model                ////////
//////////////////////////////////////////////////////////

    checkUsernameAndEmail: (data, callback) =>
    {
        const SQLSTATEMENT = `
            SELECT * FROM User
            WHERE username = ? OR email = ?;
        `;
        const VALUES = [data.username,data.email];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

//////////////////////////////////////////////////////////
////////             Register Model               ////////
//////////////////////////////////////////////////////////

    insertNewUser: (data,callback) => 
    {
        const SQLSTATEMENT = `
            INSERT INTO User (username,email,password)
            VALUES (?,?,?);
        `;
        const VALUES = [data.username, data.email, data.password];
        pool.query(SQLSTATEMENT, VALUES, callback);
    },

//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS //
//////////////////////////////////////////////////////

    getLoginData: (data,callback) => 
    {
        const SQLSTATEMENT = `
            SELECT user_id, password FROM ca2.User
            WHERE username = ?
        `;
        const VALUES = [data.username];
        pool.query(SQLSTATEMENT, VALUES, callback);
    }
}


