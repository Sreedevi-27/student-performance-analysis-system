import "./TextBox.css";

function TextBox(props) {
  const { children } = props;

  return (
    <input className="text textbox" {...props}>
      {children}
    </input>
  );
}

export default TextBox;
