import { useState, useReducer, useEffect, useRef } from "react";
import "./GameTest.css";
import logo from "./assets/logo.svg";
import pickX from "./assets/icon-x.svg";
import pickO from "./assets/icon-o.svg";
import restart from "./assets/icon-restart.svg";
import { useNavigate } from "react-router-dom";

const initialState = {xcount: 0, tie: 0, lose: 0};
// const initialMove = {nextSquares: Array(9).fill(null)};

function VsCpu() {
  const [x, setX] = useState(true);

  const [squares, setSquares] = useState(Array(9).fill(null));

  let ref = useRef(0);

  

  const navigateToStarter = useNavigate();
  const handleQuitClick = () => {
    navigateToStarter('/');
  }


  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
       
      return;
    }

    const nextSquares = squares.slice();
    const playerTurn = squares.filter(square => square !== null).length % 2 === 0;

    if (playerTurn) {
      nextSquares[i] = xObj;
    }

    setSquares(nextSquares);
    
   
    ref.current = ref.current + 1;
  }
  
  
  
useEffect (() => {
  const cpuTurn = squares.filter(square => square !== null).length % 2 === 1;

  

  if (cpuTurn && !calculateWinner(squares)) {
    const emptyIndexes = squares.map((square, index) => square === null ? index : null).filter(val => val !== null);
    const randomIndex = emptyIndexes[ Math.ceil(Math.random()*emptyIndexes.length)];
    const putCpuAt = index => {
      let nextSquares = squares.slice();
      nextSquares[index] = oObj;
      setSquares(nextSquares);
    };
  
    putCpuAt(randomIndex);
    
  }

  
}, [squares]);
  
  console.log('meramdene daweraa: ', ref.current);

  const winner = calculateWinner(squares);

  const xObj = <img className="symbol" style={{width: '40px', filter: ''}} key="123" src={pickX} alt="X" />
  

  const oObj =  <img className="symbol" style={{width: '40px'}} key="456" src={pickO} alt="O" />
  

  //Gamarjvebulis dasaxeleba >> Amushavda esec :D
  
  let status;

  if (winner) {
    status = winner;
  }

 
  // shemdegi simbolo rac unda daiweros tavze visi svlaa
  let nextTurn;
  if (squares.filter(square => square !== null).length % 2 === 0) {
    nextTurn = <img className="xsymbol" key="123" src={pickX} alt="X" />;
  } else {
    nextTurn = <img className="xsymbol" key="456" src={pickO} alt="O" />;
  }

  //Tamashis darestarteba >> Amushavda :D

  function Restart() {
    setX(true);
    setSquares(Array(9).fill(null));
    console.log("Game Restarted");
  }

    function Result({nextRoundClick}) {
        if (winner){
            return <div className="result">

                        {/* <div>{(winner)?
                            <p className="won">YOU WON!</p> : null}
                        </div> */}

                        <div className="statusBar1">

                            {status}{(winner)?
                                <p className="Takes" style = {{color: nextTurn==='123'? '#F2B137' : "#31C3BD"}}>Takes The Round</p> : null}
                        </div>
                        
                        <div className="statusButtonBar">
                            <div>{(winner)?
                                <button onClick={handleQuitClick} className="quit">QUIT</button> : null}
                            </div>

                            <div>{(winner)?
                                <button className="next" onClick={nextRoundClick}>NEXT ROUND</button> : null}
                            </div>
                        </div>
                    </div>
        }else {

          if (ref.current === 5){
            return <div className="result">


                    <div className="statusBar1">
                        
                            <p className="tiewinner">ROUND TIED</p>
                    </div>
                    
                    <div className="statusButtonBar">
                        <div>
                            <button onClick={handleQuitClick} className="quit">QUIT</button>
                        </div>

                        <div>
                            <button className="next" onClick={nextRoundClick}>NEXT ROUND</button>
                        </div>
                    </div>
                </div>
          }
          
        }
    }

     
   
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleDispatch (){
    if(winner){
      if (squares.filter(square => square !== null).length % 2 === 1){
        dispatch({type: 'increment_xcount'});
      }else if (squares.filter(square => square !== null).length % 2 === 0){
        dispatch({type: 'increment_lose'})
      }
    }else if (!winner && ref.current === 5){
      dispatch({type: 'increment_tie'})
    }
    
    setSquares(Array(9).fill(null));
    ref.current = 0;
  }

  useEffect(() => {
    setX(true);
  },[state]);

  function reducer(state, action){
    
    switch(action.type){
      case "increment_xcount": {
          
        return {...state,

          xcount: state.xcount +1
        };
        
      }
      case 'increment_lose':{
        return {...state,
          lose: state.lose +1
        }
      }

      case 'increment_tie':{
        return {...state,
          tie: state.tie +1
        }
      }
        default: return;
    }
  
  }

    return (
      <>
        <div className="GameContainer">
            <div className="GameListener">
                <img onClick={handleQuitClick} className="logo" src={logo} alt="logo" />

                <div className="nextTurn">{nextTurn}  Turn</div>

                <button className="restart" onClick={Restart}>
                    <img src={restart} alt="restartIcon" />
                </button>
            </div>

            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>

            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>

            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>

            <Result nextRoundClick={handleDispatch}/>
           
            
            <div 
            style={{
                display: 'flex',
                justifyContent: 'space-between'
                }}>
                <div className="xwinner">X (YOU) <br/>{state.xcount}</div>
                <div className="tie">TIES <br/>{state.tie}</div>
                <div className="owinner">O (CPU) <br/>{state.lose}</div>
            </div>

              
        </div>

      </>
    );
}

export default VsCpu;


function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick} >
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a]?.key && squares[a]?.key === squares[b]?.key && squares[a]?.key === squares[c]?.key) {
     
        if(squares[a]?.key === '123'){
            return <div><img className="resultWinner" key="123" src={pickX} alt="X" /></div>;
        }else if(squares[a]?.key === '456'){
            return <div><img className="resultWinner" key="456" src={pickO} alt="O" /></div>;
        }
    }
  }
  return null;
  
}


