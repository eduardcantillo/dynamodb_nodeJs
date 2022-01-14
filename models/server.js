const express = require("express");
const cors =require("cors");



class Server {
    constructor() {

        this.app = express();
        this.paths={
            save:"/api/localiza-reservs/save",
            listar:"/api/listar",    
        }
        this.middleware();
        this.routes();
        this.port = process.env.PORT || 17270;
    }

    routes() {
        this.app.use(this.paths.save,require('../routes/reservation.routes'));
    }

    middleware(){
        this.app.use(cors());
        this.app.use(express.json());}

    listen() {
        this.app.listen(this.port, console.log(`Escuchando en el puerto ${this.port}`));
    }
}

module.exports = Server;