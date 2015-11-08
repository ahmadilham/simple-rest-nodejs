/*jslint undef: true */
// TodoCollection Model
function TodoCollection(todos) {
    'use strict';
    this.todos = todos;
    this.remaining = 0;
    this.completed = 0;
}

TodoCollection.prototype.setRemaining = function () {
    'use strict';
    this.remaining = this.todos.filter(function (todo) {
                        return todo.done === false;
    }).length;
};

TodoCollection.prototype.setCompleted = function () {
    'use strict';
    this.completed = this.todos.filter(function (todo) {
        return todo.done === true;
    }).length;
};

module.exports = TodoCollection;