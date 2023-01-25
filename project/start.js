//'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var requestify = require('requestify');
var request = require('request')
const cors = require('cors');
const hubspot = require('@hubspot/api-client');
const { response } = require('express');
const fetch = require('node-fetch')

//app.use(cors())

// We are using our packages here
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())

app.set('port', (process.env.PORT || 5000));

// var BASE_URL = 'https://api.hubspot.com/crm/v3/objects/tickets/'+hs_ticket_id+;
// var API_OPTIONS = {
//   headers: { accept: 'application/json',
//               Authorization: 'Bearer pat-na1-8832ed51-46b7-4558-b87f-83026c1590db'
//  },
// };

//may need to use this at some point
//app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname));


// views is directory for all template files
app.set('views', __dirname + '/html');
app.set('view engine', 'ejs');


// app.get('/json', async function(req, res, next) {
//   // res.render('pages/index')
//   const hubspotClient = new hubspot.Client({
//     accessToken: process.env.HS_TOKEN
//   });
//   const PublicObjectSearchRequest = {
//       "filterGroups":[{
//         "filters": [
//           {
//             "propertyName": "subject",
//             "operator": "EQ",
//               "value": "Test Ticket -- In-Shape"
//           }]
//       }]
//   }

//   try {
//     const apiResponse = await hubspotClient.crm.tickets.searchApi.doSearch(PublicObjectSearchRequest);
//     console.log(JSON.stringify(apiResponse, null, 2));
//     const data = apiResponse
//     //res.render('pages/index', {data: apiResponse})
//     res.send(data)
//     //res.send(JSON.stringify(data))
//     //res.render('pages/index')

//   } catch (e) {
//     e.message === 'HTTP request failed'
//       ? console.error(JSON.stringify(e.response, null, 2))
//       : console.error(e)
//   }

  
//   //res.render('pages/index')
//   next();

// })

app.get('/ticket', async function(req, res, next) {
  
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HS_TOKEN
  });
  const PublicObjectSearchRequest = {
      "filterGroups":[{
        "filters": [
          {
            "propertyName": "hs_ticket_id",
            "operator": "EQ",
              "value": req.query['hs_ticket_id']
          }]
      }]
  }
  //console.log(req.query['hs_ticket_id'])

  try {
    const apiResponse = await hubspotClient.crm.tickets.searchApi.doSearch(PublicObjectSearchRequest);
    console.log(JSON.stringify(apiResponse, null, 2));
    const data = apiResponse
    //res.render('pages/index', {data: apiResponse})
    res.send(data)
    //res.send(JSON.stringify(data))
    //res.render('pages/index')

  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }

  // res.render('pages/index')

  
  //res.render('pages/index')
  next();

})

app.get('/getContact', async function(req,res) {

  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HS_TOKEN
  });

  const PublicObjectSearchRequest = 
    { 
      "filterGroups" : [{
          "filters":[{
            "propertyName":"firstname",
            "operator":"EQ",
            "value": req.query["firstname"]
        }],
        
          // "filters": [{
          //   "propertyName":"firstname",
          //   "operator":"EQ",
          //   "value": req.query["lastname"]
          // }]
      }],"filterGroups" : [{
        "filters": [{
          "propertyName":"lastname",
          "operator":"EQ",
          "value": req.query["lastname"]
        }],
    }],
    };
    console.log(req.query["firstname"])
    console.log(req.query["lastname"])

  // const PublicObjectSearchRequest = 
  // { filterGroups: 
  //   [{"filters":
  //   [{"value":"Teun",
  //   "propertyName":"firstname",
  //   "operator":"EQ"}]}], sorts: ["firstname"], properties: [["firstname","lastname"]], limit: 0, after: 0 };


try {
  const apiResponse = await hubspotClient.crm.contacts.searchApi.doSearch(PublicObjectSearchRequest);
  console.log(JSON.stringify(apiResponse, null, 2));
  const data = apiResponse
  res.send(data)

} catch (e) {
  e.message === 'HTTP request failed'
    ? console.error(JSON.stringify(e.response, null, 2))
    : console.error(e)
}
})

app.get('/', function(req, res) {
  res.render('pages/index')
})

app.get('/about', function(request, response, next) {
  response.render('pages/about');
  next();
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// app.get('/projects', function(request, response) {
//   response.render('pages/projects');
// });


// app.get('/json', async function(req, res, next) {
//   // res.render('pages/index')
//   const hubspotClient = new hubspot.Client({
//     accessToken: process.env.HS_TOKEN
//   });
//   const PublicObjectSearchRequest = {
//       "filterGroups":[{
//         "filters": [
//           {
//             "propertyName": "subject",
//             "operator": "EQ",
//               "value": "Test Ticket -- In-Shape"
//           }]
//       }]
//   }

//   try {
//     const apiResponse = await hubspotClient.crm.tickets.searchApi.doSearch(PublicObjectSearchRequest);
//     console.log(JSON.stringify(apiResponse, null, 2));
//     const data = apiResponse
//     //res.render('pages/index', {data: apiResponse})
//     res.send(data)
//     //res.send(JSON.stringify(data))
//     //res.render('pages/index')

//   } catch (e) {
//     e.message === 'HTTP request failed'
//       ? console.error(JSON.stringify(e.response, null, 2))
//       : console.error(e)
//   }
 //res.render('pages/index')
//  next();

// })