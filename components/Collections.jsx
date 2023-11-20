import fetchCollections from "@actions/fetchCollections";
import CollectionCard from "./CollectionCard";

const Collections = async ({}) => {
  const data = await fetchCollections();
  console.log(data);
  return (
    <div className="flex flex-row gap-2 flex-wrap ">
      <CollectionCard data={data} />
    </div>
  );
};
export default Collections;
