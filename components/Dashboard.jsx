import Collections from "./Collections";
import AddCollection from "./AddCollection";

const Dashboard = () => {
  return (
    <div className="p-1">
      <AddCollection />
      <Collections />
    </div>
  );
};
export default Dashboard;
