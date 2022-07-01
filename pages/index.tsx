import type { NextPage } from 'next';
import Link from 'next/link';
import Form from '../components/Form';

const Home: NextPage = () => {
  return (
    <div className="flex mt-8 sm:mt-32 md:mt-40 flex-col items-center w-[800px]">
      {/* form heading */}
      <div className="w-fit flex flex-col items-center">
        <h1 className="text-6xl md:text-7xl">TINY-KNTP</h1>
        <span className="text-3xl md:text-4xl w-full text-justify tracking-widest">
          Make your links tiny
        </span>
        <Link href="https://github.com/lachimek" passHref={true}>
          <h1 className="cursor-pointer opacity-20 transition-opacity hover:opacity-80 mt-4 text-white">
            Made with ❤️ by Lachimek
          </h1>
        </Link>
      </div>
      {/* form content */}
      <Form />
    </div>
  );
};

export default Home;
