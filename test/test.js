/*jslint undef: true */
var assert = require('assert'), should = require('should'), request = require('supertest'), port = process.env.PORT || 8085;

var url = 'http://localhost:' + port;

// Test Home page

describe("Home page", function () {

    'use strict';
    it("should return home page", function (done) {

        // calling home page api
        request(url)
            .get("/")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                done();
            });
    });

});

// Test Todo API
describe('Todo', function () {
    
    'use strict';
    //no mockup needed since using in-memory storage
    before(function (done) {
        var todo1 = {
            title: 'football',
            description: 'play football with colleagues'
        }, todo2 = {
            title: 'buy shampoo',
            description: 'shampoo is running out'
        };
        request(url)
            .post('/api/todos')
            .send(todo1)
            .expect(201) //status code 'created' 
            .end(function (err, res) {
                if (err) { return done(err); }
            });
        request(url)
            .post('/api/todos')
            .send(todo2)
            .expect(201) //status code 'created' 
            .end(function (err, res) {
                if (err) { return done(err); }
                done();
            });
    });
    it('should correctly get all todos', function (done) {
        var todo1 = {
            title: 'football',
            description: 'play football with colleagues'
        };
        request(url)
            .get('/api/todos')
            .expect(200)
            .end(function (err, res) {
                if (err) { return done(err); }
                res.body.todos.length.should.equal(2);
                res.body.todos[0].title.should.equal(todo1.title);
                done();
            });
    });
    it('should correctly get todo by todo id', function (done) {
        var todo1 = {
            title: 'football',
            description: 'play football with colleagues'
        };
        request(url)
            .get('/api/todos/1')
            .expect(200)
            .end(function (err, res) {
                if (err) { return done(err); }
                res.body.title.should.equal(todo1.title);
                done();
            });
    });
    it('should return error when getting todo with invalid todo id', function (done) {
        request(url)
            .get('/api/todos/101')
            .expect(400, 'todo not found')
            .end(function (err, res) {
                if (err) { return done(err); }
                done();
            });
    });
    it('should correctly create a new todo', function (done) {
        var todo = {
            title: 'jogging',
            description: 'jogging near lake'
        };
        request(url)
            .post('/api/todos')
            .send(todo)
            .expect(201)
            .end(function (err, res) {
                if (err) { return done(err); }
                done();
            });
    });
    it('should return error when creating todo without title', function (done) {
        var todo = {
            description: 'jogging near lake'
        };
        request(url)
            .post('/api/todos')
            .send(todo)
            .expect(400, 'invalid todo') //bad request
            .end(function (err, res) {
                if (err) { return done(err); }
                done();
            });
    });
    it('should correctly update an existing todo', function (done) {
        var todo = {
            title: 'football after work',
            description: 'play football with friends',
            done: true
        };
        request(url)
            .put('/api/todos/1')
            .send(todo)
            .expect(200)
            .end(function (err, res) {
                if (err) { return done(err); }
                done();
            });
    });
    it('should return error when updating with invalid id', function (done) {
        var todo = {
            title: 'football after work',
            description: 'play football with friends',
            done: true
        };
        request(url)
            .put('/api/todos/101')
            .send(todo)
            .expect(400, 'todo not found')
            .end(function (err, res) {
                if (err) { return done(err); }
                done();
            });
    });
    it('should correctly delete an existing todo', function (done) {
        request(url)
            .delete('/api/todos/1')
            .expect(200)
            .end(function (err, res) {
                if (err) { return done(err); }
                done();
            });
    });
    it('should return error when deleting with invalid todo id', function (done) {
        request(url)
            .delete('/api/todos/101')
            .expect(400, 'todo not found')
            .end(function (err, res) {
                if (err) { return done(err); }
                done();
            });
    });
});