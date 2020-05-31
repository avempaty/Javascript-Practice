/*
WELCOME TO THE INFINITUS CODERPAD PLAYGROUND

Task Overview:

We wish to process an input stream of data and be left with the items of interest. The result of this
filtered set of data will be the input into our magical AI model, so getting it right is key to ensuring
the success of our system.

The input data stream is available via an API, and we need your help to fetch it, filter it and then
present the output neatly.


Part 1
------

The API hostname is http://b37b2626.ngrok.io. You may retrieve a manifest from the path:

  GET /manifest

It will return a JSON array of objects, e.g.:

[
  {
    "type": "suggestion",
    "id": "48A48B25-A079-4992-8290-6057FE0FBE93"
  },
  ...
]


We only care about the ones of type "suggestion". Obtain the IDs of all the "suggestions".

Armed with the IDs, next we wish to retrieve the actual suggestion data for each suggestion from the path:

  GET /suggestion/:id

It will return a JSON object, e.g.:

{
  "type": "suggestion",
  "id": "48A48B25-A079-4992-8290-6057FE0FBE93",
  "category": "GOODBYES",
  "title": "Nemo voluptas goodbyes",
  "suggestion": "Excepturi nulla quod quia. Sunt non voluptas cum quia omnis dolor aut consequatur. Quos autem velit debitis ut possimus et dolorum et. goodbyes"
}

Part 2
------

Now that you have retrieved the raw data, we need to assemble it neatly for presentation.

We want to group the suggestions by category so it's easier to scan visually.

We also want to sort the categories, and also the suggestions within each category alphabetically.

Pretty print each category title as a heading, and then the sorted titles of each suggestion beneath.
For example:

GENERAL_CHATTER
  - Qui dignissimos
  - Qui exercitationem
  ...
MAIN_RESPONSES
  - At nesciunt main_responses
  - Id sint quia main_responses
  ...
*/

const request = require('request')
var filtered = []
var map = new Map()
var map2 = new Map()
var getPromise = new Promise(function(fulfilled, reject) {
  request.get('http://b37b2626.ngrok.io/manifest', (error, response, body) => {
    body = JSON.parse(body)
    filtered = body.filter(item => item.type === "suggestion")
   /*for(var i = 0; i < body.length; i++) {
      body
    }*/
    console.log(filtered)
    fulfilled(filtered)
  })
})
.then((filtered) => {
  filtered.forEach(element => {
    request.get('http://b37b2626.ngrok.io/suggestion/' + element.id, (error, response, body) => {
      body = JSON.parse(body)
      //console.log(body.category)
      if(!map.has(body.category)) {
         const array = []
         array.push(body.title)
         map.set(body.category, array)
      } else {
        const array = map.get(body.category)
        array.push(body.title)
        map.set(body.category, array)
      }            
    })
  })
  var keyList = []
  for(var key in map.keys()) {
    const arr = map.get(key)
    arr.sort()
    keyList.push(key)
    map.set(key, arr)
  }
  keyList.sort()
  keyList.forEach((key) => {
      map2.set(key, map.get(key))
  })
  console.log(map2)
})




