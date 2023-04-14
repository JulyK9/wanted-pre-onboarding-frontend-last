import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/const';

import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

import styled from 'styled-components';

const MainTodoContainer = styled.div`
  width: 80%;
  min-width: 30rem;
  margin-top: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Todo = () => {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/signin');
      return;
    }

    async function getTodo() {
      const response = await fetch(`${BASE_URL}/todos`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const todoData = await response.json();

      if (response.ok) {
        setTodos(todoData);
      }

      if (!response.ok) {
        throw new Error(
          todoData.message || '할일 목록을 정상적으로 가져오지 못했습니다.'
        );
      }
    }
    getTodo();
  }, [todoText, navigate]);

  const todoSubmitHandler = async (e) => {
    e.preventDefault();

    if (todoText === '') {
      alert('할 일을 작성해주세요');
      return;
    }

    const accessToken = localStorage.getItem('accessToken');

    const reqBody = {
      todo: todoText,
    };

    const response = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reqBody),
    });

    const responseData = await response.json();

    if (response.ok) {
      setTodoText('');
    }

    if (!response.ok) {
      throw new Error(
        responseData.message || '요청을 정상적으로 수행하지 못했습니다.'
      );
    }
  };

  const handleUpdate = async (todoItem) => {
    const accessToken = localStorage.getItem('accessToken');

    const body = {
      ...todoItem,
      todo: editItem?.todo,
    };

    const response = await fetch(`${BASE_URL}/todos/${todoItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();

    if (response.ok) {
      const updatedTodoList = todos?.map((todo) => {
        if (todo.id === todoItem.id) {
          return responseData;
        }
        return todo;
      });

      setTodos(updatedTodoList);
      setEditItem(null);
    }

    if (!response.ok) {
      throw new Error(
        response.message || '업데이트가 정상적으로 수행되지 못했습니다.'
      );
    }
  };

  const handleCompleted = async (todoItem) => {
    const updatedItem = {
      ...todoItem,
      isCompleted: !todoItem.isCompleted,
    };

    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${BASE_URL}/todos/${todoItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedItem),
    });

    const responseData = await response.json();

    if (response.ok) {
      const updatedTodoList = todos.map((todo) => {
        if (todo.id === todoItem.id) {
          return responseData;
        }
        return todo;
      });
      setTodos(updatedTodoList);
    }

    if (!response.ok) {
      throw new Error(
        response.message || '정상적으로 업데이트를 수행하지 못했습니다.'
      );
    }
  };

  const handleDelete = async (todoItem) => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`${BASE_URL}/todos/${todoItem.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const updatedTodoList = todos.filter((todo) => {
        return todo.id !== todoItem.id;
      });
      setTodos(updatedTodoList);
    }

    if (!response.ok) {
      throw new Error(
        response.message || '정상적으로 삭제를 수행하지 못했습니다.'
      );
    }
  };

  return (
    <MainTodoContainer>
      <AddTodo
        todoText={todoText}
        setTodoText={setTodoText}
        todoSubmitHandler={todoSubmitHandler}
      />
      <TodoList
        todos={todos}
        handleCompleted={handleCompleted}
        editItem={editItem}
        setEditItem={setEditItem}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </MainTodoContainer>
  );
};

export default Todo;
