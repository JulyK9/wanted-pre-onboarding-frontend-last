import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import TodoList from './pages/TodoList';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/todo" element={<TodoList />} />
    </Routes>
  );
}

export default App;
