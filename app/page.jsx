import Dashboard from "@components/Dashboard/Dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
const Home = async () => {
  const isLoggedIn = await getServerSession(authOptions);
  return (
    <section className="w-full flex-center flex-col ">
      {isLoggedIn ? <Dashboard /> : <>Pls login</>}
    </section>
  );
};

export default Home;
