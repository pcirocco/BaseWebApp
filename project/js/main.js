$(document).ready(function() {
  //getTickets();
  // searchWeather();
})

const getWeather = (searchQuery) => {
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+searchQuery+"&units=imperial&appid=cba75f0bde502b5c80b2a16758a24928";

  $.ajax(url, {success: function(data){
    console.log(data)
    $(".city").text(data.name)
    $(".temp").text(data.main.temp)
  }})
}

const searchWeather = () => {
  const searchQuery = $(".search").val()
  getWeather(searchQuery )
}

const getTickets = (ticketQuery) => {
    const url = "http://localhost:5000/json"
    //const url = 'https://boiling-plains-31523.herokuapp.com/json'
    $.ajax({
  
      // Our sample url to make request 
      url: url,
      // Type of Request
      type: "GET",
      dataType: "json",
      data: {
        hs_ticket_id: ticketQuery
      },

      // Function to call when to
      // request is ok 
      success: function (data) {
          var x = JSON.stringify(data);
          console.log(x);
          $(".ticket").text('Ticket Name: ' + JSON.stringify(data['results'][0]['properties']['subject']))
          $(".priority").text('Ticket Priority: ' + JSON.stringify(data['results'][0]['properties']['hs_ticket_priority']))
      },

      // Error handling 
      error: function (error) {
          console.log(`Error ${error}`);
      }
  });
}

const searchTickets = () => {
  const ticketQuery = $(".search").val()
  getTickets(ticketQuery)
  console.log('search tickets called' + ticketQuery)
}




// const getTickets = () => {
//   $.ajax({
//     // url: 'https://api.hubspot.com/crm/v3/objects/tickets/1378329465',
//     url: 'http://localhost:5000/',
//     type: 'GET',
//     beforeSend: function (xhr) {
//         xhr.setRequestHeader('Authorization', 'Bearer pat-na1-8832ed51-46b7-4558-b87f-83026c1590db');
//         xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
//         xhr.setRequestHeader('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
//         xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     },
//     data: {},
//     success: function () { },
//     error: function () { },
//     });
// }


// const getTickets = () => {
//   //const url = "https://api.hubspot.com/crm/v3/objects/tickets/1378329465"
//   const url = "http://localhost:5000/json"
//   $.ajax(url, {success: function(data){
//     console.log('the data receieved from local host is: ', data['results'])
//     $(".ticket").text('Ticket name: ' + JSON.stringify(data['results'][0]['properties']['subject']))
//   }})
// }

//const url = "https://api.hubspot.com/crm/v3/objects/tickets/1378329465"

// console.log('in get tickets')
// $.ajax(url, 
//   {type: 'GET',
//   dataType: 'json',
//   contentType: "application/json", 
//     data: {
//       hs_ticket_id: ticketQuery
//   }}, 

//    {success: function(data){
//       data.preventDefault()
//       alert("function ran!")
//       $(".ticket").text('hi')
//     }},
//     {error: function(err) {
//       console.log(err.responseText)
//     }})
  //console.log('the data receieved from local host is: ', res['results'])
  // $(".ticket").text('Ticket ID: ' + JSON.stringify(res['results'][0]['properties']['subject']))
  // $(".ticket").text('Ticket ID: ' + JSON.stringify(data['results'][0]['properties']['subject']))