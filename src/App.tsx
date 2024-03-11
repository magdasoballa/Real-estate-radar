import { Route } from 'react-router';
import { BrowserRouter, Routes } from 'react-router-dom';
import './App.scss'
import ListingDetails from './components/HouseDetail/HouseDetails';
import Home from './components/Home/Home';
import BaseLayout from './layouts/BaseLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetails />} />

        </Route>


      </Routes>

    </BrowserRouter>

  );
}

export default App
