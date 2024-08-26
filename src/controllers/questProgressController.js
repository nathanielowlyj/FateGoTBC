const model = require("../models/questProgressModel.js");

//////////////////////////////////////////////////////////
////////    Post /questProgress/{progress_id}     ////////
//////////////////////////////////////////////////////////

module.exports.checkIfQuestAlreadyExists = (req, res, next) => 
{
    const data = {
        quest_id:req.body.quest_id,
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
            console.log(error)
        } else {
            if (results.length === 0) {
                res.status(409).json({message:`quest does not exist`});
            } else {
                res.locals.questInfo = results[0]
                next();
            }
        }
    } 
    model.checkIfQuestIdExists(data, callback);
}

module.exports.checkRequirements = (req, res, next) => 
{
    function checkIfUserHasItem(userInventory, requiredItem) {
        if (userInventory.hasOwnProperty(requiredItem)) {
            const availableQuantity = userInventory[requiredItem];
    
            return availableQuantity >= 1;
        } else {
            return false;
        }
    }
    
    const {questInfo} = res.locals

    const data = {
        user_id:req.body.user_id,
    }

    const requiredItem = questInfo.requirements;

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
            console.log(error)
        } if (results.length === 0) {
            res.status(404).json({message:`user_id doesn't exist`});
        } else {
            if (checkIfUserHasItem(results[0], requiredItem) == false) {
                res.status(404).json({message:`requirements not met!`})
            } else {
                next();
            }
        }
    } 
    model.checkIfUserIdExists(data,callback);
}

module.exports.markQuestComplete = (req, res, next) => 
{
    const {user_id,quest_id,requirements} = req.body; 

    const currentDateTime = new Date();

    const data = {
        user_id:user_id,
        quest_id:quest_id,
        completion_date:currentDateTime,
        requirements:requirements
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
            console.log(error)
        } else {
            next();
        }
    } 
    model.markQuestComplete(data, callback);
}

module.exports.rewards = (req, res, next) => 
{
    const {userInventory,questInfo} = res.locals

    const data = {
        user_id:req. body.user_id,
        reward: questInfo.saint_quartz
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
            console.log(error)
        } else {
            res.status(201).json({
                message:`quest complete!`,
                reward:`x${data.reward} saint_quartz`,
            })
        }
    } 
    model.reward(data, callback);
}

//////////////////////////////////////////////////////////
////////     Get /questProgress/{progress_id}     ////////
//////////////////////////////////////////////////////////

module.exports.getQuestProgressById = (req, res, next) => 
{
    const data = {
        progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
        } else {
            if (results.length == 0) {
                res.status(404).end();
            } else {
                res.status(200).json({
                    progress_id: `${req.params.progress_id}`,
                    user_id: `${results[0].user_id}`,
                    quest_id: `${results[0].quest_id}`,
                    completion_date: `${results[0].completion_date}`,
                    requirements: `${results[0].requirements}`
                });
            }
        }
    } 
    model.getQuestProgressById(data, callback);
}

module.exports.getCompletedQuests = (req, res, next) => 
{
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
        } else {
            res.status(200).json(results);
        }
    } 
    model.getCompletedQuestsByUserId(data, callback);
}
//////////////////////////////////////////////////////////
////////     Put /questProgress/{progress_id}     ////////
//////////////////////////////////////////////////////////

module.exports.updateQuestRequirements = (req, res, next) => 
{
    if (!req.body.requirements) {
        res.status(400).json({"message": `Missing required data.`});
        return;
    }

    const data = {
        progress_id:req.params.progress_id,
        requirements:req.body.requirements
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
        } else {
            if (results.length == 0) {
                res.status(404).end();
            } else {
                res.status(201).json({
                    progress_id: `${req.params.progress_id}`,
                    user_id: `${results[0].user_id}`,
                    task_id: `${results[0].task_id}`,
                    completion_date: `${results[0].completion_date}`,
                    notes: `${data.notes}`
                })
            }
        }
    } 
    model.updateQuestRequirements(data, callback);
}

//////////////////////////////////////////////////////////
////////    Delete /questProgress/{progress_id}   ////////
//////////////////////////////////////////////////////////

module.exports.deleteQuestProgressById = (req, res, next) =>
{
    const data = {
        progress_id: req.params.progress_id
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
    model.deleteQuestProgressById(data, callback);
}
