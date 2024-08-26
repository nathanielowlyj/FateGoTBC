const pool = require('../services/db');

//////////////////////////////////////////////////////////
////////             GET /summoning               ////////
//////////////////////////////////////////////////////////

module.exports.selectAllServantInfo = (callback) =>
{
    const SQLSTATEMENT = `
    SELECT * FROM ca2.servants;
    `;

    pool.query(SQLSTATEMENT, callback);
}

//////////////////////////////////////////////////////////
////////        GET /summoning/:servant_id        ////////
//////////////////////////////////////////////////////////
module.exports.selectServantsByID = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT * FROM ca2.servants WHERE servant_id = ?;
    `;

    const VALUES = [data.servant_id]
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////////
////////         PUT /summoning/:user_id          ////////
//////////////////////////////////////////////////////////
module.exports.selectUserByID = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT * FROM ca2.UserInventory WHERE user_id = ?;
    `;

    const VALUES = [data.user_id]
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.simulateGacha = (callback) => {

    const SQLSTATEMENT = `
        SELECT * FROM ca2.servants
    `;

    pool.query(SQLSTATEMENT, callback);
};

module.exports.consumeSaintQuartz = (data,callback) =>
{
    const SQLSTATEMENT = `
    UPDATE ca2.UserInventory
    SET saint_quartz = saint_quartz - 3
    WHERE user_id = ?;
    `;

    const VALUES = [data.user_id]
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updatingUserServants = (data, callback) =>
{
    const SQLSTATEMENT = `
    INSERT INTO ca2.UserServants (user_id, username, servant_id, img_id, servant_name, atk, hp, class)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const VALUES = [data.user_id,data.username,data.servant_id,data.img_id,data.servant_name,data.atk,data.hp, data.class]
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.checkIfServantIsOwned = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM ca2.UserServants
    WHERE username = ? AND servant_name = ?;
    `;

    const VALUES = [data.username, data.summonResults.servant_name];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.refund = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE ca2.UserInventory
    SET saint_quartz = saint_quartz + 3
    WHERE user_id = ?;
    `;

    const VALUES = [data.user_id]
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteDupeServant = (data, callback) =>
{
    const SQLSTATEMENT = ` 
    DELETE FROM Ca2.userServants
    WHERE user_servant_id = ?;
    `;

    const VALUES = [data.dupeId]
    pool.query(SQLSTATEMENT, VALUES, callback);
}