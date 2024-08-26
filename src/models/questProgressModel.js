// Nathaniel Low P2323428 DIT/FT/1B/05

const pool = require('../services/db');

//////////////////////////////////////////////////////////
////////    Post /questProgress/{progress_id}     ////////
//////////////////////////////////////////////////////////

module.exports.checkIfUserIdExists = (data, callback) => 
{
    const SQLSTATEMENT = `
    SELECT * FROM ca2.userInventory
    WHERE user_id = ?
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.checkIfQuestIdExists = (data, callback) => 
{
    const SQLSTATEMENT = `
    SELECT * FROM ca2.quest
    WHERE quest_id = ?
    `;
    const VALUES = [data.quest_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.markQuestComplete = (data, callback) => 
{
    const SQLSTATEMENT = `
    INSERT INTO ca2.questProgress (user_id, quest_id, completion_date, requirements)
    VALUES (?, ?, ?, ?);
    `;

    const VALUES = [data.user_id, data.quest_id, data.completion_date, data.requirements];
    pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.reward = (data,callback) => 
{
    const SQLSTATEMENT = `
    UPDATE ca2.UserInventory
    SET saint_quartz = saint_quartz + ${data.reward}
    WHERE user_id = ?;
    `;

    const VALUES = [data.user_id, data.reward];
    pool.query(SQLSTATEMENT, VALUES, callback)
}

//////////////////////////////////////////////////////////
////////     Get /questProgress/{progress_id}     ////////
//////////////////////////////////////////////////////////

module.exports.getQuestProgressById = (data, callback) => 
{
    const SQLSTATEMENT = `
    SELECT *
    FROM ca2.questprogress
    WHERE progress_id = ?;
    `;
    const VALUES = [data.progress_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}


module.exports.getCompletedQuestsByUserId = (data, callback) => 
{
    const SQLSTATEMENT = `
    SELECT *
    FROM ca2.questprogress
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}
//////////////////////////////////////////////////////////
////////     Put /questProgress/{progress_id}     ////////
//////////////////////////////////////////////////////////

module.exports.updateQuestRequirements = (data, callback) => 
{
    const SQLSTATEMENT = `
    SELECT *
    FROM Ca2.questprogress
    WHERE progress_id = ?;
    `;
    const VALUES = [data.progress_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////////
////////    Delete /questProgress/{progress_id}   ////////
//////////////////////////////////////////////////////////

module.exports.deleteQuestProgressById = (data, callback) => 
{
    const SQLSTATEMENT = `
    DELETE FROM Ca2.questprogress 
    WHERE progress_id = ?;
    `;
    const VALUES = [data.progress_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}