import React from "react"

function Buttons(props) {


return (
    <button className={props.class} onClick={() => props.handle(props.num)}><span>{props.num}</span></button>
)
}

export default Buttons;