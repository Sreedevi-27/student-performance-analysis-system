import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTimer } from "react-timer-hook";
import { addMilliseconds } from "date-fns";
import { getTimezoneOffset } from "date-fns-tz";

import Button from "../../components/Button/Button";
import { API_END_POINT } from "../../config";
import { getLoggedInUserId, getLoggedInUserToken } from "../../utlils";

import "./Quiz.css";

function Quiz() {
  const [quiz, setQuiz] = useState(null);
  const { studentId: sid } = useParams();
  const studentId = sid || getLoggedInUserId();
  const token = getLoggedInUserToken();
  const [answers, setAnswers] = useState({});
  const [currentQuestionNo, setCurrentQuestionNo] = useState(1);

  const { seconds, minutes, restart } = useTimer({
    onExpire: () => console.warn("onExpire called"),
    autoStart: false,
  });

  useEffect(() => {
    if (quiz) {
      restart(
        addMilliseconds(
          new Date(quiz.startedAt),
          getTimezoneOffset() + 15 * 60 * 1000
        )
      );
    }
  }, [quiz]);

  useEffect(() => {
    window
      .fetch(`${API_END_POINT}/students/${studentId}/quiz`, {
        headers: { token },
        mode: "cors",
        credentials: "include",
      })
      .then((response) => response.text())
      .then((result) => setQuiz(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, [studentId, token]);

  function handleOnChange(e) {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${API_END_POINT}/students/${studentId}/quiz/${quiz.id}/submit`, {
      method: "PUT",
      headers: { token },
      body: JSON.stringify(answers),
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => setQuiz(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }

  var buttonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  if (quiz === null) return null;

  const currentQuestion = quiz.questions?.at(currentQuestionNo - 1);

  if (quiz.endedAt)
    return (
      <div className="quiz">
        <h2> QUIZ ENDED </h2>
        <div> Total Questions : 15</div>
        <div> You have secured : {quiz.correctAnswered} </div>
        <div> Started At : {quiz.startedAt}</div>
        <div> Ended At : {quiz.endedAt}</div>
      </div>
    );

  return (
    <div className="quiz">
      <div className="quiz__timer-container">
        <div className="quiz__timer-msg">Quiz expires in</div>
        <div className="quiz__timer-minutes-container">
          <div className="quiz__timer-minutes-label">Minutes</div>
          <div className="quiz__timer-minutes-value">{minutes}</div>
        </div>
        <div className="quiz__timer-colon">
          <span className="quiz__timer-colon--top" />
          <span className="quiz__timer-colon--bottom" />
        </div>
        <div className="quiz__timer-seconds-container">
          <div className="quiz__timer-seconds-label">Seconds</div>
          <div className="quiz__timer-seconds-value">{seconds}</div>
        </div>
      </div>
      <div className="quiz__question-and-question-nos">
        <div className="quiz__question-container">
          <div className="quiz__question">{currentQuestion.question}</div>
          <div className="quiz__options">
            {currentQuestion.options.split(",").map((o, i) => (
              <div className="quiz__option" key={currentQuestion.id + i}>
                <input
                  type="radio"
                  value={o}
                  id={`option-${i}`}
                  name={currentQuestion.id}
                  onChange={handleOnChange}
                  checked={answers[currentQuestion.id] === o}
                />
                <label htmlFor={`option-${i}`}>{o}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="quiz__question-nos-and-next">
          {buttonArray.map((b) => (
            <Button
              customClass={`quiz__question-no ${
                answers[quiz.questions.at(b - 1).id]
                  ? "quiz__question-no--answered"
                  : ""
              }`}
              btnType={currentQuestionNo === b ? "primary" : "outline"}
              onClick={() => setCurrentQuestionNo(b)}
              disabled={currentQuestionNo === b}
              key={b}
            >
              {b}
            </Button>
          ))}
          <Button
            onClick={() => setCurrentQuestionNo(currentQuestionNo + 1)}
            disabled={currentQuestionNo === 15}
            customClass="quiz__next-question"
          >
            Next
          </Button>
        </div>
      </div>
      <div>
        <Button onClick={handleSubmit} btnType="secondary">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Quiz;
