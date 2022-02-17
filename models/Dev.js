const db = require('./db')

const Dev = db.sequelize.define('tabela_devs',{
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    area: {
        type: db.Sequelize.STRING
    },
    tecnologias: {
        type: db.Sequelize.STRING
    },
    senioridade: {
        type: db.Sequelize.STRING
    },
    experiencia: {
        type: db.Sequelize.STRING
    }
})

//Dev.sync({force: true})
module.exports = Dev