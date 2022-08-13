import React,{useRef,useState, useEffect} from "react";
import Dices from "./dice"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import {FaClock} from 'react-icons/fa'

export default function Tenzies(){
   
    let dots=allNewDots();
    let id;
    const[dice, setDice]=React.useState(allNewDice())
     const [tenzies, setTenzies]=React.useState(true)
     
     const[time,setTime]=React.useState({
        min:0,
        sec:0
     })

     useEffect(()=>{
        if(tenzies){
            clearInterval(id)
            
           
         
        }
        else{
            id=setInterval(()=>{
                updateTime()
            },
          1000);
        }
       
      return ()=>clearInterval(id)
     },[tenzies] )
    
     function updateTime(){
        
        if(tenzies){
            clearInterval(id)

            return setTime({min:0, sec:0})
           
            }
            else{
                setTime(prevTime=>{
                    return prevTime.sec+1===60?
                     {min: prevTime.min+1, sec:0} :
                     {...prevTime, sec:prevTime.sec+1}
                    
                 })
             }
        
        // console.log("Time is ",time.min," min ",time.sec," sec")
     }
    function generateNewDots(num){
        // console.log("generate newdots called ")
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


    function allNewDots(){
        // console.log("allnewdots called ")
        const newDice=[]
        for(let i=0; i<7; i++){
            newDice.push(generateNewDots(i))
        }
        return newDice;
    }

     const[steps, setSteps]=React.useState(0)


    function generateNewDie(){
       const num=Math.ceil(Math.random()*6);
    let newdots=   dots.map(dot=>{
        return dot.name.includes(`dot-${num}`) ?
         {...dot, name: dot.name+" visible-dots"}:
            dot
         })
  
         return{
            randomNum:num,
            isHeld:false,
            id:nanoid(),
            dotsArray:newdots
           }

       }
       
    

    function allNewDice(){
        const newDice=[]
        for(let i=0; i<10; i++){
            newDice.push(generateNewDie() )
        }
        return newDice;
    }




 
 async function throwDice(){
     // creating animation effect (flipping 10 values on a single dice in 50 sec span)
     if(tenzies){
        setTime({
            min:0,
            sec:0
        })
     }
     setTenzies(false)
     setSteps(prevSteps=>prevSteps+1)
     
     for(let i=0; i<10; i++){
         RollDice()
         await sleep(70);
     }
 }
 function sleep(ms) {
     return new Promise((resolve) => setTimeout(resolve, ms));
   }

    function RollDice(){
        // console.log("RollDice called ")
        if(tenzies){
            setDice(allNewDice)
            setTenzies(false)
            setSteps(0)
        }
        else{
            console.log()
            setDice(oldDice=>oldDice.map(die=>{
                return die.isHeld===false ?
                generateNewDie():
                die
            })) 
           
            // console.log("dice value after being called ", dice)
             
        }
       
    }




    function holdDice(id){
    //    console.log("Hold die function being called")
       setDice(oldArray=>oldArray.map(die => {
        
        return die.id===id ?
        { ...die, isHeld:!die.isHeld }:
        die
        
       }) )
   
        }


   const ElementArray=dice.map(die=>(
    <Dices key={die.id} value={die.randomNum} isHeld={die.isHeld} id={die.id} holdDice={holdDice} dots={die.dotsArray} />

    // way 2 for passing the states and id so that it can't be derived state anymore
    // <Dices key={die.id} value={die.randomNum} isHeld={die.isHeld} id={die.id} holdDice={()=>holdDice(die.id)}/>
   ))

   React.useEffect(function(){
    const allHeld=dice.every(die =>die.isHeld);
    const diceVal=dice[0].randomNum;
    const allNumValue=dice.every(die=>die.randomNum===diceVal)
    if(allHeld && allNumValue){
        setTenzies(true)

        console.log("you won")
    }
    // let won=true
    // const diceVal=dice[0].randomNum;
    // for(let i=0; i<10; i++){
    //     if(!dice[i].isHeld || dice[i].randomNum!==diceVal ){
    //         won=false;
    //         break;
    //     }
    // }
    // if(won){
    //     setTenzies(true);
    //     console.log("you won")
    // }
   },[dice])



    return(
        <main className="mainContainer">
            <div className="box">
                <div>
                {tenzies && <Confetti />}
                <h1 className="title">Tenzies</h1>
                <h2 className="time"><FaClock />  {time.min}:{time.sec<10 ? '0'+time.sec :time.sec}</h2>
                </div>
              
                {tenzies && <h2 className="win">You took {steps} Rolls and {time.min}:{time.sec<10 ? '0'+time.sec :time.sec} mins to complete the game</h2>}
                <p className="instructions">Roll untill all dice are same. click each die to freeze it and its current value between rolls.</p>
             <div className="grid-container">
               {/* <Dice value="1"/>
               <Dice value="2"/>
               <Dice value="3" />
               <Dice value="4" />
               <Dice value="5"/>
               <Dice value="6"/>
               <Dice value="1"/>
               <Dice value="2"/>
               <Dice value="4"/>
               <Dice value="3"/>
    */}
                {ElementArray}
            
                </div> 
                <button className="roll" onClick={throwDice}>{tenzies ? "New Game":"Roll"}</button>
              
            </div>
        </main>
    )
}
