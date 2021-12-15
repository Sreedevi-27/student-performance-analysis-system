import "./Button.css";

function Button(props) {
  const { children, btnType = "primary", customClass = "", ...rest } = props;

  return (
    <button className={`btn btn__${btnType} ${customClass}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
