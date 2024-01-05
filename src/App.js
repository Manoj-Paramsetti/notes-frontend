import './App.css';
import { Routes, Route} from 'react-router-dom';
import ListNotes from './routes/ListNotes';
import Note from './routes/Note';
import Bin from './routes/Bin';
import Page404 from './routes/404';
import Login from './routes/Login';
import Authorize from './routes/Authorize';
import SharedNotes from './routes/Shared';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListNotes />} />
        <Route path="/bitbucket/authorize" element={<Authorize />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shared" element={<SharedNotes />} />
        <Route path="/note/:id" element={<Note />} />
        <Route path="/bin" element={<Bin />} />
        <Route path="/404" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
