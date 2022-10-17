import './App.css';
import MainTableContainer from './Components/MainTableContainer';
import NavigationMainPage from './Components/Navigation/NavigationMainPage';
function App() {
    return (
        <div className="App">
            <NavigationMainPage></NavigationMainPage>
            <MainTableContainer></MainTableContainer>
            {/* <Te></Te> */}
        </div>
    );
}

export default App;
