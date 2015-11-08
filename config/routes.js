module.exports = function(app) {
    var TodoService = require('./../app/services/todoService')
      , todoService = new TodoService();    
     /**
     * HTTP GET /api/todos
     * Returns: the list of todos in JSON format
     */
    app.get('/api/todos', function (request, response) {
        response.json(todoService.getAll());
    });
    /**
     * HTTP GET /api/todos/:id
     * Param: :id is the unique identifier of the todo you want to retrieve
     * Returns: the todo with the specified :id in a JSON format
     * Error: 404 HTTP code if the todo doesn't exists
     */
    app.get('/api/todos/:id', function (request, response) {        
        try {
            response.json(todoService.get(request.params.id));
        } catch (e) {
            response.sendStatus(400);
        }
    });
    /**
     * HTTP POST /api/todos/
     * Body Param: the JSON todo you want to create
     * Returns: 200 HTTP code
     */
    app.post('/api/todos', function (request, response) {                
        try {           
            todoService.create(request.body);
            response.sendStatus(201);
        } catch (e) {            
            response.sendStatus(400);
        }        
    });
    /**
     * HTTP PUT /api/todos/
     * Param: :id the unique identifier of the todo you want to update
     * Body Param: the JSON todo you want to update
     * Returns: 200 HTTP code
     * Error: 404 HTTP code if the todo doesn't exists
     */
    app.put('/api/todos/:id', function (request, response) {
        var todo = request.body;        
        todo.id = request.params.id;
        try {           
            todoService.update(todo);
            response.sendStatus(200);
        } catch (e) {                        
            response.sendStatus(400);
        }
    });
    /**
     * HTTP PUT /api/todos/
     * Param: :id the unique identifier of the todo you want to update
     * Returns: 200 HTTP code
     * Error: 404 HTTP code if the todo doesn't exists
     */
    app.delete('/api/todos/:id', function (request, response) {
        try {
            todoService.delete(request.params.id);
            response.sendStatus(200);
        } catch (e) {
            response.sendStatus(400);
        }
    });

};