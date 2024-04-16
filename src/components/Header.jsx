import { logo } from '../assets';

const Header = () => {
  return (
    <header className="my-4 text-center">
      <img src={logo} alt="logo" className="w-12 h-12 inline-block" />
      <h1 className="font-platypi text-3xl sm:text-5xl uppercase tracking-widest purple-text-gradient font-bold my-4">
        ReactQuiz
      </h1>
    </header>
  );
};

export default Header;
