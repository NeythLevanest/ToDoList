import { Todo } from "./todo.class";

export class TodoList{


    constructor(){
        //this. todos = [];
        this.loadLocalStorage();
    }

    nuevoTodo( todo ){
        this.todos.push(todo);
        this.saveInLocalStorage();
    }

    eliminarTodo( id ){
       this.todos = this.todos.filter(todo => todo.id != id)
       this.saveInLocalStorage();
    }

    marcarCompletado( id ){
        for(const todo of this.todos){
            
            if(todo.id == id){
            
                todo.completado = !todo.completado;
                this.saveInLocalStorage();
                break;
            }
        }
    }

    borrarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado);
        this.saveInLocalStorage();
    }
    saveInLocalStorage(){

        localStorage.setItem('todo',JSON.stringify( this.todos ));
    
    }
    loadLocalStorage(){
        
        this.todos = ( localStorage.getItem('todo') )
                   ? JSON.parse(localStorage.getItem('todo'))
                   : this.todos = [];

        this.todos = this.todos.map( Todo.fromJson );
    };
    
}