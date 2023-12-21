"use client";
import OptimisedImage from "@app/common/OptimisedImage";
const AlbumCard = ({ data }) => {
  let { uid, name, aid, thumbnail } = data;
  if (!thumbnail) {
    thumbnail = "/assets/images/placeholder.png";
  } else {
    thumbnail = `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${uid}/${aid}/${thumbnail?.name}`;
  }

  return (
    <>
      <div className="card relative">
        <OptimisedImage src={thumbnail} name={name} hover />
        <div className="absolute bottom-2 px-5 text-white text-border text-xl font-bold text-start line-clamp-2">
          {name}
        </div>
      </div>
    </>
  );
};

export default AlbumCard;
