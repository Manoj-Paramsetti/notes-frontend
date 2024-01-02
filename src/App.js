import './App.css';
import { Routes, Route} from 'react-router-dom';
import ListNotes from './routes/ListNotes';
import Note from './routes/Note';
import Bin from './routes/Bin';
import Page404 from './routes/404';
import Login from './routes/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListNotes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/note/:id" element={<Note />} />
        <Route path="/bin" element={<Bin />} />
        <Route path="/404" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
