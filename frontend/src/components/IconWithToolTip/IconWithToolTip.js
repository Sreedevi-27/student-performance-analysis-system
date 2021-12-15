import "./IconWithToolTip.css";

function IconWithToolTip(props) {
  const { toolTipText, size, ...rest } = props;
  return (
    <div class="tooltip">
      <img {...rest} width={size} height={size} alt="icon" />
      <span class="tooltip__text">{toolTipText}</span>
    </div>
  );
}

export default IconWithToolTip;
