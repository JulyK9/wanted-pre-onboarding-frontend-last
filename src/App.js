import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Todo from './pages/Todo';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

function App() {
  return (
    <MainContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </MainContainer>
  );
}

export default App;
