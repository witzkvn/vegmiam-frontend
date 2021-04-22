import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import CustomButton from './components/CustomButton/CustomButton';
import Navigation from './components/Navigation/Navigation';
import Searchbar from './components/Searchbar/Searchbar';
import { setCurrentUserAction } from './redux/user/user-actions';
import { selectCurrentUser } from './redux/user/user-selectors';
import Routes from './routes/Routes';
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Login from './components/Login/Login';



const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const [navOpen, setNavOpen] = useState(false)

  // const handleLogin = () => {
  //   dispatch(setCurrentUserAction(true))
  // }

  if (!currentUser) {
    return (
      <div className="App App-offline">
        <div className="App-offline__wrapper">
          <h1>Bienvenue sur Vegmiam !</h1>
          <p>Vegmiam est actuellement un réseau privé et fermé aux nouvelles inscriptions.<br />Merci de vous connecter pour accéder au contenu.</p>
          <Login />
          {/* <CustomButton onClick={handleLogin} className="App-offline__wrapper--login" type="primary">Connexion</CustomButton> */}
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <div className={`App__left ${navOpen ? "active" : ""}`} onClick={() => setNavOpen(false)} >
        <Navigation setNavOpen={setNavOpen} />
      </div>
      <div className="App__right">
        <div className="App__right--top">
          <div className="App__right--menu" onClick={() => setNavOpen(true)}>
            <IoMenu />
          </div>
          <NavLink exact to="/">
            <h1>Vegmiam</h1>
          </NavLink>
          <Searchbar />
        </div>

        <Routes />


      </div>
    </div>
  );
}

export default App;
