module.exports = function(app) {
    app.get("/produtos", function(request, response, next) {
        var connection = app.infra.connectionFactory();
        var produtoDAO = new app.infra.ProdutoDAO(connection);
        
        produtoDAO.lista(function(err, results) {
            if (err) {
                return next(err);
            }
            
            response.format({
                html: function() {
                    response.render("produtos/lista", {lista: results.rows});
                },
                json: function() {
                    response.json(results.rows);
                }
            });

            connection.end();
        });
    });
    
    app.get("/produtos/form", function(request, response) {
        response.render("produtos/form", {errors: {}, produto: {}});
    });
    
    app.post("/produtos", function(request, response, next) {
        var connection = app.infra.connectionFactory();
        var produtoDAO = new app.infra.ProdutoDAO(connection);
        
        var produto = request.body;
        
        request.assert("titulo", "Titulo eh obrigatorio").notEmpty();
        //request.assert("preco", "Preco nao eh um float").isFloat();
        
        var validationErrors = request.validationErrors();
        
        if (validationErrors) {
            response.format({
                html: function() {
                    response.status(400).render("produtos/form", {errors: validationErrors, produto: produto});
                },
                json: function() {
                    response.status(400).json({errors: validationErrors, produto: produto});
                }
            });
            
            return;
        }
        
        produtoDAO.salva(produto, function(err, result) {
            if (err) {
                return next(err);
            } else {
                response.format({
                    html: function() {
                        response.redirect("/produtos");
                    },
                    json: function() {
                        response.send(result);
                    }
                });                
            }
        });
    });
};