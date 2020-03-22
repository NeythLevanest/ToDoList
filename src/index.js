import './styles.css';
import { Todo, TodoList} from './classes'
import { crearTodoHtml } from './js/componentes';

export const todoList =  new TodoList();
// todoList.todos.forEach(todo => crearTodoHtml(todo));
todoList.todos.forEach(crearTodoHtml); //solo funciona porque se pasa un solo argumento, 
                                       //el de arriba tambien funcion y es la forma tradicional

console.log(todoList);