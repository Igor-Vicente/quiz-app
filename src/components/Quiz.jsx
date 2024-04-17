import { questions } from '../contants';
import { useCallback, useState } from 'react';
import { quizComplete } from '../assets';
import Answers from './Answers';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const index = userAnswers.length;
  const over = questions.length === index;

  const handleSelectAnswer = useCallback((option) => {
    setUserAnswers((prevState) => [...prevState, option]);
  }, []);

  const handleTimeOver = () => {
    setUserAnswers((prevState) => [...prevState, null]);
  };

  if (over) {
    return (
      <div className="text-center bg-purple-400 max-w-[760px] mx-auto shadow-md shadow-black rounded-sm">
        <img
          src={quizComplete}
          alt="trophy"
          className="inline-block w-28 h-28 border-2 drop-shadow-md shadow-md shadow-black border-black  p-4 rounded-full my-6"
        />
        <h1 className="font-platypi text-4xl uppercase tracking-widest text-zinc-900 font-bold my-4">
          Quiz Completed!
        </h1>
      </div>
    );
  }

  return (
    <div className="text-center p-8">
      <h2 className="text-xl sm:text-2xl font-platypi tracking-wider">
        {questions[index].text}
      </h2>
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
