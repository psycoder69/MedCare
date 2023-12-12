import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Footer from "./components/Footer";
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Toaster />

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Login /> } />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;