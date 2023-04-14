import styled from 'styled-components';

const FromContainer = styled.form`
  /* background-color: lightgreen; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;

  h3 {
    font-size: 1.5rem;
  }
`;

const AddTodoItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  margin: 0.5rem;

  input {
    flex: 6;
    padding: 0.5rem 0.8rem;
    border-radius: 5px;
    font-size: 1rem;
  }

  button {
    flex: 1;
    min-width: 5rem;
    background-color: lightsteelblue;
    border-radius: 5px;
    font-size: 1rem;

    &:hover {
      background-color: lightblue;
    }

    &:active {
      background-color: #8fdaf3;
    }
  }
`;

const AddTodo = ({ todoText, setTodoText, todoSubmitHandler }) => {
  return (
    <FromContainer onSubmit={todoSubmitHandler}>
      <h3>새로운 Todo를 추가해보세요</h3>
      <AddTodoItemWrapper>
        <input
          data-testid="new-todo-input"
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button data-testid="new-todo-add-button">추가</button>
      </AddTodoItemWrapper>
    </FromContainer>
  );
};

export default AddTodo;
