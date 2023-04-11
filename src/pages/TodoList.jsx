import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/signin');
    }
  });

  return <div>TodoList</div>;
};

export default TodoList;
