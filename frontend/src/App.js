import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import User from './User';
import UpdateUser from './UpdateUser';
import CreateUser from './CreateUser';

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<User />}></Route>
            <Route path='/update/:id' element={<UpdateUser/>}></Route>
            <Route path="/create" element={<CreateUser/>}></Route>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
