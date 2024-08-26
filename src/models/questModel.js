const pool = require('../services/db');

//////////////////////////////////////////////////////////
////////            Post /quest                   ////////
//////////////////////////////////////////////////////////

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATEMENT = `
    INSERT INTO ca2.quest (title, requirements)
    VALUES (?, ?);
    `;
    const VALUES = [data.title, data.requirements];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////////
////////             Get /quests                  ////////
//////////////////////////////////////////////////////////

module.exports.selectAll = (callback) =>
{
    const SQLSTATEMENT = `
    SELECT * FROM ca2.quest;
    `;

    pool.query(SQLSTATEMENT, callback);
}

//////////////////////////////////////////////////////////
////////         Get /quest/{quest_id}            ////////
//////////////////////////////////////////////////////////

module.exports.selectByID = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT * FROM ca2.quest 
    WHERE quest_id = ?;
    `;

    const VALUES = [data.quest_id]
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////////
////////          Put /quest/{quest_id}           ////////
//////////////////////////////////////////////////////////

module.exports.updateByID = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE ca2.quest 
    SET title = ?, requirements = ?
    WHERE quest_id = ?;
    `;
    const VALUES = [data.title, data.description, data.quest_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////////
////////         Delete /tasks/{task_id}          ////////
//////////////////////////////////////////////////////////

module.exports.deleteByID = (data, callback) =>
{
    const SQLSTATEMENT = `
    DELETE FROM ca2.quest
    WHERE quest_id = ?;
    `;
    const VALUES = [data.quest_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}