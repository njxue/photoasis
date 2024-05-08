import SelectableItem from "@app/common/Select/SelectableItem";
import AlbumCard from "@app/common/Cards/Album/AlbumCard";
function DashboardBody({ albums }) {
  return (
    <div className="photo-grid">
      {albums?.map((album) => (
        <SelectableItem item={album.aid} key={album.aid}>
          <AlbumCard data={album} />
        </SelectableItem>
      ))}
    </div>
  );
}

export default DashboardBody;
