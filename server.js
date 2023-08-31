const http = require('http')
const app = require('./app')
const PORT = process.env.PORT || 3000
const HOST = "0.0.0.0";
const server = http.createServer(app)


server.listen(PORT, HOST, () => {
    console.log(`Servidor rodando! http://localhost:${PORT}/`)
})