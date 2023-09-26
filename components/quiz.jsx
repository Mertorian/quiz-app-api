import { useState, useEffect } from "react";
import axios from "axios";
import "../src/App.css";
import "../src/index.css";

function Quiz() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [isCorrect, setIsCorrect] = useState();

  useEffect(() => {
    axios.get("http://localhost:3000/quiz").then((response) => {
      setQuizQuestions(response.data.quizQuestions);
    });
  }, []);

  const handleRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * quizQuestions.length);
    const randomQuestionId = quizQuestions[randomIndex].id;

    axios
      .get(`http://localhost:3000/quiz/${randomQuestionId}`)
      .then((response) => {
        setRandomQuestion(response.data.question);
        setSelectedAnswer(null);
        setIsCorrect(null);
      });
  };

  const handleAnswerClick = (index) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      const correctAnswerIndex = randomQuestion.correctAnswer;
      setIsCorrect(index === correctAnswerIndex);
    }
  };

  return (
    <div>
      <img src="https://www.tagesspiegel.de/images/shrek/alternates/BASE_4_3_W1000/shrek.jpeg" />
      <h1>Shrek Quiz</h1>
      <button onClick={handleRandomQuestion}>Random Question!</button>
      {randomQuestion && (
        <div>
          <h2>{randomQuestion.question}</h2>
          <ul>
            {randomQuestion.answers.map((answer, index) => (
              <li key={index}>
                <button
                  onClick={() => handleAnswerClick(index)}
                  className={`quiz-button ${
                    selectedAnswer !== null &&
                    index === randomQuestion.correctAnswer
                      ? "correct"
                      : selectedAnswer === index && !isCorrect
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
              {isCorrect
                ? "Correct Answer!!"
                : `Wrong.. The correct answer is: ${
                    randomQuestion.answers[randomQuestion.correctAnswer]
                  }`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
