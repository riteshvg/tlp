// Function to fetch data from a URL
function fetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

// Fetch data from both endpoints concurrently
Promise.all([
  fetchData('https://ghibliapi.vercel.app/locations'),
  fetchData('https://ghibliapi.vercel.app/films')
])
.then(function(results) {
  const locations = results[0];
  const films = results[1];

  // Create a map to store films by their ID for faster access
  const filmMap = new Map(films.map(function(film) {
    return [film.id, film];
  }));

  // Merge film data into locations based on film ID
  locations.forEach(function(location) {
    const filmID = location.films[0];
    const filmData = filmMap.get(filmID);
    if (filmData) {
      location.filmData = filmData;
    }
  });

  // Create HTML elements to display the merged data
  const container = document.getElementById('data-container');
  locations.forEach(function(location) {
    const locationDiv = document.createElement('div');
    locationDiv.classList.add('location');

    const locationName = document.createElement('h2');
    locationName.textContent = location.name;

    const filmTitle = document.createElement('p');
    filmTitle.textContent = 'Film: ' + location.filmData.title;

    const filmDescription = document.createElement('p');
    filmDescription.textContent = 'Description: ' + location.filmData.description;

    locationDiv.appendChild(locationName);
    locationDiv.appendChild(filmTitle);
    locationDiv.appendChild(filmDescription);

    container.appendChild(locationDiv);
  });
})
.catch(function(error) {
  console.error('Error fetching data:', error);
});
