import { Route, Router } from 'react-router';
import { BrowserRouter, Link, Routes } from 'react-router-dom';
import './App.scss'
import ListingDetails from './components/HouseDetail/HouseDetails';
import HousesList from './components/HousesList/HousesList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Home from './components/Home/Home';



const App = () => {

  return (
    <BrowserRouter>
      <div className='header'>
        <div className='home-icon'>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </div>

        <h1 className="home-heading">Real estate radar</h1>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App
