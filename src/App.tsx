import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import Admin from './views/Admin';
import Home from './views/Home';
import About from './views/About';
import Portfolio from './views/Portfolio';
import Contact from './views/Contact';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/admin" element={<Admin />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>            
    </HelmetProvider>
  );
}

export default App;