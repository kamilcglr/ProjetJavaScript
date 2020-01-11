"use strict";

/**
 * Question class.
 * Contains the text of question, the answer options (if it is not a blind test).
 * @constructor
 */
function Question(text, answers, correct, isBlindTest, media) {
    this.text = text;
    this.answers = answers;
    this.correctAnswer = correct;
    this.isBlindTest = isBlindTest;
    this.media = media;
}

/**
 * Return if the answer given in parameters is correct.
 * @param choice string answer of user
 * @return boolean true if correct, false if not.*/
Question.prototype.isCorrectAnswer = function (choice) {
    if (choice !== undefined) {
        return this.correctAnswer.toLocaleLowerCase() === choice.toLowerCase();
    } else {
        return false;
    }
};