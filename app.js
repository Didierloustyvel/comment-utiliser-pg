  var PORT = process.env.PORT || 8080
  const express = require("express")
  const http = require("http");
  const app = express()
  const server = http.createServer(app);
  
  app.set("views", "./views")
  app.set("view engine", "ejs")
  app.use("/assets", express.static("public"))
  app.get("/*", (req, res) => {
    res.render("index.ejs")
  })

  const io = require("socket.io")(server);
  
  const {Client} = require('pg');

  const client = new Client({
    user: "",
    host: "",
    database: "",
    password: "",
    port: 5432,
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });;
  client.connect();
  client.query('SELECT * FROM public.articles  ORDER BY id ASC;', (err, res) => {
    if (err) throw err
    for (row of res.rows) {
      console.log(row)
    }
    client.end()
  });
  
  io.sockets.on('connection', async (socket) => {
    await socket.emit('connection-utilisateur', "bonjour");
  })

  
  server.listen(PORT, () => console.log("Server started"))