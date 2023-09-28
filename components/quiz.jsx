import { useState, useEffect } from "react";
import axios from "axios";
import "../src/App.css";
import "../src/index.css";
import EndScreen from "./EndScreen";
import Highscore from "./Highscore";

function Quiz() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isQuizDone, setIsQuizDone] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/quiz")
      .then((response) => {
        setQuizQuestions(response.data);
        setQuestionIndex(0);
      })
      .catch((error) => {
        console.error("oopsie no Questions found!", error);
      });
  }, []);

  useEffect(() => {
    setTotalQuestions(quizQuestions.length);
    if (questionIndex >= 0 && questionIndex < quizQuestions.length) {
      const currentQuestion = quizQuestions[questionIndex].id;
      axios
        .get(`http://localhost:3000/quiz/${currentQuestion}`)
        .then((response) => {
          setCurrentQuestion(response.data.question);
        })
        .catch((error) => {
          console.error("oopsie daisy, no Question Found!:", error);
        });
    }
  }, [questionIndex, quizQuestions]);

  // if (quizQuestions.length === 0) {
  //   return <p>Loading..</p>;
  // }

  const handleNextQuestion = () => {
    if (questionIndex < quizQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(null);
    } else {
      <p>Good Shit my Boy</p>;
    }
  };

  const handleAnswerClick = (selectedAnswerIndex) => {
    if (selectedAnswerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(selectedAnswerIndex);
    if (questionIndex === quizQuestions.length - 1) {
      setIsQuizDone(true);
    }
  };

  const restartQuiz = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsQuizDone(false);
    setShow;
  };

  return (
    <div>
      {isQuizDone ? (
        <EndScreen score={score} onRestart={restartQuiz} />
      ) : (
        <div>
          <img
            src="https://www.tagesspiegel.de/images/shrek/alternates/BASE_4_3_W1000/shrek.jpeg"
            alt="Shrek"
          />
          <h1>Shrek Quiz</h1>
          <p>
            Score: {score}/{totalQuestions}
          </p>
          {currentQuestion === null ? (
            <p>Loading...</p>
          ) : (
            <div>
              <h2>{currentQuestion.question}</h2>
              <ul>
                {currentQuestion.answers.map((answer, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleAnswerClick(index)}
                      className={`quiz-button ${
                        selectedAnswer !== null &&
                        index === currentQuestion.correctAnswer
                          ? "correct"
                          : selectedAnswer === index &&
                            index !== currentQuestion.correctAnswer
                          ? "wrong"
                          : ""
                      }`}
                      disabled={selectedAnswer !== null}
                    >
                      {answer}
                    </button>
                  </li>
                ))}
              </ul>
              {selectedAnswer !== null && (
                <p>
                  {selectedAnswer === currentQuestion.correctAnswer
                    ? "Correct Answer!!"
                    : `Wrong.. The correct answer is: ${
                        currentQuestion.answers[currentQuestion.correctAnswer]
                      }`}
                </p>
              )}
              <button className="NextButton" onClick={handleNextQuestion}>
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
