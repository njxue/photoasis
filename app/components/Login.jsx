"use client";

import { capitalize } from "@utils/helpers";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
const Login = () => {
  const [providers, setProviders] = useState(null);
  const LOGIN_DISABLED = process.env.NEXT_PUBLIC_DISABLE_LOGIN === "true";

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleClickGoogleForm = () => {
    localStorage.setItem("navigatedToForm", "true");
  };

  const navigatedToForm = localStorage.getItem("navigatedToForm") === "true";

  return (
    <div className="relative w-screen h-screen flex flex-row justify-center items-center bg-[url('/assets/images/polaroid.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-60"></div>

      {providers && (
        <div className="flex flex-col justify-center items-center w-[90%] sm:w-1/2 z-50 animate-fadeInAndSlideDown">
          <img
            src="/assets/images/logoNew.png"
            className="w-[70%] min-w-[250px] md:w-[40%] pointer-events-none"
            alt="photoasisLogo"
          />

          <div className="text-xl text-justify text-gray-700 font-serif tracking-wider leading-8 mt-6 md:w-9/12">
            Welcome to
            <span>
              <b> PhotOasis</b>
            </span>
            ! Capture your most precious memories and organize them into albums
            to relive your moments anywhere. Sign in now and start crafting your
            digital stories!
          </div>
          <div className="mt-10 w-full min-w-[260px] md:w-1/2">
            {LOGIN_DISABLED && !navigatedToForm && (
              <button
                onClick={handleClickGoogleForm}
                className=" border border-solid border-gray-400 rounded p-2 hover:bg-gray-50">
                <a href="https://forms.gle/CLTFzRduwSGcUSVa6">
                  Answer this short survey before logging in
                </a>
              </button>
            )}
            {(!LOGIN_DISABLED || navigatedToForm) &&
              Object.values(providers).map((provider) => (
                <button
                  onClick={() => signIn(provider.id)}
                  className="flex flex-row justify-center items-center gap-3 h-[40px] w-full border border-solid border-gray-400 rounded p-2 hover:bg-gray-50">
                  {
                    <img
                      src={`/assets/icons/${provider.id}.svg`}
                      className="h-full pointer-events-none"
                      alt={provider.id}
                    />
                  }

                  {<p>Sign in with {capitalize(provider.id)}</p>}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
