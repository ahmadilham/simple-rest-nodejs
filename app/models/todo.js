/*jslint undef: true */
// Create Todo Model
function Todo(id, title, description, done) {
    "use strict";
    this.id = id;
    this.title = title;
    this.description = description;    
    this.done = done;
}

Todo.prototype.setId = function(id) {
    this.id = id;
}

Todo.prototype.setTitle = function(title) {
    this.title = title;
}

Todo.prototype.setDescription = function(description){
    this.description = description;
}

Todo.prototype.setDone = function(done){
    this.done = done;
}

Todo.prototype.isValid = function(){
    //title is mandatory
    if (this.title == null || this.title == ''){
        return false;
    }else if (this.done != true && this.done != false){
        return false;
    }
    return true;
}

module.exports = Todo;