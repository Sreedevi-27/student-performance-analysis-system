import "./Avatar.css";

function Avatar(props) {
  const { size = 30, letter, img = null } = props;
  return (
    <div
      className="avatar"
      style={{ width: size, height: size, fontSize: size / 2 }}
    >
      {img || letter}
    </div>
  );
}

export default Avatar;
