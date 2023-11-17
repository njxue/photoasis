import Image from "next/image";

const CollectionCard = ({ data }) => {
  return (
    <div className="card w-[250px] h-[250px]">
      <Image
        src={data?.image}
        width={0}
        height={0}
        style={{ height: "70%", width: "100%" }}
      />

      <div className="px-5 py-3">
        Placeholder description foo bar baz qux quux
      </div>
    </div>
  );
};

export default CollectionCard;
