import { QUESTIONS } from '../contants';
import { useCallback, useState } from 'react';
import Answers from './Answers';
import Sumary from './Sumary';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const index = userAnswers.length;
  const over = QUESTIONS.length === index;

  const handleSelectAnswer = useCallback((option) => {
    setUserAnswers((prevState) => [...prevState, option]);
  }, []);

  const handleTimeOver = () => {
    setUserAnswers((prevState) => [...prevState, null]);
  };

  if (over) {
    return <Sumary userAnswers={userAnswers} />;
  }

  return (
    <div className="text-center p-8">
      <h2 className="text-xl sm:text-2xl font-platypi tracking-wider">{QUESTIONS[index].text}</h2>
      <Answers
        key={index}
        index={index}
        onSelectAnswer={handleSelectAnswer}
        onTimeOver={handleTimeOver}
      />
    </div>
  );
};

export default Quiz;
