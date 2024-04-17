import { quizComplete } from '../assets';
import { QUESTIONS } from '../contants';
import P from 'prop-types';

const Sumary = ({ userAnswers }) => {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => QUESTIONS[index].answers[0] === answer,
  );
  const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
  const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div className="text-center bg-purple-400 max-w-[760px] mx-auto shadow-md shadow-black rounded-sm">
      <img
        src={quizComplete}
        alt="trophy"
        className="inline-block w-28 h-28 border-2 drop-shadow-md shadow-md shadow-black border-black  p-4 rounded-full mt-8"
      />
      <h1 className="font-platypi text-3xl sm:text-4xl uppercase tracking-widest font-bold mt-5 text-transparent bg-clip-text bg-gradient-to-bl from-red-700 to-purple-600">
        Quiz Completed!
      </h1>
      <div className="flex justify-evenly my-10 font-platypi">
        <p className="flex-col flex w-full gap-2">
          <span className="text-5xl">{skippedAnswersShare}% </span>
          <span className="text-2xl">skipped</span>
        </p>
        <p className="flex-col flex w-full gap-2">
          <span className="text-5xl">{correctAnswersShare}% </span>
          <span className="text-2xl">correctly</span>
        </p>
        <p className="flex-col flex w-full gap-2">
          <span className="text-5xl">{wrongAnswersShare}% </span>
          <span className="text-2xl">incorrectly</span>
        </p>
      </div>
      <ol className="m-10">
        {QUESTIONS.map((question, index) => {
          let css = 'mb-10 text-lg font-bold';
          if (userAnswers[index] === question.answers[0]) css += ' text-green-900';
          else css += ' text-red-600';

          return (
            <li key={question.text}>
              <p className="text-zinc-900 text-lg font-platypi">
                {index + 1 + '. ' + question.text}
              </p>
              <p className={css}>{userAnswers[index] || 'Not Answered'}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Sumary;

Sumary.propTypes = {
  userAnswers: P.array,
};
