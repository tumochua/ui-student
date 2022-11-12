import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { addTodo, deleteTodo } from '../../store/actions/todoActions';

function LeanRedux({ todos, addTodo, deleteTodo }) {
    const [todo, setTodo] = useState('');

    const handeAdd = (e) => {
        e.preventDefault();
        const todos = {
            id: uuidv4(),
            title: todo,
            completed: false,
        };
        addTodo(todos);
    };

    const handeDelete = (id) => {
        deleteTodo(id);
    };

    useEffect(() => {}, []);

    return (
        <div>
            <form onSubmit={handeAdd}>
                <input value={todo} onChange={(e) => setTodo(e.target.value)} />
                <input type="submit" value="create" />
            </form>
            <ul>
                {todos &&
                    todos.map((todo) => {
                        return (
                            <div key={todo.id}>
                                <li>{todo.title}</li>
                                <button onClick={() => handeDelete(todo.id)}>Delete</button>
                            </div>
                        );
                    })}
            </ul>
        </div>
    );
}
const mapStateToProps = (state) => ({
    todos: state.myTodos.todos,
});
export default connect(mapStateToProps, { addTodo, deleteTodo })(LeanRedux);
