
export default function Dice(props) {
  return (
    <div className={`dice-face ${props.selected?"held":""}`} onClick={props.onClick}>
      <img src={props.img} />
    </div>
  );
}
