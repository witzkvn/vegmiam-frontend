import { useSelector } from 'react-redux';
import './App.scss';
import Navigation from './components/Navigation/Navigation';
import Searchbar from './components/Searchbar/Searchbar';
import { selectCurrentUser } from './redux/user/user-selectors';
import Routes from './routes/Routes';
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Login from './components/Login/Login';
import NotificationPoper from './components/NotificationPoper/NotificationPoper';
import { selectOverlayMessageOpen } from './redux/layout/layout-selectors';
import UserAvatar from './components/UserAvatar/UserAvatar';

const App = () => {
  const currentUser = useSelector(selectCurrentUser)
  const overlayOpen = useSelector(selectOverlayMessageOpen)
  const [navOpen, setNavOpen] = useState(false)

  if (!currentUser) {
    return (
      <div className="App App-offline">
        <div className="App-offline__wrapper">
          <h1>Bienvenue sur Vegmiam !</h1>
          <p>Vegmiam est actuellement un réseau privé et fermé aux nouvelles inscriptions.<br />Merci de vous connecter pour accéder au contenu.</p>
          <Login />
        </div>
      </div>
    )
  }


  return (
    <div className="App">
      <NotificationPoper />
      <div className={`App__left ${navOpen ? "active" : ""}`} onClick={() => setNavOpen(false)} >
        <Navigation setNavOpen={setNavOpen} />
      </div>
      <div className="App__right">
        {!overlayOpen && (
          <>
            <div className="App__right--fixed">
              <div className="App__right--top">
                <div className="App__right--menu" onClick={() => setNavOpen(true)}>
                  <IoMenu />
                </div>
                <NavLink exact to="/">
                  <h1>Vegmiam</h1>
                </NavLink>
                <Searchbar />
                <UserAvatar imgSrc={currentUser?.avatar} toAccount={true} />
              </div>
            </div>
          </>
        )
        }
        <Routes />
      </div>
    </div>
  );
}

export default App;
