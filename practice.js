const request = require('request')
const express = require('express')

const app = express()

app.use(express.json())

const options = {

    headers: {
        'Content-type': 'application/json',
        'accept': 'application/json'
    },
    /*auth: {
        'sendImmediately': true,
        'bearerToken': 'ejxq-U52GRFGE-slYCd-lqXrulsWpXUME_PE'
    },*/

    first_name: 'a',
    last_name: 'vempaty',
    email: 'adity.vempaty@gmail.com',
    gender: 'male'

}

makeRequest('https://gorest.co.in/public-api/users', 'POST', options).then((resp) => {
    if (resp.statusCode === 502) {
        console.log('Received 502 error')
        return
    }
    if (resp.statusCode === 500) {
        console.log('Received 502 error')
        return
    }
    if (resp.statusCode >= 400) {
        console.log('Received 40X error')
        return
    } else if (resp.statusCode === 200) {
        console.log(resp.body)
    }
})

function makeRequest(url, method, body) {
    return new Promise((resolve, reject) => {
        request(url, { method: method, json: body || true }, (err, res) => {
            console.log(body)
            //console.log(res)
            if (err) {
                reject(err)
                return
            }
            resolve(res)
        }).auth(null, null, true, 'ejxq-U52GRFGE-slYCd-lqXrulsWpXUME_PE')
    })
}


app.listen(3000, (err) => {
    if (err) throw new Error
    console.log('Listening on port ', 3000)
})