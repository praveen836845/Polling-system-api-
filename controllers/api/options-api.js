// import models
const Question = require('../../models/question');
const Option = require('../../models/option');


// ADD VOTE START //
module.exports.addVote = async (req, res) => {
    try {
       let id = req.params.id;
       // check if the option exists for the question, add a new vote by incrementing 1
        await Option.findByIdAndUpdate(id, { $inc: { votes: 1 } });

        return res.status(200).json({
           message: "Voted Successfully!!"
        });

    } catch (err) {
        console.log('Error In Adding Vote', err);

        return res.status(500).json({
            message: "Internal Server Error In Adding Vote!"
        });
    }
}
// ADD VOTE END //


// DELETE OPTION START //
module.exports.deleteOption = async (req, res) => {
    try {

        let id = req.params.id;

        // Checking if option exists
        let option = await Option.findById(id);

        // Checking if number of votes are > 0, if true an option will be deleted

        if (option.votes > 0) {

            return res.status(400).json({

                message: "Option cannot be deleted, count of votes > 0!"

            });
        }

        // deleting the option from question options array first
        await Question.findByIdAndUpdate(option.question, { $pull: { options: id } });

        // Now deleting the option from the database
        await Option.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Option Deleted Successfully!!"
        });

    } catch (err) {

        console.log('Error in deleting Option', err);

        return res.status(500).json({
            message: "Internal Server Error in deleting Option!"
        });
    }
}
// DELETE OPTION END //