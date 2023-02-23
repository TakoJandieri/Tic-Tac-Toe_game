
import './App.css';
import Starter from './Starter';
import Board from './GameTest';
import { Route, Routes } from 'react-router-dom';
import VsCpu from './VsCpu';
import VsCpuX from './VsCpuX';


function App() {
  return (
    <div className="App">
      <header className="App-header">
     
     <Routes>
      <Route path='/' element={<Starter/>}/>
      <Route path='player1VSplayer2' element = {<Board/>}/>
      <Route path='playerVScpu' element = {<VsCpu/>}/>
      <Route path='playerVScpuX' element = {<VsCpuX/>}/>
     </Routes>
      
      </header>
    </div>
  );
}

export default App;
