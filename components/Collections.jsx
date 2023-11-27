import CollectionCard from "./CollectionCard";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

async function fetchCollections() {
  try {
    const prisma = new PrismaClient();
    return {
      image: "https://cloudflare-b2.ngjxue.workers.dev/1/DSC_0814.jpg",
      status: 200,
    };
  } catch (err) {
    return { status: 500 };
  }
}
const Collections = async ({}) => {
  const data = await fetchCollections();
  return (
    <div className="flex flex-row gap-2 flex-wrap ">
      <CollectionCard data={data} />
    </div>
  );
};
export default Collections;
