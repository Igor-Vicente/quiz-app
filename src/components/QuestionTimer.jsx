import P from 'prop-types';
import { useEffect, useState } from 'react';

const QuestionTimer = ({ timeout, onTimeOver }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeOver();
    }, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [onTimeOver, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevState) => prevState - 100);
    }, 100);
    return () => {
      clearTimeout(interval);
    };
  }, []);

  return <progress value={remainingTime} max={timeout} />;
};

export default QuestionTimer;

QuestionTimer.propTypes = {
  timeout: P.number,
  onTimeOver: P.func,
};
