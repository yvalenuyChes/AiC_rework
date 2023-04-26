const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')
const { default: mongoose } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const UserSchema = require('./Models/user')

app.prepare()
    .then(() => {
        const server = express()
        server.use(bodyParser.json())
        server.use(bodyParser.urlencoded({ extended: true }))

        const DATABASE_URL = process.env.DB_URL

        mongoose
            .connect(DATABASE_URL, {
                useNEWUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log('database connected');
             })

        server.post('/signup',  (req,res)=>{

            UserSchema.findOne({email: req.body.email}).then(user=>{
                if(user){
                    return res.status(400).send({
                        message: 'Email уже занят',
                    })
                }
            })


            bcrypt
            .hash(req.body.password, 10)
            .then((hashedPassword)=> {
                const user = new UserSchema({
                    name:req.body.name,
                    email: req.body.email,
                    password:hashedPassword
                })

                try{
                    user.save()
                    .then( result =>{
                        res.status(201).send({
                            message:'User Created Successfully',
                            result
                        })
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:'Ошибка сервера',
                            err,
                            color:'rgb(208, 97, 97)'
                        })
                    })
                    
                }catch(e){
                    res.status(500).send({
                        message:'Password was not hashed successfully',
                        e
                    })
                }
            })

          
        })


        server.post('/login', (req,res)=>{
            UserSchema.findOne({email:req.body.email})
            .then(user => {
                bcrypt.compare(req.body.password, user.password)
                .then(passwordCheck => {
                    if(!passwordCheck){
                        return response.status(400).send({
                            message: "Неверный пароль",
                            // color:'rgb(208, 97, 97)',
                            error,
                          })
                    }

                    const token = jwt.sign({
                        userId: user._id,
                        userEmail: user.email
                    },
                    'RANDON-TOKEN',
                    {expiresIn:'300h'}
                    )


                    res.status(200).send({
                        message: "Вы успешно вошли в систему",
                        email: user.email,
                        token,
                        color:'rgb(47, 160, 47)'
                    })
                })
                .catch(err => {
                    res.status(400).send({
                        message:'Неверный пароль',
                        err
                    })
                })
            })
            .catch(err => {
                res.status(404).send({
                    message:'Почта не найдена',
                    err
                })
            })
        })

        server.get('/user',  (req,res)=> {
            const token = req.headers.cookie
            const cookie = token.slice(6)
            const decoded = jwt.decode(cookie)
            UserSchema.findOne({email:decoded.userEmail})
            .then((result,err) => {
                    if(result){
                        res.status(200).send(result)
                    }else{
                        console.log(err)
                    }
                }
            )
           
            
           
        })

        server.post('/order_ticket', (req, res)=> {
            const ticket = {
                name: req.body.name,
                personNumber: req.body.personNumber,
                dateFrom: req.body.dateFrom,
                dateCome:req.body.dateCome,
                price: req.body.price
            }
            try{

                UserSchema.findOneAndUpdate(
                    {email:req.body.email}, 
                    {$push: {tickets:ticket}}, 
                    { upsert: true },  
                    ).then(()=>{
                        res.status(200).send({
                          message:  'Билет заказан',
                          color:'rgb(47, 160, 47)'
                        })
                    })
                   

            }catch(e){
                res.status(200).send({
                    message:  'Не удалось заказать билет заказан',
                    color:'rgb(208, 97, 97)'
                  })
            }
        })

        server.post('/add_card', (req,res)=> {

            
          
            const creditCard = {
                cardNumber: req.body.cardNumber,
                holderName: req.body.holderName,
                expireDate: '21/30',
                bankName: req.body.bankName,
                brand:req.body.brand
            }
            try{
                
                UserSchema.findOne({email: req.body.email}).then(user=>{  
                    let isUniqCard = true
                    if(user.creditCards.length > 0){
                        user.creditCards.map(card => {
                            if(card.cardNumber.toString() === req.body.cardNumber){
                              return isUniqCard = false
                            }
                        })
                        isUniqCard
                        ?
                        UserSchema.findOneAndUpdate(
                                {email:req.body.email },
                                {$push: {creditCards:creditCard}},
                                { upsert: true }, 
                            ).then(()=> {
                                res.status(200).send({
                                  message:  'Вы успешно привязали карту',
                                  color:'rgb(47, 160, 47)'
                                })
                            })
                            : 
                            res.status(200).send({
                                message: 'Карта уже добавлена',
                                color:'rgb(208, 97, 97)',
                            })
                    }else{
                        UserSchema.findOneAndUpdate(
                            {email:req.body.email },
                            {$push: {creditCards:creditCard}},
                            { upsert: true }, 
                        ).then(()=> {
                            res.status(200).send({
                               message: 'Вы успешно привязали карту',
                               color:'rgb(47, 160, 47)'
                            })

                        })
                    }
                   
                })
                
            }catch(e){
                console.log(e)
            }
        })


        server.post('/delete_card', (req, res)=> {
            UserSchema.findOne({email: req.body.email}).then(
                user => { 
                    let findCard = null
                    let deletedCardNumber = null

                    user.creditCards.map((card, key)=> {
                        if(card.cardNumber.toString() === req.body.cardNumber){
                            findCard = key
                            deletedCardNumber = card.cardNumber.toString()
                           
                        }
                    })

                    findCard >= 0
                    ? UserSchema.findOneAndUpdate(
                        {email:req.body.email },
                        {$pull: {creditCards:{ cardNumber:deletedCardNumber} }},
                        { upsert: true }, 
                    )
                    .then(()=> {
                        res.status(200).send({
                            message:'Карта удалена',
                            color:'rgb(47, 160, 47)'
                        })
                    })
                    : 
                    res.status(200).send({
                        message:'Карта не найдена',
                        color:'rgb(208, 97, 97)',
                    })
                }
            )
        })


        server.use(cors())


        server.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader(
              "Access-Control-Allow-Headers",
              "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
            )
            res.setHeader(
              "Access-Control-Allow-Methods",
              "GET, POST, PUT, DELETE, PATCH, OPTIONS"
            )
            next()
          });


        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        process.exit(1)
    })