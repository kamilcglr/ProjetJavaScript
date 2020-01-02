"use strict";
let playlist = new Playlist();
let quiz = undefined;
let mainDiv = document.getElementById('mainDiv');
mainDiv.hidden = true;

function readMediasFromDisk(playlist) {
    playlist.add(new Song("resources/songs/Imagine_John Lenon.mp3"));
    playlist.add(new Song("resources/songs/Under Pressure_Queen.mp3"));
    playlist.add(new Song("resources/songs/Stairway to heaven_Led Zeppelin.mp3"));
    playlist.add(new Movie("resources/videos/Interstellar_2014.mp4"));
    playlist.add(new Movie("resources/videos/Django Unchained_2012.mp4"));
    printNumberOfMedias(playlist);
}

function printNumberOfMedias(playlist) {
    document.getElementById("help").innerHTML = '<p id="help">' + playlist.medias.length + ' medias loaded.</p>';
}

/*
* Main
*/
readMediasFromDisk(playlist);
quiz = new Quiz(playlist);

let generateButton = document.getElementById("generate-quiz");
generateButton.onclick = function () {
    mainDiv.hidden = false;

    function buildQuizUI() {
        // place to store the HTML output
        const output = [];

        quiz.questions.forEach((currentQuestion, questionNumber) => {

            // if it is a blind test, use radio button, else a user input place
            if (currentQuestion.isBlindTest === false) {
                // list of answer choices
                const answers = [];

                // for each available answer create radio button
                for (let i = 0; i < 3; i++) {
                    answers.push(
                        `<label>             
                            <input type="radio" name="question${questionNumber}" value="${currentQuestion.answers[i]}">
                            ${currentQuestion.answers[i]}
                        </label>`
                    );
                }

                output.push(
                    `<div class="slide">
                        <div class="question"> ${currentQuestion.text} </div>
                        <div class="answers"> ${answers.join("")} </div>
                    </div>`
                );
            } else { //blind test case

                let answer = "";
                answer = `
                    <label >             
                        <input class="userInput" type="text" name="question${questionNumber}">
                    </label>
                    `
                ;

                // add this question and its answers to the output
                output.push(
                    `<div id="song_slide" class="slide">
                        <div class="question"> ${currentQuestion.text} </div>
                        <div class="answers"> ${answer} </div>
                    </div>`
                );
            }
        });

        //add the result page
        //add this question and its answers to the output
        output.push(
            `<div class="slide">
            <div id="score"> </div>
         </div>`
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join("");
    }

    function showResults() {
        // gather answer containers from quiz
        const answerContainers = quizContainer.querySelectorAll(".answers");

        // for each question...
        quiz.questions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            let selector;
            let userAnswer;

            if (currentQuestion.isBlindTest === false) {
                selector = `input[name=question${questionNumber}]:checked`;
                userAnswer = (answerContainer.querySelector(selector) || {}).value;
            } else {
                selector = `input[name=question${questionNumber}]`;
                userAnswer = (answerContainer.querySelector(selector) || {}).value;
            }

            // if answer is correct, color it to green
            //  else colorize it in red
            if (quiz.isCorrectAnswer(userAnswer)) {
                if (currentQuestion.isBlindTest === false) {
                    answerContainers[questionNumber].style.color = "lightgreen";
                } else {
                    selector = `input[name=question${questionNumber}]`;
                    (answerContainer.querySelector(selector) || {}).style.backgroundColor = "lightgreen";
                }
            } else {
                if (currentQuestion.isBlindTest === false) {
                    answerContainers[questionNumber].style.color = "red";
                } else {
                    selector = `input[name=question${questionNumber}]`;
                    (answerContainer.querySelector(selector) || {}).style.backgroundColor = "red";
                }
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${quiz.score} out of ${quiz.questions.length}`;
        scoreDiv.innerHTML = `Your score is ${quiz.score} out of ${quiz.questions.length}`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;
        playlist.stop();

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 2) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            if (currentSlide <= slides.length - 2) {
                nextButton.style.display = "inline-block";
                submitButton.style.display = "none";

                if (quiz.questions[n].isBlindTest === true) {
                    playlist.setCurrentMedia(n);
                    playlist.play()
                }
            } else {
                nextButton.style.display = "none";
                submitButton.style.display = "none";
            }
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

// display quiz right away
    buildQuizUI();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    const scoreDiv = document.getElementById("score");

    let currentSlide = 0;

    showSlide(0);

// on submit, show results
    submitButton.onclick = function () {
        showResults();
        showNextSlide();
    };
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);


};