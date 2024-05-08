import SelectableItem from "@app/common/Select/SelectableItem";
import PhotoCard from "@app/common/Cards/Photo/PhotoCard";
function AlbumBody({ photos, minimalisticView }) {
  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <SelectableItem item={photo.pid} key={photo.pid}>
          <PhotoCard
            photo={photo}
            key={photo.pid}
            minimalisticView={minimalisticView}
          />
        </SelectableItem>
      ))}
    </div>
  );
}

export default AlbumBody;
