const model = require("../models/summoningModel.js");

//////////////////////////////////////////////////////////
////////             GET /summoning               ////////
//////////////////////////////////////////////////////////

module.exports.getAllServantsInfo = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
        } 
        else res.status(200).json({
            cost_to_summon:`3 saint quartz`,
            servants_for_summon:`${results}`
        });
    }
    model.selectAllServantInfo(callback);
}

//////////////////////////////////////////////////////////
////////        GET /summoning/:servant_id        ////////
//////////////////////////////////////////////////////////
module.exports.getServantsInfoById = (req, res, next) =>
{   
    const data = {
        servant_id: req.params.servant_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
        } else if (results.length == 0) {
            res.status(404).json({
                message:`servant does not exist`
            });
        } else {
            res.status(200).json(results);
        }
    }
    model.selectServantsByID(data, callback);
}

//////////////////////////////////////////////////////////
////////         PUT /summoning/:user_id          ////////
//////////////////////////////////////////////////////////
module.exports.checkIfEnoughSaintQuartz = (req, res, next) =>
{
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).json({message:`internal server error.`});
        } else if (results.length == 0) {
            res.status(404).json({
                message:`user_id does not exist`
            });
        } else if (results[0].saint_quartz < 3) {
            res.status(400).json({
                message:`Not enough saint quartz`
            });
        } else {
            res.locals.username = results[0].username
            res.locals.user_id = data.user_id
            next();
        }
    }
    model.selectUserByID(data, callback);
}

module.exports.updatingUserInventory = (req, res, next) =>
{
    const data = { 
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).json({message:`internal server error.`});
        } else {
            next();
        }
    }
    model.consumeSaintQuartz(data,callback);
}

module.exports.summon = (req, res, next) =>
{   
    function gacha(results) {
        const randomServantId = Math.floor(Math.random() * results.length);
        const servantSummoned = results[randomServantId];
        return servantSummoned;
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
        } else {
            const summon = gacha(results)
            res.locals.summonResults = summon;
            console.log(summon);
            next();
        }
    }
    model.simulateGacha(callback);
}

module.exports.checkIfServantIsOwned = (req, res, next) =>
{
    const {summonResults, username, user_id} = res.locals

    const data = {
        username: username,
        user_id: user_id,
        summonResults: summonResults,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: `internal server error.` });
        } else {
            let newMessage
            
            if (results.length < 1) {
                newMessage = {
                    message: `New servant summoned!`,
                    img_id:`${summonResults.img_id}`,
                    name: `${summonResults.servant_name}`,
                    class: `${summonResults.class}`,
                    atk: `${summonResults.atk}`,
                    hp: `${summonResults.hp}`
                }
            } else if (results.length > 0) {
                newMessage = {
                    message: `The summoned servant is already owned.`,
                    img_id:`${summonResults.img_id}`,
                    name: `${summonResults.servant_name}`,
                    class: `${summonResults.class}`,
                    atk: `${summonResults.atk}`,
                    hp: `${summonResults.hp}`
                }
            }

            res.locals.checkForRefund = results.length
            res.locals.newMessage = newMessage
            next();
        }
    }
    model.checkIfServantIsOwned(data, callback);
}

module.exports.checkForRefund = (req, res, next) =>
{
    const {summonResults, user_id, username, newMessage, checkForRefund} = res.locals

    const data = {
        user_id: user_id,
        username: username,
        summonResults: summonResults,
        servant_id: `${summonResults.servant_id}`,
        img_id:`${summonResults.img_id}`,
        servant_name: `${summonResults.servant_name}`,
        atk:`${summonResults.atk}`,
        hp:`${summonResults.hp}`,
        class:`${summonResults.class}`,
        resultMessage: newMessage
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({ message: `internal server error.` });
        } else {
            if (checkForRefund > 0) {
                res.locals.dupeServantId = results.insertId
                next();
            } else if (checkForRefund < 1) {
                res.status(200).json(data.resultMessage)
            }
        }
    }
    model.updatingUserServants(data, callback);

}

module.exports.refund = (req, res, next) =>
{
    const {newMessage} = res.locals;

    const data = {
        user_id: req.params.user_id,
        resultMessage: newMessage
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).json({message:`internal server error.`});
        } else {
            next();
        }
    }
    model.refund(data, callback);
}

module.exports.deleteDuplicate = (req, res, next) =>
{
    const {newMessage,dupeServantId} = res.locals;

    const data = {
        dupeId: dupeServantId,
        resultMessage: newMessage
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).json({message:`internal server error.`});
        } else {
            res.status(409).json(data.resultMessage);
        }
    }
    model.deleteDupeServant(data, callback);
}