import './App.css';
import MainTableContainer from './Components/MainTableContainer';
import NavigationMainPage from './Components/Navigation/NavigationMainPage';
function App() {
    return (
        <div className="App">
            <NavigationMainPage TitleName="회의실 예약"></NavigationMainPage>
            <MainTableContainer></MainTableContainer>
        </div>
    );
}

export default App;
