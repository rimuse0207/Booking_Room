import axios from 'axios';
import './App.css';
import MainTableContainer from './Components/MainTableContainer';
import NavigationMainPage from './Components/Navigation/NavigationMainPage';
import { useEffect } from 'react';
function App() {
    return (
        <div className="App">
            <NavigationMainPage TitleName="회의실 예약"></NavigationMainPage>
            <MainTableContainer></MainTableContainer>
        </div>
    );
}

export default App;
