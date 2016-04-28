var http = require("http");
var configurations = {
    hostname: "localhost",
    port: 3000,
    path: "/produtos",
    method: "post",
    headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
    }
};

var client = http.request(configurations, function(response) {
    console.log(response.statusCode);
    
    response.on("data", function(body) {
        console.log("Resultado: " + body);
    });
});

var produto = {
    titulo: "",
    descricao: "Livro de HTTPS",
    preco: 120
};

client.end(JSON.stringify(produto));