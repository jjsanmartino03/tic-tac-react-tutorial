export default function Square(props) {
  return (
    <button
      onClick={() => {
        props.onClick();
      }}
      className={props.className}
      disabled={props.disabled}
    >
      {props.value}
    </button>
  );
}
