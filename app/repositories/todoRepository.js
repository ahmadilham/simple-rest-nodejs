// Todo Repository

function TodoRepository() {    
    this.todos = [];
    this.nextId = 1;
}

/**
* Find Index of the todo
* Param: todo id
*/
TodoRepository.prototype.findIndex = function (id) {
    var index = null;
    this.todos.forEach(function(item, key) {
        if (item.id == id) {
            index = key;
        }
    });
    
    return index;
}
/**
 * Save a todo (create or update)
 * Param: todo the todo to save
 */
TodoRepository.prototype.save = function (todo) {
    if (todo.id == null || todo.id == 0) {
        todo.id = this.nextId;
        this.todos.push(todo);
        this.nextId++;
    } else {
        var index = this.findIndex(todo.id);
        this.todos[index] = todo;
    }

}
/**
 * Remove a todo
 * Param: id the of the todo to remove
 */
TodoRepository.prototype.remove = function (id) {
    var index = this.findIndex(id);
    this.todos.splice(index, 1);
}

module.exports = TodoRepository;