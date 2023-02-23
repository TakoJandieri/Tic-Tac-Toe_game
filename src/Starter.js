import './Starter.css';
import logo from './assets/logo.svg';
import pickX from './assets/icon-x.svg';
import pickO from './assets/icon-o.svg';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';


function GameStart() {

    const navigate = useNavigate();
        
    const twoPlayers = () => {
        navigate('player1VSplayer2');
    }

    const onePlayer = () => {
        if(chooseX){
            navigate('playerVScpu');
        }else{
            
            navigate('playerVScpuX', {
                state: {

                    picked: chooseX
                }
            });
        }
    }
    
    const [chooseX, setChooseX] = useState(false);
    
    const PickedX = () => {
        
        setChooseX(true);
    }

    const PickedO = () => {

        setChooseX(false);  
    }

    return (
        <>
            <div  className='container'>
                <img src={logo} className="App-logo" alt="logo" />

                <div className='page1'>
                    <h1>PICK PLAYER 1’S MARK</h1>

                    <div className='picker'>
                        <button onClick={PickedX} 
                        
                        className='buttonX' style={{ backgroundColor: chooseX ? "#A8BFC9" : "#1A2A33" }}>
                            
                            <img style={{ filter: chooseX ? "brightness(25%)" : "grayscale(100%) brightness(150%)" }} className='X' src={pickX} alt="X"/>
                        
                        </button>

                        <button onClick={PickedO}
                        
                        className='buttonO' style={{ backgroundColor: chooseX ? "#1A2A33" : "#A8BFC9" }}>
                            
                            <img style={{ filter: chooseX ? "grayscale(100%) brightness(150%)" : "brightness(20%)" }} className='O' src={pickO} alt="O"/>
                            
                        </button>  
                        
                    </div>

                    <p>REMEMBER : X GOES FIRST</p>

                </div>


                <div className='VS'>
                    <button className='vscpu' onClick = {onePlayer}>NEW GAME (VS CPU)</button>
                    <button className='vsplayer' onClick={twoPlayers} >NEW GAME  (VS PLAYER)</button>
                </div>
            
            </div>
        </> 
    );


}

export default GameStart;

