import React from "react";
import "./Box.css"

const Box = ({flipBoxesAroundMe, lightOn}) => {
const classes = `Box ${lightOn ? 'Box-light' : 'Box-dark'}`

    return (
        <td className={classes} onClick={flipBoxesAroundMe} />
        
    )

}

export default Box;