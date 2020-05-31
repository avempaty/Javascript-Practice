const express = require('express')
const request = require('request')

const app = express()


app.use(express.json())


const data = {
    first_name: 'dity',
    last_name: 'vempaty',
    email: 'aditya.vempaty@gmail.com',
    gender: 'male'
}

var filtered = []

app.get('/hello', (req, res) => {
    var getPromise = new Promise(function(fulfill, reject) {
        request.get('https://gorest.co.in/public-api/users',(error, response, body) => {
            body = JSON.parse(body)
            console.log(body.result)
            filtered = body.result.filter(item => item.first_name.length > 6)
            console.log(filtered)
            console.log(response.statusCode)
            fulfill(body)
        }).auth(null, null, true, 'rr5ZwMtbURKn8ofSI3z31q6Z_HYMnBQglErI')
        
    })
    
    getPromise
    .then((body) => {
        
        res.send(body)
        //res.send('Hello world')
    })
    .catch((err) => {
        console.error(err)
        res.send(err)
    })

    
} )

app.post('/test', (req, res) => {
    var postPromise = new Promise(function(fulfill, reject) {
        request.post('https://gorest.co.in/public-api/users', (error, response, body) => {
            console.log(body)
            fulfill(response.statusCode)
        })
        .auth(null, null, true, 'l5HV7NiVpAUk3jcd-hmpMss9K7_ya_uVwMAZ')
        .form(req.body)
    })
    
    postPromise
    .then((status) => {
        res.send(status)
    })
    .catch((err) => {
        console.error(err)
        res.send(err)
    })
})


app.listen(7000, (err) => {
    if(err) throw new Error
    console.log('Listening at Port ' + 7000);
})