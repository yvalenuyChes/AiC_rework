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
const auth = require('./auth')

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
            }
            )


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
                            message:'Error creating user',
                            err
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


        server.post('/', (req,res)=>{
            UserSchema.findOne({email:req.body.email})
            .then(user => {
                bcrypt.compare(req.body.password, user.password)
                .then(passwordCheck => {
                    if(!passwordCheck){
                        return response.status(400).send({
                            message: "Passwords does not match",
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
                        message: "Login Successful",
                        email: user.email,
                        token,
                    })
                })
                .catch(err => {
                    res.status(400).send({
                        message:'Passwords does not match',
                        err
                    })
                })
            })
            .catch(err => {
                res.status(404).send({
                    message:'Email not found',
                    err
                })
            })
        })

        server.get('/user',  (req,res)=> {
            const token = req.headers.cookie
            const cookie = token.slice(6)
            const decoded = jwt.decode(cookie)
            res.status(200).send(decoded)
        })

        server.post('/saint_petersburg', (req, res)=> {
            const ticket = {
                name: 'Saint-Petersburg',
                personNumber: req.body.personNumber,
                dateFrom: req.body.dateFrom,
                dateCome:req.body.dateCome
            }
            try{

                UserSchema.findOneAndUpdate(
                    {email:req.body.email }, 
                    {$push: {tickets:ticket}}, 
                    { upsert: true },  
                    ).then(()=>{
                        res.status(200).send('Updated succesfully')
                    })
                   

            }catch(e){
                console.log(e)
            }

          //const user =  UserSchema.findOne({email: req.body.email})

        //   try{
        //     user.tickets.push({
        //         name: 'Saint-Petersburg',
        //         personNumber: req.body.personNumber,
        //         dateFrom: req.body.dateFrom,
        //         dateCome:req.body.dateCome
        //     }),
        //     user.save()
        //   }catch(err){
        //     res.status(500).send({
        //         message:'Something went wrong',
        //         err
        //        })  
        //   }
            // .then(user => user.tickets.push({
            //         name: 'Saint-Petersburg',
            //         personNumber: req.body.personNumber,
            //         dateFrom: req.body.dateFrom,
            //         dateCome:req.body.dateCome
            //     }),
            // )
            // .catch(err => {
            //     res.status(500).send({
            //         message:'Something went wrong',
            //         err
            //     })  
            // })
        })


        server.get('profile', auth,  (req,res)=> {
            res.json({ message: "You are authorized to access me" })
        })

        server.use(cors())


        server.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader(
              "Access-Control-Allow-Headers",
              "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
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