import React,{useState, useEffect} from "react";
import {nanoid} from "nanoid"
import Dots from './dots'

export default function MultiDices (){
    const[dots, setDots]=React.useState(allNewDots())
    console.log(dots)
    function generateNewDots(num){
       switch(num){
        case 0: return{id:num, name:"dots top-left dot-2 dot-3 dot-4 dot-5 dot-6"} 
        case 1: return{id:num, name:"dots middle-left dot-6"}
        case 2: return{id:num, name:"dots bottom-left dot-4 dot-5 dot-6"}
        case 3: return{id:num, name:"dots center dot-1 dot-3 dot-5"}
        case 4: return{id:num, name:"dots top-right dot-4 dot-5 dot-6"}
        case 5: return{id:num, name:"dots middle-right dot-6"}
        case 6: return{id:num, name:"dots bottom-right dot-2 dot-3 dot-4 dot-5 dot-6"}
       }
    }
    const ElementArray=dots.map(dot=><Dots key={dot.id} name={dot.name} />)
    function allNewDots(){
        console.log("all new dots called")
        const newDice=[]
        for(let i=0; i<7; i++){
            newDice.push(generateNewDots(i))
        }
        return newDice;
    }
    function clearDotsValues(){
        console.log("cleardots called")
        setDots(prevDots=>prevDots.map(dot=>{
            return dot.name.includes("visible-dots") ?
            {...dot, name:dot.name.replace(" visible-dots"," ")}:
            dot
        }))
    }
    function RollDots(){
        console.log("rolldots called")
        const num=Math.ceil(Math.random()*6);
        console.log("Random num  ",num)
      
       
        clearDotsValues()

        setDots(prevDots=>prevDots.map(dot=>{
                        return dot.name.includes(`dot-${num}`) ?
                        {...dot, name: `${dot.name} visible-dots`}:
                           dot
                        
                    }))
       
    }

async function throwDice(){
   
    for(let i=0; i<10; i++){
        RollDots()
        await sleep(50);
    }
}
function sleep(ms) {
    console.log("sleep called")
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
   
    return(
        <>
        <div className="face"  >
            {ElementArray}
    </div> 
    <button className="roll" onClick={RollDots}>Roll the dice</button>
    </>
    )
}
 