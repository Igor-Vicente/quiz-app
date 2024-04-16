import { questions } from '../contants';
import { useState } from 'react';
import { quizComplete } from '../assets';

const Quiz = () => {
  const [userAnswer, setUserAnswer] = useState([]);
  const index = userAnswer.length;
  const over = questions.length === index;

  console.log(index);
  console.log(over);

  const handleSelectAnswer = (option) => {
    setUserAnswer((prevState) => [...prevState, option]);
  };

  if (over) {
    return (
      <div className="text-center bg-purple-400 max-w-[760px] mx-auto shadow-md shadow-black rounded-sm  ">
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

  const shuffledAnswers = [...questions[index].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div className="text-center p-8">
      <h1 className="text-2xl font-platypi tracking-wider">
        {questions[index].text}
      </h1>
      <ul className="mx-auto max-w-[760px] mt-8">
        {shuffledAnswers.map((option) => (
          <li key={option} className="my-4">
            <button
              onClick={() => handleSelectAnswer(option)}
              className="w-full p-3 font-semibold violet-gradient rounded-md text-dimWhite hover:text-white"
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
