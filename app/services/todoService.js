var TodoRepository = require('./../repositories/todoRepository')
    , Todo = require('./../models/todo')
    , TodoCollection = require('./../models/todoCollection');

/**
* Todo Service
*/
function TodoService() {
    this.todoRepository = new TodoRepository();
}

/**
* Get Todo by Id
* param : todo id
*/

TodoService.prototype.get = function (id) {
    var todo = this.todoRepository.todos.filter(function(item) {
        return item.id == id;
    })[0];
    
    if (todo == null) {
        throw new Error('todo not found');
    }
    
    return todo;
};

/**
* Get All todo
*/
TodoService.prototype.getAll = function(){    
    var todoCollection = new TodoCollection(this.todoRepository.todos);
    todoCollection.completed = todoCollection.getTodosCompleted();
    todoCollection.remaining = todoCollection.getTodosRemaining();
    return todoCollection;
}

/**
* Create todo
* param : todo
*/
TodoService.prototype.create = function(todo){
    //title is mandatory
    if (todo.title == null || todo.title == ''){        
        throw new Error('todo name is mandatory field');
    }
    return this.todoRepository.save(new Todo(null,todo.title,todo.description || '',todo.done || false));
}

/**
* Update todo
* param : todo
*/
TodoService.prototype.update = function(todo){    
    var persistedTodo = this.get(todo.id);
    if (persistedTodo == null){
        throw new Error('invalid todo id');
    }    
    return this.todoRepository.save(new Todo(persistedTodo.id, todo.title || persistedTodo.title,todo.description || persistedTodo.description,todo.done || persistedTodo.done));
}

/**
* Delete Todo
* param : todo
*/
TodoService.prototype.delete = function(id){  
    var persistedTodo = this.get(id);
    if (persistedTodo == null){
        throw new Error('invalid todo id');
    }    
    return this.todoRepository.remove(id);
}

module.exports = TodoService;