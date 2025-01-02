/* Promise.all([
  fetch('https://ghibliapi.vercel.app/films'),
  fetch('https://ghibliapi.vercel.app/locations')
]).then(function(responses){
  //Get a JSON object from each of the response
  return Promise.all(responses.map(function(response){
      return response.json();
  }))
}).then(function(data){
  const filmsData = data[0];
  const locationData = data[1];
  locationData.forEach(function(locationDetails){
    filmURL = locationDetails.films[0].split('/')[4];
    //console.log(filmURL);
    
  })
  filmsData.forEach(function(filmDetails){
    //console.log(" film URL: "+filmDetails+`{filmURL}`);
  })
}) */

let locationURL = 'https://ghibliapi.vercel.app/locations';
let filmURL = 'https://ghibliapi.vercel.app/films';

fetch(locationURL)
.then(function(response){
  return response.json();
}).then(function(locationData){
  locationData.forEach(function(locationDetails){
    locationID = locationDetails.films[0].split('/')[4]
    console.log('Data from Location API:', locationID);
    console.log(locationDetails.terrain)
  })
fetch(`https://ghibliapi.vercel.app/films/${locationID}`)
.then(function(response){
  return response.json();
}).then(function(data){
    console.log(data);
  })
});

