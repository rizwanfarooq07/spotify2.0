import React, { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";

const Login = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black">
      <img
        src="https://links.papareact.com/9xl"
        className="mb-5 w-52"
        alt="spotify logo"
      />
      {providers &&
        Object?.values(providers)?.map(({ name, id }) => (
          <div key={id}>
            <button
              className="bg-[#18D860] text-white rounded-full p-5"
              onClick={() => signIn(id, { callbackUrl: "/" })}
            >
              Login with {name}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Login;

// export async function getServerSideProps() {
//   const providers = await getProviders();
//   return {
//     props: {
//       providers,
//     },
//   };
// }
