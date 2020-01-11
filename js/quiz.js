/**
 * Quiz class.
 * @param playlist to build the quiz with.
 * PLEASE RESPECT FILE TITLE FORMATS. SEE app2.js
 * Tracks the score and index of questions.
 * Generate and store the questions.
 * @constructor
 */
function Quiz(playlist) {
    this.score = 0;
    this.playlist = playlist;
    this.questions = this.generateQuestions(this.playlist);
    this.currentQuestionIndex = 0;
}

/**
 * Return a list of questions created with the medias elements in playlist.
 * @param playlist
 * @return {[]} List of Question.
 */
Quiz.prototype.generateQuestions = function (playlist) {
    /** List of Question */ let questions = [];

    for (let i = 0; i < 5; i++) {
        let currentMedia = playlist.medias[i];
        let text = "";
        let correctAnswer = "";
        let answerOptions = [];
        let question = undefined;

        if (currentMedia instanceof Movie) {
            text = "When did " + currentMedia.title + " movie come out ?";
            correctAnswer = currentMedia.date;
            answerOptions = [currentMedia.date, parseInt(currentMedia.date) + 1, parseInt(currentMedia.date) - 1];
            shuffle(answerOptions);
            question = new Question(text, answerOptions, correctAnswer, false, currentMedia);
        }
        // One question out of two is a blind test when the media is music.
        if (currentMedia instanceof Song) {
            if (i % 2 !== 0) {
                text = "Who sang " + currentMedia.title + " ?";
                correctAnswer = currentMedia.artist;
                answerOptions.push(correctAnswer);
                shuffle(artistsDataArray);
                answerOptions.push(artistsDataArray[0], artistsDataArray[1]);
                question = new Question(text, answerOptions, correctAnswer, false, currentMedia);
            } else {
                text = "Blind Test ! What is the name of this song ? ";
                correctAnswer = currentMedia.title;
                answerOptions.push(correctAnswer);
                shuffle(sonsDataArray);
                answerOptions.push(sonsDataArray[0], sonsDataArray[1]);
                question = new Question(text, answerOptions, correctAnswer, true, currentMedia);
            }
        }
        questions.push(question);
    }
    return questions;
};

/** Verify if answer is correct and increment score.
 * @param answer to verify
 * @return boolean
 */
Quiz.prototype.isCorrectAnswer = function (answer) {
    let correct = false;
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
        correct = true;
    }
    this.currentQuestionIndex++;
    return correct;
};

/** Returns the question from currentQuestionIndex.
 * @return question
 */
Quiz.prototype.getCurrentQuestion = function () {
    return this.questions[this.currentQuestionIndex];
};


/** Returns if the quiz has ended.
 * @return boolean true when quiz has ended, false if not.
 */
Quiz.prototype.hasEnded = function () {
    return this.currentQuestionIndex >= this.questions.length;
};


/** Shuffle an array with Math.random. Code copied from https://javascript.info/task/shuffle
 * @param array an array to shuffle
 * */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Theses arrays permits to generate answer options.
 * Do not include options that are already in questions.
 * */
let artistsDataArray = [
    'Justice',
    'The Beatles',
    'U2',
    'Eagles',
    'David Bowie',
    'Hanz Zimmer',
    'The Rolling Stones',
    'AC/DC',
    'Pink Floyd'];
let sonsDataArray = [
    'Baba O’Riley',
    'A Day in the Life',
    'Back in Black',
    'Kashmir',
    'Hotel California',
    'Somebody To Love',
    'Comfortably Numb',
    'Bohemian Rhapsody',
    'All Along the Watchtower'];