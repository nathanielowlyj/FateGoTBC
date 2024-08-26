// Nathaniel Low P2323428 DIT/FT/1B/05

const pool = require('../services/db');

//////////////////////////////////////////////////////////
////////             GET /servants                ////////
//////////////////////////////////////////////////////////

module.exports.selectAll = (callback) =>
{
    const SQLSTATEMENT = `
    SELECT * FROM ca2.servants;
    `;

    pool.query(SQLSTATEMENT, callback);
}

//////////////////////////////////////////////////////////
////////        GET /servants/:servant_id         ////////
//////////////////////////////////////////////////////////
module.exports.selectByID = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT * FROM ca2.servants WHERE servant_id = ?;
    `;

    const VALUES = [data.servant_id]
    pool.query(SQLSTATEMENT, VALUES, callback);
}
