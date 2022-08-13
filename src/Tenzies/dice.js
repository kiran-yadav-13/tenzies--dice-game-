import React, {useState, useEffect} from "react"
import Dots from './dots'
export default function Dice(props){
    const styles={
        backgroundColor:props.isHeld ? "#59E391":"white",
       
    }

    const ElementArray=props.dots.map(dot=><Dots key={dot.id} name={dot.name} />)
    
    return(
        <div className="dice face" style={styles}  onClick={()=>props.holdDice(props.id)}>
             {/* <div className="dice" style={styles}  onClick={props.holdDice}> */}
             {/* <h2 className="dice--num"> {props.value}</h2>  */}
             {ElementArray}
        </div>
        

    )
}

// ()=>props.holdDice(props.id)
    