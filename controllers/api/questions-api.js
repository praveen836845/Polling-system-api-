// import models
const Question = require("../../models/question");
const Option = require("../../models/option");

//*********** */ GET ALL QUESTIONS START********************
// This code exports a function that gets all the questions from the database and sends a response to the client

module.exports.viewAllQuestions = async (req, res) => {
  try {
    // Find all the questions in the database
    let questions = await Question.find({});

    // If questions are found, send a JSON response with the questions and a success message
    if (questions) {
      // Response 200 indicates that the request was successful
      return res.status(200).json({
        questions,
        message: "New Question Created Successfully!!",
      });
    }
  } catch (err) {
    // If an error occurs while getting the questions, log the error and send a 500 status code with an error message
    console.log("Error while getting questions", err);
    return res.status(500).json({
      message: "Internal Server Error in getting Questions!",
    });
  }
};

//******* GET ALL QUESTIONS END  ***********//

//CREATE QUESTION START //
// This code exports a function that creates a new question in the database and sends a response to the client

module.exports.createQuestion = async (req, res) => {
  try {
    // Create a new question using the request body data
    let question = await Question.create(req.body);
    console.log(question);

    // If the question is created successfully, send a JSON response with the created question and a success message
    if (question) {
      // Response 200 indicates that the request was successful
      return res.status(200).json({
        questionCreated: question,
        message: "New Question Created Successfully!!",
      });
    } else {
      // If the question was not created successfully, send a 500 status code with an error message
      return res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  } catch (err) {
    // If an error occurs while creating the question, log the error and send a 500 status code with an error message
    console.log("Error while creating question", err);
    return res.status(500).json({
      message: "Internal Server Error in Creating a Question!",
    });
  }
};

//CREATE QUESTION END //

//CREATE OPTIONS START //
module.exports.createOption = async (req, res) => {
  try {
    // Check whether the Question exists or not
    let question = await Question.findById(req.params.id);

    if (question) {
      // create an option
      // const id = question.options.length + 1;

      let option = await Option.create({
        // id: id,
        question: req.params.id,
        text: req.body.text,
        votes: 0,
      });

      option.link_to_vote =
        "http://localhost:8000/api/options/" + option._id + "/addVote";

      option.save();

      question.options.push(option._id);
      question.save();

      return res.status(200).json({
        option,
        message: "New Option Created Successfully!!",
      });
    }

    return res.json({
      question,
    });
  } catch (err) {
    console.log("error while creating option", err);
    return res.status(500).json({
      message: "Internal Server Error While Creating an Option!",
    });
  }
};
//CREATE OPTIONS END //

//VIEW QUESTIONS START //
module.exports.viewQuestion = async (req, res) => {
  try {
    let displayQuestion = await Question.findById(req.params.id).populate(
      "options"
    );

    if (displayQuestion) {
      return res.status(200).json({
        questionDisplayed: displayQuestion,
        message: "Question displayed successfully!!",
      });
    }
  } catch (err) {
    console.log("Error while Viewing Questions", err);
    return res.status(500).json({
      message: "Internal Server Error while viewing Question!",
    });
  }
};
//VIEW QUESTIONS END //

//DELETE QUESTIONS START //

module.exports.deleteQuestion = async function (req, res) {
  try {
    let id = req.params.id;
    let question = await Question.findById(id).populate({
      path: "options",
      select: "votes",
    });
    if (question) {
      // any votes on any option (if any)
      let options = question.options;

      for (let i = 0; i < options.length; i++) {
        if (options[i].votes > 0) {
          return res.status(404).json({
            data: {
              message:
                "questions option has some votes , Not Possible to delete ",
            },
          });
        }
      }

      // if no any votes on any option of question
      await Option.deleteMany({ question: id });
      await Question.findByIdAndDelete(id);

      return res.status(200).json({
        message: "Question deleted successfully",
      });
    } else {
      return res.status(404).json({ message: "Question not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error, deleting question",
    });
  }
};
