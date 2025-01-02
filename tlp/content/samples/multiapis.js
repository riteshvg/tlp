let locationURL = 'https://ghibliapi.vercel.app/locations';
let filmURL = 'https://ghibliapi.vercel.app/films';

fetch(locationURL)
.then(function(response){
    return response.json();
}).then(function(locationData){
    console.log(locationData);
    locationData.forEach(function(locationDetails){
        locationID = locationDetails.films[0].split('/')[4]
        console.log('Data from Location API:', locationID);
    })
fetch(`filmURL/${locationID}`)
}).then(function(response){
    console.log(response.json());
    return response.json();
}).then(function(filmData){
    console.log(filmData);
});