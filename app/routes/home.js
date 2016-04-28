module.exports = function(app) {
    app.get("/", function(request, response) {
        var connection = app.infra.connectionFactory();
        var produtoDAO = new app.infra.ProdutoDAO(connection);
        
        produtoDAO.lista(function(err, results) {
            if (err) {
                return next(err);
            }    
            
            response.render("home/index", {livros: results.rows});
            connection.end();
        });    
    });
};