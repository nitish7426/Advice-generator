import axios from "axios";
import React, { useEffect, useState } from "react";
import dividerMobile from "./assets/images/pattern-divider-mobile.svg";
import dividerDesktop from "./assets/images/pattern-divider-desktop.svg";
import dice from "./assets/images/icon-dice.svg";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const url = "https://api.adviceslip.com/advice";
  const fetchAdvice = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(url);
      setAdvice(data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchAdvice();
  }, []);
  return (
    <div className="min-h-screen bg-dark-blue flex items-center justify-center py-6 px-4">
      <div className="bg-dark-grayish-blue p-6 pb-0 rounded-xl gap-6 flex flex-col items-center justify-center max-w-md">
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <div className="text-lg text-neon-green pb-6">
            Sorry something went wrong try again later.
          </div>
        ) : (
          <>
            <p className="text-sm text-neon-green text-center tracking-widest leading-none">
              ADVICE #{advice?.slip?.id}
            </p>
            <h1 className=" text-2xl text-center font-bold text-light-cyan">
              "{advice?.slip?.advice}"
            </h1>
            <img className="mx-auto md:hidden" src={dividerMobile} alt="" />
            <img
              className="mx-auto hidden md:block"
              src={dividerDesktop}
              alt=""
            />
            {/* <div className=""> */}
            <button
              className="bg-neon-green p-4 rounded-full relative group block mx-auto -mb-7"
              onClick={fetchAdvice}
            >
              <div className="absolute bg-neon-green inset-0 rounded-full group-hover:blur-md transition-all"></div>
              <img className="isolate" src={dice} alt="" />
            </button>
          </>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default App;

const Spinner = () => {
  return (
    <div className="h-8 w-8 rounded-full border-4 border-neon-green border-l-transparent animate-spin mb-4 mx-8"></div>
  );
};
