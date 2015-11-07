/*jslint undef: true */
// Create Todo Model
function Todo(id, name, description, done) {
    "use strict";
    this.id = id;
    this.name = name;
    this.description = description;    
    this.done = done;
}

module.exports = Todo;