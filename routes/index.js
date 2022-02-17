var express = require('express');
var router = express.Router();

const Dev = require('../models/Dev');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Banco de Devs' });
});

router.get('/listacadastro', (req, res, next)=>{
  Dev.findAll().then((dev)=>{
    res.render('listacadastro', {dev:dev})
  })
})

router.get('/formulario', (req, res, next)=>{
  res.render('formulario', {error_msg: req.flash("error_msg")})
})

router.post('/cadastrar', (req, res, next)=>{
  var erros = []
  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
      erros.push({texto: "Nome inválido"})
  }
  if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
      erros.push({texto: "E-mail inválido"})
  }
  if(erros.length > 0){
    res.render("formulario", {erros: erros})
  }else{
    Dev.findOne({ where: { email: req.body.email } }).then((dev)=>{
      if(dev){
        req.flash("error_msg", "E-mail já cadastrado. Tente novamente.")
        res.redirect('/formulario')
      }else{
              Dev.create({
                nome: req.body.nome,
                email: req.body.email,
                area: req.body.area,
                senioridade: req.body.senioridade,
                tecnologias: req.body.tecnologias.join(', '),
                experiencia: req.body.experiencia,
            }).then(()=>{
                res.cookie("dadosDev", req.body.email)
                res.redirect('/listacadastro')                      
            }).catch((erro)=>{
                req.flash("error_msg", "Erro ao salvar usuário")
            })
        
          }
  })
}

})

router.get('/deletar/:id', (req, res, next)=>{
  const { id } = req.params
  Dev.destroy({where: { id }})
  res.redirect('/listacadastro')  
})

router.get('/editar/:id',(req, res)=>{
  id=req.params.id
  Dev.findOne({where: {id}}).then(dev =>{
    res.render('editar', {form: dev})
  }).catch(erro =>{
    res.redirect('/')
  })
})

router.post('/editar',(req, res)=>{
  const {id} = req.params
  Dev.update({
      nome: req.body.nome,
      email: req.body.email,
      area: req.body.area,
      senioridade: req.body.senioridade,
      tecnologias: req.body.tecnologias,
      experiencia: req.body.experiencia,
  }, {
      where: {id: id},
  }).then(()=>{
      res.redirect('/listacadastro')
  }).catch((erro)=>{
      console.log("erro")
  })
})

module.exports = router;
