/*jslint undef: true */
// Todo Model
function Todo(id, title, description, done) {
    'use strict';
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = done;
}

Todo.prototype.setDone = function (done) {
    'use strict';
    this.done = done;
};

Todo.prototype.isValid = function () {
    'use strict';
    //title is mandatory
    if (this.title === null || this.title === '' || this.title === undefined) {
        return false;
    } else if (this.done !== true && this.done !== false) {
        return false;
    }
    return true;
};

module.exports = Todo;