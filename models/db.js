const Sequelize = require("sequelize")

//conexão com o banco de dados
const sequelize = new Sequelize('AulaPWI','postgres','admin',{
    host: "localhost",  
    dialect: "postgres"   
}) 

sequelize.authenticate().then(()=>{// verificando se a conexão foi feita.
    console.log("Conectado ao banco")
}).catch((erro)=>{ //caso ocorrer algum erro
    console.log("Falha ao conectar com o banco: "+erro)
})  

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
