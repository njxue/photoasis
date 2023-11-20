import fetchCollections from "@actions/fetchCollections";
import CollectionCard from "./CollectionCard";

const Collections = async ({}) => {
  const data = await fetchCollections();
  return (
    <div className="flex flex-row gap-2 flex-wrap ">
      {data?.map((c, i) => (
        <CollectionCard data={c} key={i} />
      ))}
    </div>
  );
};
export default Collections;
