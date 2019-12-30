const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt-nodejs');
app.use(express.json());
app.use(cors());
const knex = require('knex');


const database = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1234',
      database : 'webshop'
    }
});

let items_catalog = null;
database.from('items_catalog').innerJoin('items_prices', 'items_catalog.id', 'items_prices.id')
    .then(data => {        
        items_catalog = data;
    }
);

app.get('/', (req,res) => {    
    res.send(items_catalog);
});

app.post('/signin', (req,res) => {
    
    const {email, hash} = req.body;
    const attemptedHash = bcrypt.hashSync(hash);


})

app.post('/register', (req,res) => {        
    const {email, password} = req.body;        
    const hash = bcrypt.hashSync(password);
    let isEmailAvailable = false;
    database.from('user_accounts').select('email').where('email', email)
        .then(email => {            
            if(email.length > 0){
                isEmailAvailable = false;
            }
            else if(email.length === 0) { isEmailAvailable = true; }
        }).then(() => {
            if(isEmailAvailable){
                database.transaction(trx => {
                    trx.insert({
                        email: email,
                        hash: hash
                    })
                    .into('user_accounts')        
                    .then(() => {
                        return(            
                            database.insert({
                                items_id_array: []
                            })   
                            .into('user_cart')
                        )
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
                })
                res.json({"RegisterStatus": true});
            }
            else{
                res.json({"RegisterStatus": false});
            }
        });    
})

app.listen(3001, () => {
    console.log("app is running on 3001")
});