import './App.css';
import { Routes, Route} from 'react-router-dom';
import ListNotes from './routes/ListNotes.jsx';
import Note from './routes/Note.jsx';
import Bin from './routes/Bin.jsx';
import Login from './routes/Login.jsx';
import Authorize from './routes/Authorize.jsx';
import SharedNotes from './routes/Shared.jsx';
import Page400 from './routes/400.jsx';
import Page403 from './routes/403.jsx';
import Page404 from './routes/404.jsx';
import Page500 from './routes/500.jsx';

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
