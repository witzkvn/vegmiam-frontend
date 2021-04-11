import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import './App.scss';
import CustomButton from './components/CustomButton/CustomButton';
import Navigation from './components/Navigation/Navigation';
import Searchbar from './components/Searchbar/Searchbar';
import HomePage from './pages/HomePage/HomePage';
import { setCurrentUserAction } from './redux/user/user-actions';
import { selectCurrentUser } from './redux/user/user-selectors';
import Routes from './Routes';

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)



  const handleLogin = () => {
    dispatch(setCurrentUserAction(true))
  }

  if (!currentUser) {
    return (
      <div className="App App-offline">
        <div className="App-offline__wrapper">
          <h1>Bienvenue sur Vegmiam !</h1>
          <p>Vegmiam est actuellement un réseau privé et fermé aux nouvelles inscriptions.<br />Merci de vous connecter pour accéder au contenu.</p>
          <CustomButton onClick={handleLogin} className="App-offline__wrapper--login" type="primary">Connexion</CustomButton>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <div className="App__left">
        <Navigation />
        {/* <button onClick={handleClick}>Test</button> */}
      </div>
      <div className="App__right">
        <Searchbar />

        <Routes />
        {/* <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch> */}

      </div>
    </div>
  );
}

export default App;
