/*jslint undef: true */
// TodoCollection Model
function TodoCollection(todos) {
    'use strict';
    this.todos = todos;
}

TodoCollection.prototype.getTodosCompleted = function () {
    'use strict';
    return this.todos.filter(function (todo) {
        return todo.done === true;
    }).length;
};

TodoCollection.prototype.getTodosRemaining = function () {
    'use strict';
    return this.todos.filter(function (todo) {
        return todo.done === false;
    }).length;
};

module.exports = TodoCollection;