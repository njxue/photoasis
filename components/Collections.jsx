import fetchCollections from "@actions/fetchCollections";
import CollectionCard from "./CollectionCard";

const Collections = async ({}) => {
  const collections = await fetchCollections();
  return (
    <div className="flex flex-row gap-2 flex-wrap ">
      {collections.map((c, i) => (
        <CollectionCard data={c} key={i} />
      ))}
    </div>
  );
};
export default Collections;
