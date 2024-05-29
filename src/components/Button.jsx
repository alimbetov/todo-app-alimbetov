
function Button(props) {
  
  const myButtonActiveStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif",
    display: "inline-block",
    outline: "none",
    cursor: "pointer",
    with: 20
  };
  const myButtonPasiveStyle = {
    color: "black",
    backgroundColor: "Blue",
    padding: "10px",
    fontFamily: "Sans-Serif",
    display: "inline-block",
    outline: "none",
    cursor: "pointer",
    with: 20
  };
return (
  <div>
  <button
    style={props.myButton.isActive ? myButtonActiveStyle : myButtonPasiveStyle}
    onClick={props.onClick}
  >
    {props.myButton.title}
  </button>
</div>
);
}


export default  Button;