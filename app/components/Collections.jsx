import CollectionCard from "./CollectionCard";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import prisma from "@prisma/prisma";
import { getServerSession } from "next-auth";
import AddCollection from "./AddCollection";

const fetchCollections = async () => {
  try {
    const session = await getServerSession(authOptions);
    const uid = session?.user.id;

    let collections = await prisma.collection.findMany({
      where: {
        uid: uid,
      },
      include: {
        thumbnail: true,
      },
    });
    return {
      data: collections,
      status: 200,
    };
  } catch (err) {
    return { status: 500 };
  }
};
const Collections = async ({}) => {
  const res = await fetchCollections();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
      <AddCollection />
      {res.data?.map((collection) => (
        <CollectionCard data={collection} key={collection.cid} />
      ))}
    </div>
  );
};
export default Collections;
