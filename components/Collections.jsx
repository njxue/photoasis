import CollectionCard from "./CollectionCard";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";


const fetchCollections = async () => {
  try {
    const prisma = new PrismaClient();
    const session = await getServerSession(authOptions);
    const uid = session?.user.id;
    console.log(uid);
    let collections = await prisma.collection.findMany({
      where: {
        uid: uid,
      },
      include: {
        photos: {
          include: {
            photo: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return {
      data: collections,
      status: 200,
    };
  } catch (err) {
    console.log(err);
    return { status: 500 };
  }
};
const Collections = async ({}) => {
  const res = await fetchCollections();

  return (
    <div className="flex flex-row gap-2 flex-wrap ">
      {res.data?.map((collection) => (
        <CollectionCard data={collection} key={collection.cid} />
      ))}
    </div>
  );
};
export default Collections;
