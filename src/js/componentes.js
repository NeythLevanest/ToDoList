import { Todo } from "../classes";
import { todoList } from "../index";


//referencias en el html
const divTodoList = document.querySelector('.todo-list')
const txtInput    = document.querySelector('.new-todo')
const btnClear    = document.querySelector('.clear-completed');
const ulFilters     = document.querySelector('.filters');
const anchoFilters  = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo )=>{
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : '' }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
}

//Eventos

txtInput.addEventListener('keyup',( event )=>{
    if( event.keyCode === 13 && txtInput.value.length >0){
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value)
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';

        console.log(todoList);
    }
    
});

divTodoList.addEventListener('click', (event)=>{
    const nombreElemento = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');
     
    if (nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElement.classList.toggle('completed');
    } else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElement);
    }

});

btnClear.addEventListener('click', ()=>{
    todoList.borrarCompletados();
    for(let i = divTodoList.children.length-1; i>=0;i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFilters.addEventListener('click', (event) =>{

    const filtro = event.target.text;
    if(!filtro) {return;}

    anchoFilters.forEach(elem => elem.classList.remove('selected'));


    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed'); 
        event.target.classList.add('Selected');
        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                    }
                break;
        }
    }
})