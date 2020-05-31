const request = require('request')
const express = require('express')

const app = express()

app.use(express.json())

const options = {

    headers: {
        'Content-type': 'application/json',
        'accept': 'application/json',
        'authorization': ' Bearer Av3iqd87K8RFVJ3RiS2q33hiw27EAtt-ahG9'
    },
    /*auth: {
        'sendImmediately': true,
       
    },*/
    first_name: 'aneesh',
    last_name: 'vempaty',
    email: 'dummy@gmail.com',
    gender: 'male'

}

//var id = ''

makeRequest('https://gorest.co.in/public-api/users', 'POST', options)
.then((resp) => {
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
        console.log('Received 200')
        console.log(resp)
    }
    //console.log(resp.statusCode)
    console.log(resp.body)
    var id = resp.body.result.id
    return id
})
.then((id) => {
    makeRequest('https://gorest.co.in/public-api/users/' + id, 'GET', {})
    .then((resp) => {
        if (resp.statusCode === 502) {
            throw new Error('Received 502 error at GET ')
        }
        if (resp.statusCode === 500) {
            throw new Error('Received 502 error at GET ')

        }
        if (resp.statusCode >= 400) {
            throw new Error('Received 40X error at GET ')
        } else if (resp.statusCode === 200) {
            console.log('Received 200 at GEt')
            //console.log(resp)
        }
        console.log(id)
        console.log(resp.body)
    })
    return id
})
.then((id) => {
    makeRequest('https://gorest.co.in/public-api/users/' + id, 'PUT', { website: "http://google.com" }).then((resp) => {
        if (resp.statusCode === 502) {
            throw new Error('Received 502 error at PUT ')
        }
        if (resp.statusCode === 500) {
            throw new Error('Received 502 error at PUT ')
        }
        if (resp.statusCode >= 400) {
            throw new Error('Received 40X error at PUT ')
        } else if (resp.statusCode === 200) {
            console.log('Received 200 at PUT')
            //console.log(resp)
        }
        console.log(id)
        console.log(resp.statusCode)
        console.log(resp.body)
    })
    return id
})
.then((id) => {
    makeRequest('https://gorest.co.in/public-api/users/' + id, 'DELETE', {}).then((resp) => {
        if (resp.statusCode === 502) {
            throw new Error('Received 502 error at DELETE ')
        }
        if (resp.statusCode === 500) {
            throw new Error('Received 502 error at DELETE ')
        }
        if (resp.statusCode >= 400) {
            throw new Error('Received 40X error at DELETE ')
        } else if (resp.statusCode === 200) {
            console.log('Received 200 at DELETE')
            //console.log(resp)
        }
        console.log(id)
        console.log(resp.statusCode)
        console.log(resp.body._meta.success)
    })
})
    .catch((err) => {
        console.log(err.statusCode)
        console.log(err.message)
    })

function makeRequest(url, method, body) {
    return new Promise((resolve, reject) => {
        request(url, { method: method, json: body || true }, (err, res) => {
            //console.log(body)
            //console.log(res)
            if (err) {
                reject(err)
                return
            }
            resolve(res)
        })
        .auth(null, null, true, 'wLejCijFBsVpo8gKfXH-JAqN_slWt3x6tOVI')
    })
}


app.listen(3000, (err) => {
    if (err) throw new Error
    console.log('Listening on port ', 3000)
})