import { useSelector } from 'react-redux';
import './App.scss';
import Navigation from './components/Navigation/Navigation';
import Searchbar from './components/Searchbar/Searchbar';
import { selectCurrentUser } from './redux/user/user-selectors';
import Routes from './routes/Routes';
import { IoMenu, IoFilter } from "react-icons/io5";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Login from './components/Login/Login';
import NotificationPoper from './components/NotificationPoper/NotificationPoper';
import { selectOverlayMessageOpen } from './redux/layout/layout-selectors';
import SearchFilters from './components/SearchFilters/SearchFilters';
import { useEffect } from 'react';

const App = () => {
  const currentUser = useSelector(selectCurrentUser)
  const overlayOpen = useSelector(selectOverlayMessageOpen)
  const [navOpen, setNavOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [search, setSearch] = useState();
  const [newSearchState, setNewSearchState] = useState({
    searchWords: search,
    searchDifficulty: [],
    searchDuration: [],
    searchOrder: "recent",
    searchCategory: [],
    searchPage: 1,
  });

  const onClose = (e) => {
    e.stopPropagation();
    setFiltersOpen(false)
  }

  const focusSearch = (e) => {
    e.stopPropagation();
    setFiltersOpen(true)
  }

  const getFilters = (filters) => {
    setNewSearchState({
      searchWords: search,
      searchDifficulty: filters.searchDifficulty,
      searchDuration: filters.searchDuration,
      searchCategory: filters.searchCategory,
      searchOrder: "recent",
      searchPage: 1,
    })
  }

  const launchSearch = () => {
    console.log(search)
  }

  useEffect(() => {
    console.log(newSearchState);
  }, [newSearchState]);


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
                <Searchbar setSearch={setSearch} search={search} focusSearch={focusSearch} />
              </div>
            </div>
            {filtersOpen && <SearchFilters onClose={onClose} getFilters={getFilters} />}
          </>
        )
        }

        <Routes />


      </div>
    </div>
  );
}

export default App;
