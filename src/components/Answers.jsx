import P from 'prop-types';
import QuestionTimer from './QuestionTimer';
import { useRef, useState } from 'react';
import { questions } from '../contants';

const Answers = ({ index, onSelectAnswer, onTimeOver }) => {
  const shuffledAnswers = useRef();
  const [answer, setAnswer] = useState({ selectedAnswer: '', isCorrect: null });

  let timer = 10000;
  if (answer.selectedAnswer) timer = 1000;
  if (answer.isCorrect !== null) timer = 2000;

  if (shuffledAnswers.current === undefined) {
    shuffledAnswers.current = [...questions[index].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  const handleSelectAnswer = (answer) => {
    setAnswer({ selectedAnswer: answer, isCorrect: null });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: questions[index].answers[0] === answer,
      });
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect != null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <>
      <ul className="mx-auto max-w-[760px] mt-8">
        {shuffledAnswers.current.map((option) => {
          let css = 'w-full p-3 font-semibold rounded-md text-dimWhite hover:text-white';
          const isSelected = option === answer.selectedAnswer;

          if (answerState === 'answered' && isSelected) css += ' border';
          else if (answerState === 'correct' && isSelected) css += ' text-green-700';
          else if (answerState === 'wrong' && isSelected) css += ' text-red-600';
          else css += ' violet-gradient';

          return (
            <li key={option} className="my-4">
              <button
                onClick={() => handleSelectAnswer(option)}
                className={css}
                disabled={answerState !== ''}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
      {answer.selectedAnswer === '' && (
        <QuestionTimer
          key={timer}
          timeout={timer}
          onTimeOver={answer.selectedAnswer === '' ? () => onTimeOver(null) : null}
        />
      )}
    </>
  );
};

Answers.propTypes = {
  index: P.number,
  selectedAnswer: P.string,
  answerState: P.string,
  onSelectAnswer: P.func,
  onTimeOver: P.func,
};

export default Answers;
