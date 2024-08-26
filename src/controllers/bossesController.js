const model = require("../models/bossesModel.js");

//////////////////////////////////////////////////////////
////////               GET /bosses                ////////
//////////////////////////////////////////////////////////

module.exports.getAllInfo = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
            console.log(error)
        } 
        else res.status(200).json(results);
    }
    model.selectAll(callback);
}

//////////////////////////////////////////////////////////
////////           GET /bosses/:boss_id           ////////
//////////////////////////////////////////////////////////

module.exports.getInfoById = (req, res, next) =>
{   
    const data = {
        boss_id: req.params.boss_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
        } else if (results.length == 0) {
            res.status(404).json({
                message:`boss not found`
            });
        } else {
            res.status(200).json(results);
        }
    }
    model.selectByID(data, callback);
}

//////////////////////////////////////////////////////////
//   PUT /:boss_id/user/:user_id/servant/:servant_id    //
//////////////////////////////////////////////////////////

module.exports.getBoss = (req, res, next) =>
{   
    const data = {
        boss_id: req.params.boss_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
        } else if (results.length == 0) {
            res.status(404).json({
                message:`boss does not exist`
            });
        } else {
            res.locals.bossInfo = results[0]
            console.log(results[0])
            next();
        }
    }
    model.selectByID(data, callback);
}

module.exports.getUserServant = (req, res, next) =>
{   
    const data = {
        user_id: req.params.user_id,
        servant_id: req.params.servant_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
        } else if (results.length == 0) {
            res.status(404).json({
                message:`servant or user does not exist`
            });
        } else {
            res.locals.servantInfo = results[0]
            console.log(results[0])
            next();
        }
    }
    model.selectServantByID(data, callback);
}

module.exports.checkIfStrongEnough = (req, res, next) => {
    const {servantInfo, bossInfo} = res.locals;
    const servantAtk = servantInfo.atk

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: 'Internal server error.' });
        } else {
            const classAdvantageMap = {
                Saber: ['Lancer', 'Berserker'],
                Archer: ['Saber', 'Berserker'],
                Lancer: ['Archer', 'Berserker'],
                Rider: ['Caster', 'Berserker'],
                Caster: ['Assassin', 'Berserker'],
                Assassin: ['Rider', 'Berserker'],
                Berserker: true,
                Avenger: ['Berserker', 'Ruler'],
                Ruler: ['Berserker', 'Moon_Cancer'],
                Beast: ['Saber', 'Archer', 'Lancer', 'Berserker'],
                Moon_Cancer: ['Avenger', 'Berserker'],
                Alter_Ego: ['Rider', 'Caster', 'Assassin', 'Berserker'],
                Shielder: false
            };
            
            const classDisadvantageMap = {
                Saber: ['Archer', 'Ruler', 'Beast'],
                Archer: ['Lancer', 'Ruler', 'Beast'],
                Lancer: ['Saber', 'Ruler', 'Beast'],
                Rider: ['Assassin', 'Ruler'],
                Caster: ['Rider', 'Ruler'],
                Assassin: ['Caster', 'Ruler'],
                Berserker: false,
                Avenger: 'Moon_Cancer',
                Ruler: 'Avenger',
                Beast: ['Rider', 'Caster', 'Assassin'],
                Moon_Cancer: ['Saber', 'Archer', 'Lancer'],
                Alter_Ego: ['Assassin', 'Caster', 'Rider'],
                Shielder: false
            };

            const servantAdvantage = classAdvantageMap[servantInfo.class];
            const servantDisadvantage = classDisadvantageMap[servantInfo.class];

            let advantageAtk = servantAtk;
        
            if (Array.isArray(servantAdvantage)) {
                // Check if bossInfo.class is in the array of advantages
                if (servantAdvantage.includes(bossInfo.class)) {
                    advantageAtk = servantAtk * 2;
                }
            } else if (servantAdvantage === true) {
                advantageAtk = servantAtk * 2;
            }
        
            if (Array.isArray(servantDisadvantage)) {
                if (servantDisadvantage.includes(bossInfo.class)) {
                    advantageAtk = advantageAtk / 2;
                }
            }

            res.locals.advantageAtk = advantageAtk;
            console.log(advantageAtk);
            next();
        }
    }
    model.getClasses(callback);
};


module.exports.battleResult = (req, res, next) =>
{
    const {advantageAtk,bossInfo} = res.locals

    const callback = (error, results, fields) => {
        if (advantageAtk >= bossInfo.hp) {
            next();
        } else if (advantageAtk < bossInfo.hp) {
            res.status(409).json({
                message:`servant is not strong enough`,
                tip:`use a servant that has a class advantage against the boss`
            })
        }
    }
    model.getClasses(callback);
}

module.exports.bossDrop = (req, res, next) =>
{
    const {bossInfo,servantInfo} = res.locals

    const data = {
        bossInfo:bossInfo,
        user_id:req.params.user_id,
        drop_name:bossInfo.drop_name
    }

    console.log(data);

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: 'Internal server error.' });
        } else {
            res.status(201).json({
                message:`${bossInfo.name} has been defeated by ${servantInfo.servant_name}`,
                drops:`x1 ${data.drop_name}`
            })
        } 
    }
    model.bossDrop(callback,data);
}