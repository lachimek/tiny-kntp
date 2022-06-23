import type { NextPage } from 'next'
import Head from 'next/head'
import Form from '../components/Form'

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>TINY-KNTP</title>
        <meta name="description" content="TINY-KNTP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="font-oswald bg-slate-900 text-slate-200 h-screen">
        <div className="h-full w-full absolute flex items-center justify-center">
          <div className="absolute w-[200px] scale-150">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#FF0066"
                d="M50,-11.6C59.7,13.6,58.9,46.8,40.8,61.1C22.7,75.5,-12.7,70.9,-30.6,54.9C-48.5,38.9,-48.8,11.5,-40.8,-11.4C-32.7,-34.2,-16.4,-52.5,1.9,-53.1C20.2,-53.7,40.3,-36.7,50,-11.6Z"
                transform="translate(100 50)"
              />
            </svg>
          </div>
          <div className="absolute w-[200px] scale-150">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#08BDBA"
                d="M66.1,-18.6C74.5,4.2,62.3,36.6,39,53.6C15.6,70.6,-19,72.1,-39.7,56.6C-60.4,41.1,-67.3,8.5,-58.4,-15.2C-49.5,-38.8,-24.7,-53.4,2.1,-54.1C28.9,-54.8,57.8,-41.5,66.1,-18.6Z"
                transform="translate(150 150)"
              />
            </svg>
          </div>
          <div className="absolute w-[200px] scale-150">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#0F62FE"
                d="M15.4,-8.5C29.2,-6.8,56,-10.7,63.6,-5.6C71.2,-0.5,59.6,13.6,50.8,29.8C42,46.1,36.1,64.4,22.7,74.4C9.4,84.5,-11.3,86.2,-26.6,78.3C-41.9,70.5,-51.7,53,-55.8,36.7C-59.8,20.4,-58.1,5.2,-52.9,-6.8C-47.7,-18.8,-39.1,-27.6,-29.8,-30.1C-20.4,-32.6,-10.2,-28.8,-4.7,-23.2C0.8,-17.6,1.6,-10.3,15.4,-8.5Z"
                transform="translate(50 100)"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-center h-full bg-black bg-opacity-20 backdrop-blur-2xl z-10">
          <div className="flex mt-32 md:mt-40 flex-col items-center w-[800px]">
            {/* form heading */}
            <div className="w-fit flex flex-col items-center">
              <h1 className="text-6xl md:text-7xl">TINY-KNTP</h1>
              <span className="text-3xl md:text-4xl w-full text-justify tracking-widest">
                Make your links tiny
              </span>
            </div>
            {/* form content */}
            <Form />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
