import {Routes, BrowserRouter, Route} from 'react-router-dom';
import Board from "../components/board";
import Modal from '../components/modal';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Board />}>
          <Route path=':id' element={<Modal />} />
        </Route>
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;