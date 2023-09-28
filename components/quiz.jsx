import { useState, useEffect } from "react";
import axios from "axios";
import "../src/App.css";
import "../src/index.css";

function Quiz() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

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

  // 1. Initialize questionIndex with -1
  // 2. Create a new state variable currentQuestion that contains the complete question data including correctAnswer
  // 3. Initialize currentQuestion with null
  // 4. Once the quizQuestions, set the questionIndex to 0
  // 5. Write a second useEffect() that listens on questionIndex
  // 6. In this useEffect, you can read the id of the current question in quizQuestions[questionIndex]
  // 7. Fetch the data for this id and store it in currentQuestion

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
  };

  return (
    <div>
      <img
        src="https://www.tagesspiegel.de/images/shrek/alternates/BASE_4_3_W1000/shrek.jpeg"
        alt="Shrek"
      />
      <h1>Shrek Quiz</h1>
      {/* <p>{"selectedAnswer:" + selectedAnswer}</p>
      <p>{"currentQuestion CorrectAnswer:" + currentQuestion?.correctAnswer}</p> */}
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
  );
}

export default Quiz;
