function ProdutoDAO(connection) {
    this._connection = connection;
}

ProdutoDAO.prototype.lista = function(callback) {
    this._connection.query('SELECT * FROM produtos', callback);
};

ProdutoDAO.prototype.salva = function(produto, callback) {
    var sql = "INSERT INTO produtos (titulo, descricao, preco) VALUES ($1, $2, $3)";
    this._connection.query(sql, [produto.titulo, produto.descricao, produto.preco], callback);
};

module.exports = function() {
    return ProdutoDAO;
};