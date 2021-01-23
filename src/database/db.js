// importar a dp do sqlite3
const sqlite3 = require("sqlite3").verbose()


// criar o objeto que ira fazer operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db


// utilixar o objeto de banco de dados para as operações

 /* db.serialize(() => {
  
    // criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS cuidadores (
          id  INTEGER PRIMARY KEY AUTOINCREMENT,
          image IMAGE,
          name TEXT,
          cpf VARCHAR,
          cellphone INTEGER,
          adress TEXT,
          adress2 TEXT,
          state TEXT,
          city TEXT,
          items TEXT
        );
    `)
            

    //inserir dados na tabela
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

    ]

    function afterInsertData(err) {
      if (err) {
        return console.log(err)
      }

      console.log("cadastrado com sucesso")
      console.log(this)
    }

    db.run(query, values, afterInsertData)

    
    //consultar os dados na tabela
    db.all(`SELECT * FROM cuidadores`, function(err, rows) {
      if (err) {
        return console.log(err)
      }

      console.log("Aqui estão seus registros")
      console.log(rows)

    }) 

    
     //deletar os dados da tabela
    db.run(`DELETE FROM cuidadores WHERE id = ?`, [5], function(err){
      if (err) {
        return console.log(err)
      }

      console.log("Registro deletado com sucesso!")

    })
    

  }) */
