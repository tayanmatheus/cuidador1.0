const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")

// configurar a pasta public
server.use(express.static("public"))

//habilitar o uso do req.body na app

server.use(express.urlencoded({ extended: true }))


// template engine nunjucks

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})


// caminhos da aplicação

//req: requisição(pedido)
//res: resposta
// rota da pagina inicial
server.get("/", (req, res) => {
  return res.render("index.html")

})

// rota de criação
server.get("/create-point", (req, res) => {

  //req.query()
  
  return res.render("create-point.html")

})

server.post("/savepoint", (req, res) => {
 
  //req.body: o corpo do nosso formulário
  //console.log(req.body)


  //inserir dados no db

  const query = `
      INSERT INTO cuidadores (
          image,
          name,
          cpf,
          cellphone,
          adress,
          adress2,
          state,
          city,
          items
      ) VALUES (?,?,?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.cpf,
        req.body.cellphone,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
      if (err) {
         console.log(err)
         return res.send("Erro no cadastro")
      }

      console.log("cadastrado com sucesso")
      console.log(this)

      return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)



})

// rota de resultados

server.get("/search", (req, res) => {

  const search = req.query.search

  if(search == "") {
    // pesquisa vazia
    return res.render("search-results.html", {total: 0})

  }



  //pegar os dados do banco de dados
  db.all(`SELECT * FROM cuidadores WHERE city LIKE '%${search}%'`, function(err, rows) {
    if (err) {
      return console.log(err)
    }

    const total = rows.length

  
    // mostrar os dados do banco de dados
    return res.render("search-results.html", { cuidadores: rows, total})
  }) 

})

// ligar o servidor
server.listen(3000)