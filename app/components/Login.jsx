"use client";

import { capitalize } from "@utils/helpers";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
const Login = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="relative h-full w-full flex flex-row justify-center items-center bg-[url('/assets/images/polaroid.jpg')] bg-cover bg-center bg-no-repeat">
      <div class="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50"></div>

      {providers && (
        <div className="flex flex-col justify-center items-center w-[90%] sm:w-1/2 z-50 animate-fadeInAndSlideDown">
          <div className="text-4xl font-bold">Placeholder name</div>
          <div className="mt-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut a sed
            doloremque odit dicta, officiis aliquam iste nam vel, assumenda
            nostrum minima ipsum laudantium reiciendis facere accusamus esse
            culpa explicabo!
          </div>
          <div className="mt-10 w-full md:w-1/2">
            {Object.values(providers).map((provider) => (
              <button
                onClick={() => signIn(provider.id)}
                className="flex flex-row justify-center items-center gap-3 h-[40px] w-full border border-solid border-gray-500 rounded p-2">
                <img
                  src={`/assets/icons/${provider.id}.svg`}
                  className="h-full"
                />
                <p>Sign in with {capitalize(provider.id)}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
