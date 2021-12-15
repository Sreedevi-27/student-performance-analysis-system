import { Link } from "react-router-dom";
import "./LinkWithIcon.css";

const ICON_SIZE = 20;

function LinkWithIcon(props) {
  const size = props.size || ICON_SIZE;
  return (
    <div className="link">
      <img src={props.icon} alt="avatar" width={size} height={size} />
      <Link to={props.url} className="link-anchor">
        {props.children}
      </Link>
    </div>
  );
}

export default LinkWithIcon;
