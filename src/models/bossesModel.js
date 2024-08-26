const pool = require('../services/db');

//////////////////////////////////////////////////////////
////////               GET /bosses                ////////
//////////////////////////////////////////////////////////

module.exports.selectAll = (callback) =>
{
    const SQLSTATEMENT = `
    SELECT * FROM ca2.bosses;
    `;

    pool.query(SQLSTATEMENT, callback);
}

//////////////////////////////////////////////////////////
////////           GET /bosses/:boss_id           ////////
//////////////////////////////////////////////////////////

module.exports.selectByID = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT * FROM ca2.bosses WHERE boss_id = ?;
    `;

    const VALUES = [data.boss_id]
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////////
//   PUT /:boss_id/user/:user_id/servant/:servant_id    //
//////////////////////////////////////////////////////////

module.exports.selectServantByID = (data, callback) =>
{
    const SQLSTATEMENT = `
    SELECT * FROM ca2.servants WHERE servant_id = ?;
    `;

    const VALUES = [data.servant_id]
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.getClasses = (callback) =>
{
    const SQLSTATEMENT = `
    SELECT class FROM ca2.bosses;
    `;

    pool.query(SQLSTATEMENT, callback);
}


module.exports.bossDrop = (callback,data) => {
    const bossDropColumnName = data.drop_name;

    const SQLSTATEMENT = `
        UPDATE userInventory
        SET ${bossDropColumnName} = ${bossDropColumnName} + 1
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};


