export default function Square(props) {
  return (
    <button
      onClick={() => {
        props.onClick();
      }}
      className={props.className}
    >
      {props.value}
    </button>
  );
}
