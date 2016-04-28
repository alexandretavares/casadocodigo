//TODO
// Limpar o banco usando a lib node-database-cleaner

var express = require("../config/express")();
var supertest = require("supertest")(express);

describe("#ProdutosController", function() {
    
    beforeEach(function(done) {
        var connection = express.infra.connectionFactory();
        
        connection.query("DELETE FROM produtos", function(ex, results) {
            if (ex) {
                console.error(ex);
            }
            
            done();
        });
    });
    
    it("#listagem", function(done) {
        supertest.get("/produtos")
            .set("Accept", "application/json")
            .expect("Content-type", /json/)
            .expect(200, done);
    });
    
    it("#cadastro com dados invalidos", function(done) {
        var produto = {titulo: "", descricao: "Livro falando de testes", preco: 25.5};
        supertest.post("/produtos")
            .send(produto)
            .expect(400, done);
    });
    
    it("#cadastro com dados validos", function(done) {
        var produto = {titulo: "Test JS", descricao: "Livro falando de testes", preco: 25.5};
        supertest.post("/produtos")
            .send(produto)
            .expect(302, done);
    });
    
    it("#cadastro com dados validos esperando Json", function(done) {
        var produto = {titulo: "Test JS", descricao: "Livro falando de testes", preco: 25.5};
        supertest.post("/produtos")
            .set("Accept", "application/json")
            .send(produto)
            .expect(200, done);
    });
});