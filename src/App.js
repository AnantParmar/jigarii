import './CSS/App.css';
import AddQuote from './Elements/AddQuote';
import Home from './Elements/Home';
import Login from './Elements/Login';
import Navbar from './Elements/Navbar';
import Signup from './Elements/Signup';
import QuoteState from './context/quotes/QuoteState';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (

    <div className='mainDiv'>
      <QuoteState>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="addQuote" element={<AddQuote />} />
          </Routes>
        </BrowserRouter>
        {/* <Home/> */}
      </QuoteState>
    </div>
  );
}

export default App;
