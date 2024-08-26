const model = require("../models/questModel.js");

//////////////////////////////////////////////////////////
////////            Post /quest                   ////////
//////////////////////////////////////////////////////////

module.exports.createNewQuest = (req, res, next) =>
{
    const {title, requirements} = req.body; 

    if (!title || !requirements) {
        res.status(400).json({"message": `Missing required data.`});
        return;
    }

    const data = {
        title: title,
        requirements: requirements
    }
    
    const callback = (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).json({message:`internal server error.`});
        } else {
            res.status(201).json({
                quest_id: `${results.insertId}`,
                title: `${data.title}`,
                requirements: `${data.requirements}`,
                saint_quartz: `x5`
            });
        }
    }
    model.insertSingle(data, callback);
}

//////////////////////////////////////////////////////////
////////             Get /quests                  ////////
//////////////////////////////////////////////////////////

module.exports.getQuests = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
        } 
        else res.status(200).json(results);
    }
    model.selectAll(callback);
}

//////////////////////////////////////////////////////////
////////         Get /quest/{quest_id}            ////////
//////////////////////////////////////////////////////////

module.exports.getQuestById = (req, res, next) =>
{   
    const data = {
        quest_id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
        } else if (results.length == 0) {
            res.status(404).end();
        } else {
            res.status(200).json(results[0]);
        }
    }
    model.selectByID(data, callback);
}

//////////////////////////////////////////////////////////
////////          Put /quest/{quest_id}           ////////
//////////////////////////////////////////////////////////

module.exports.updateQuestById = (req, res, next) =>
{   
    const {title, requirements} = req.body; 

    if (!title || !requirements) {
        res.status(400).json({"message": `Missing required data.`});
        return;
    }

    const data = {
        title: title,
        requirements: requirements,
        quest_id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log(error)
            res.status(500).json({message:`internal server error.`});
        } else if (results.affectedRows == 0) {
            res.status(404).end();
        } else {
            res.status(200).json({
                quest_id: `${data.quest_id}`,
                title: `${data.title}`,
                requirements: `${data.requirements}`
            });
        }
    }
    model.updateByID(data, callback);
}

//////////////////////////////////////////////////////////
////////        Delete /quest/{quest_id}          ////////
//////////////////////////////////////////////////////////

module.exports.deleteQuest = (req, res, next) =>
{   
    const data = {
        quest_id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json({message:`internal server error.`});
        } else if (results.affectedRows == 0) {
            res.status(404).end();
        } else {
            res.status(204).end();
        }
    }
    model.deleteByID(data, callback);
}