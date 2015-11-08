/*jslint undef: true */
// TodoCollection Model
function TodoCollection(todos) {
    'use strict';
    this.todos = todos;
    this.remaining = todos.filter(function (todo) {
        return todo.done === false;
    }).length;
    this.completed = todos.filter(function (todo) {
        return todo.done === true;
    }).length;
}

module.exports = TodoCollection;