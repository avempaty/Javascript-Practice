//NOTES FROM TJ

/*try {
    console.log('before')
    setTimeout(() => { //this is async
        throw new Error('boom!')
    }, 100)
    console.log('after')
}
catch(err) { //cannot catch async errors
    console.log('This is a caught error' + err)
}*/



/*for(var i = 0; i < 10; i++) {
    console.log(i)
    setTimeout(() => {
        console.log('inside timeout ' + i)
    }, 10)
}
0
1
2
3
4
5
6
7
8
9
inside timeout 10
inside timeout 10
inside timeout 10
inside timeout 10
inside timeout 10
inside timeout 10
inside timeout 10
inside timeout 10
inside timeout 10
inside timeout 10

*/ 

//Learn async and await
function timeOut(ms) {
    console.log('before')
    return new Promise((resolve, reject) => {
       setTimeout(() => {
           reject('boom!')
       }, ms)
    })   
}

//console.log(timeOut(10))

async function main() {
    console.log(new Date())
    try {
        await timeOut(500)
    }
    catch(err) {
        console.log('this is a caught error ', err)
    }
    console.log(new Date())
}
main()