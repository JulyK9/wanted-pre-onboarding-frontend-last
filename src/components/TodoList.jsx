import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TodoItem = styled.div`
  margin-bottom: 0.5rem;
  padding: 0.9rem 1rem;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 3px;

  &:hover {
    background-color: #fafafa;
    transform: scale(1.02);
  }
`;

const TodoCheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
`;

const TodoCheckbox = styled.input`
  appearance: none;
  /* display: none; */
  width: 1.3rem;
  height: 1.3rem;
  border: 1.3px solid lightgrey;
  border-radius: 3px;
  margin-right: 0.5rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: lightsteelblue;
  }
`;

const ModifyInput = styled.input`
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem; */
  button {
    margin-right: 0.5rem;
    min-width: 3rem;
    border-radius: 3px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-size: 0.9rem;

    &:first-child {
      &:hover {
        background-color: #e9f8fe;
      }
    }
    &:last-child {
      &:hover {
        background-color: #ffecea;
      }
    }
  }
`;

const TodoList = ({
  todos,
  editItem,
  setEditItem,
  handleCompleted,
  handleDelete,
  handleUpdate,
}) => {
  return (
    <MainContainer>
      <h3>해야할 일 목록이에요</h3>
      <ul>
        {todos?.map((todo) => (
          <TodoItem key={todo.id}>
            <TodoCheckBoxLabel id={todo.id}>
              <TodoCheckbox
                type="checkbox"
                htmlFor={todo.id}
                checked={todo.isCompleted}
                onChange={() => handleCompleted(todo)}
              />
              {editItem && editItem.id === todo.id ? (
                <div>
                  <ModifyInput
                    data-testid="modify-input"
                    type="text"
                    value={editItem.todo}
                    onChange={(e) =>
                      setEditItem({ ...editItem, todo: e.target.value })
                    }
                  />
                </div>
              ) : (
                <span>{todo.todo}</span>
              )}
            </TodoCheckBoxLabel>
            {editItem && editItem.id === todo.id ? (
              <ButtonGroup>
                <button
                  data-testid="submit-button"
                  onClick={() => handleUpdate(todo)}
                >
                  제출
                </button>
                <button
                  data-testid="cancel-button"
                  onClick={() => setEditItem(false)}
                >
                  취소
                </button>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                <button
                  data-testid="modify-button"
                  onClick={() => setEditItem(todo)}
                >
                  수정
                </button>
                <button
                  data-testid="delete-button"
                  onClick={() => handleDelete(todo)}
                >
                  삭제
                </button>
              </ButtonGroup>
            )}
          </TodoItem>
        ))}
      </ul>
    </MainContainer>
  );
};

export default TodoList;
