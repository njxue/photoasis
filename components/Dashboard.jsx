import Collections from "./Collections";
import AddCollection from "./AddCollection";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

const Dashboard = async () => {
  return (
    <div className="p-1">
      <AddCollection />
      <Collections />
    </div>
  );
};
export default Dashboard;
