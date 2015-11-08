/*jslint undef: true */
var TodoRepository = require('./../repositories/todoRepository'), Todo = require('./../models/todo'), TodoCollection = require('./../models/todoCollection');

/**
* Todo Service
*/
function TodoService() {
    'use strict';
    this.todoRepository = new TodoRepository();
}

/**
* Get Todo by Id
* param : todo id
*/

TodoService.prototype.get = function (id) {
    'use strict';
    var todo = this.todoRepository.todos.filter(function (item) {
        return item.id == id;
    })[0];
    
    if (todo === null || todo === undefined) {
        throw new Error('todo not found');
    }
    
    return todo;
};

/**
* Get All todo
*/
TodoService.prototype.getAll = function () {
    'use strict';
    return new TodoCollection(this.todoRepository.todos);
};

/**
* Create todo
* param : todo
*/
TodoService.prototype.create = function (todo) {
    'use strict';
    var todoObj = new Todo(null, todo.title, todo.description || '', todo.done || false);
    if (todoObj.isValid()) {
        return this.todoRepository.save(todoObj);
    } else {
        throw new Error('invalid todo');
    }
};

/**
* Update todo
* param : todo
*/
TodoService.prototype.update = function (todo) {
    'use strict';
    var persistedTodo = this.get(todo.id),
        todoObj = new Todo(persistedTodo.id, todo.title || persistedTodo.title, todo.description || persistedTodo.description, (todo.done === null || todo.done === undefined ? persistedTodo.done : todo.done));
    if (todoObj.isValid()) {
        return this.todoRepository.save(todoObj);
    } else {
        throw new Error('invalid todo');
    }
};

/**
* Delete Todo
* param : todo id
*/
TodoService.prototype.remove = function (id) {
    'use strict';
    var persistedTodo = this.get(id);
    return this.todoRepository.remove(id);
};

module.exports = TodoService;