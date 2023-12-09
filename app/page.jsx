import Dashboard from "./components/Dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Login from "./components/Login";
const Home = async () => {
  const isLoggedIn = await getServerSession(authOptions);
  return (
    <div className="w-[100vw] flex-center flex-col h-[100vh]">
      {isLoggedIn ? <Dashboard /> : <Login />}
    </div>
  );
};

export default Home;
