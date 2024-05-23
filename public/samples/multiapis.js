let locationURL = 'https://ghibliapi.vercel.app/locations';
let filmURL = 'https://ghibliapi.vercel.app/films';

fetch(locationURL)
.then(function(response){
  return response.json();
}).then(function(locationData){
  locationData.forEach(function(locationDetails){
    locationID = locationDetails.films[0].split('/')[4]
    console.log('Data from Location API:', locationID);
  })
fetch(`https://ghibliapi.vercel.app/films/${locationID}`)
.then(function(response){
  return response.json();
}).then(function(data){
    //console.log(data);
  })
});

