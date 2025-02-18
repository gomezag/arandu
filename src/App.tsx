import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import Admin from './views/Admin';
import Home from './views/Home';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={ <Home /> } />
        </Routes>
      </Router>            
    </HelmetProvider>
  );
}

export default App;