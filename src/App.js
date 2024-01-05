import './App.css';
import { Routes, Route} from 'react-router-dom';
import ListNotes from './routes/ListNotes';
import Note from './routes/Note';
import Bin from './routes/Bin';
import Page404 from './routes/404';
import Login from './routes/Login';
import Authorize from './routes/Authorize';
import SharedNotes from './routes/Shared';
import Page400 from './routes/400';
import Page403 from './routes/403';
import Page500 from './routes/500';

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
        <Route path="/400" element={<Page400 />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="/403" element={<Page403 />} />
        <Route path="/500" element={<Page500 />} />
      </Routes>
    </div>
  );
}

export default App;
