const model = require("../models/servantsModel.js");

//////////////////////////////////////////////////////////
////////             GET /servants                ////////
//////////////////////////////////////////////////////////

module.exports.getAllInfo = (req, res, next) =>
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
////////        GET /servants/:servant_id         ////////
//////////////////////////////////////////////////////////
module.exports.getInfoById = (req, res, next) =>
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
    model.selectByID(data, callback);
}