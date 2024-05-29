


function Action(props, title , direction) {
  


return (
  <div>
  <button   class="myActionButton"
    onClick={props.onClick}
  > 

   <p> {props.title} ✅ </p>
        <span class="arrow"></span>
  </button>
</div>
);
}

export default  Action;