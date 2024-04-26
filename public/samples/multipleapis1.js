/*const apiURL1 = 'https://ghibliapi.vercel.app/films';
const apiURL2 = 'https://ghibliapi.vercel.app/locations'
let peopleData = '';


fetch(apiURL1)
.then(function(response){
    return response.json();
}).then(function(data1){
    let filmData = data1;
    console.log('Film', filmData);
    filmData.forEach(function(film){
      let peopleData = film.people;
        peopleData.map(function(people){
            let pname = people.id;
            pname.map(function(p1){
                console.log(p1);
            })
        })
    })
    return fetch(apiURL2);
}).then(function(response){
    return response.json();
}).then(function(data2){
    //let locationData = data2;
    //console.log('data from location api', locationData);
}).catch(function(error){
    console.warn(error);
})*/

const url = 'https://api.spacexdata.com/v4';

const result = fetch(`${url}/launches/latest`, { method: 'get' })
  .then(response => response.json()) // pass the data as promise to next then block
  .then(data => {
    const rocketId = data.rocket;

    console.log(rocketId, '\n');
  
    return fetch(`${url}/rockets/${rocketId}`); // make a 2nd request and return a promise
  })
  .then(response => response.json())
  .catch(err => {
    console.error('Request failed', err)
  })

// I'm using the result const to show that you can continue to extend the chain from the returned promise
result.then(r => {
  console.log(r.first_stage.fuel_amount_tons); // 2nd request result first_stage property
  console.log(r.second_stage.fuel_amount_tons); // 2nd request result first_stage property

});


