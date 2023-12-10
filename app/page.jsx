import Dashboard from "./components/Dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Login from "./components/Login";
const Home = async () => {
  const isLoggedIn = await getServerSession(authOptions);
  return (
    <div className="flex flex-center flex-col">
      {isLoggedIn ? <Dashboard /> : <Login />}
    </div>
  );
};

export default Home;
