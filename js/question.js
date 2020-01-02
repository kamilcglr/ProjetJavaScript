"use strict";

/**
 * Main Class of song and movie
 * @constructor
 */
function Question(text, answers, correct, isBlindTest, media) {
    this.text = text;
    this.answers = answers;
    this.correctAnswer = correct;
    this.isBlindTest = isBlindTest;
    this.media = media;
}

/** Return is the answer given in parameters is correct
 * @param choice answer of user
 * @return boolean if correct, false if not.*/
Question.prototype.isCorrectAnswer = function (choice) {
    if (choice !== undefined) {
        return this.correctAnswer.toLocaleLowerCase() === choice.toLowerCase();
    } else {
        return false;
    }
};