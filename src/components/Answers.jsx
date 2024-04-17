import P from 'prop-types';
import QuestionTimer from './QuestionTimer';
import { useRef, useState } from 'react';
import { questions } from '../contants';

const Answers = ({ index, onSelectAnswer, onTimeOver }) => {
  const shuffledAnswers = useRef();
  const [answer, setAnswer] = useState({ selectedAnswer: '', isCorrect: null });

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
      }, 1000);
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
          else if (answerState === 'correct' && isSelected) css += ' bg-green-300';
          else if (answerState === 'wrong' && isSelected) css += ' bg-red-700';
          else css += ' violet-gradient';

          return (
            <li key={option} className="my-4">
              <button
                onClick={() => handleSelectAnswer(option)} //onSelectAnswer
                className={css}
                disabled={answerState !== ''}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
      <QuestionTimer timeout={60000} onTimeOver={() => onTimeOver(null)} />
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
