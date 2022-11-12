import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useContextStore, actions } from '@/context';

function LeanReactContext() {
    const [state, dispatch] = useContextStore();
    const refInput = useRef(null);

    const handleAdd = () => {
        dispatch(
            actions.addTodo({
                id: uuidv4(),
                name: state.todoInput,
            }),
        );
        dispatch(actions.cleaInput());
        refInput.current.focus();
    };

    const handleDele = (id) => {
        dispatch(actions.deleteIodo(id));
    };

    return (
        <div>
            <input
                value={state.todoInput}
                onChange={(e) => dispatch(actions.setTodoInput(e.target.value))}
                ref={refInput}
            />
            <button onClick={handleAdd}>Add</button>
            <ul>
                {state.todos &&
                    state.todos.length > 0 &&
                    state.todos.map((todo) => {
                        return (
                            <li key={todo.id}>
                                {todo.name}
                                <span onClick={() => handleDele(todo.id)}>x</span>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default LeanReactContext;
