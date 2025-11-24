import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import User from './User';

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<User />}></Route>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
