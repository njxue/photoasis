const MinimalisticViewToggle = ({ minimalisticView, setMinimalisticView }) => {
  return (
    <div
      className="fixed right-5 bottom-5 w-[30px] cursor-pointer z-50 opacity-20 hover:opacity-70 hover:scale-110 transition-opacity ease-in-out duration-200"
      onClick={() => setMinimalisticView((prev) => !prev)}>
      <img src={`/assets/icons/${minimalisticView ? "unhide" : "hide"}.svg`} alt="toggleMinimalisticView"/>
    </div>
  );
};

export default MinimalisticViewToggle;
