var app = require("./config/express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.set("io", io);

var port = process.env.PORT || 3000;

http.listen(port, function() {
    console.log("Servidor rodando");
});