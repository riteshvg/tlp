//https://www.youtube.com/watch?v=vvjaRIM4Bjs
let locationURL = 'https://ghibliapi.vercel.app/locations';
let filmURL = 'https://ghibliapi.vercel.app/films';
let locationDetails = ''

fetch(locationURL)
  .then(function(response){
    return response.json();
  })
  .then(function(locationData){
    //map each location to a promise that fetches the film details
    const filmPromises = locationData.map(function(locationDetails){
      const locationID = locationDetails.films[0].split('/')[4];
      return fetch(`https://ghibliapi.vercel.app/films/${locationID}`)
        .then(function(response){
          return response.json();
        })
        
    });

    //wait for all film detail requests to complete
    return Promise.all(filmPromises);
  })
  .then(function(allFilmDetails){
    //now allFilmDetails contains an array of film details for each location
    //console.log(allFilmDetails);
    let app = document.querySelector('.blog__item')
    allFilmDetails.map(function(data){  
        //console.log(allFilmDetails);
        app.innerHTML += 
        `
    <div class = "container">
        <div class="row">
            <div class="col-sm-9">
                <div class = "blog__header">
                    <h5 class = "blog__title"><a href = "${data.url}">${data.title}</a></h5>
                    ${data.original_title}
                    <ul class="blog__info">
                        <li>
                            <i class="fa fa-user"></i> Released in: <a href="#">${data.release_date}</a>
                        </li>
                        <li>
                            <i class="fa fa-calendar"></i>Length: <time>${data.running_time} minutes</time>
                        </li>
                        <li>
                            <i class="fa solid fa-thumbs-up"></i>${data.rt_score}
                        </li>
                        <li>
                            <i class="fa solid fa-thumbs-up"></i>${locationDetails.name}
                        </li>
                    </ul>
                </div>
                <div class = "blog__body">
                    <img class="img-responsive img-article pull-left" src = "${data.movie_banner}">
                    <p class = "">${data.description}</p>

                </div>  
                <div class="blog__footer">
                    <ul class="blog__tags">
                        <li><a href="#">${data.director}</a></li>
                        <li><a href="#">${data.producer}</a></li>
                    </ul>
                </div> <!-- / .blog__footer -->
            </div>
        </div>
    <div>
        `
    })
  })
  .catch(function(error){
    console.error('Error:', error);
  });


/* fetch(locationURL)
.then(function(response){
  return response.json();
}).then(function(locationData){
  locationData.map(function(locationDetails){
    locationID = locationDetails.id
    //console.log("filmId:" + locationID);
    return fetch(`https://ghibliapi.vercel.app/films/${locationID}`)
  }).then(function(response){
    console.log(response)
    return response.json()

  }).then(function(filmData){
    filmData.map(function(filmDetails){
      filmID = filmDetails.id
      //console.log(filmID);
    })
  })
}) 

fetch(locationURL)
.then(function(response){
  return response.json();
}).then(function(locationData){
  locationData.map(function(locationDetails){
    const locationID = locationDetails.films[0].split('/')[4];
    console.log(locationID);
    return fetch(`https://ghibliapi.vercel.app/films/${locationID}`)
  })
}).then(function(response){
  console.log(response);
  return response.json();
});

fetch('https://ghibliapi.vercel.app/locations')
.then(function(response){
  return response.json();
}).then(function(locationData){
  locationData.map(function(locationDetails){
    //console.log(locationDetails);
    const locationId = locationDetails.films[0].split('/')[4];
    //console.log(locationId);
    return fetch(`https://ghibliapi.vercel.app/films/${locationId}`)
  }).then(function(response){
    return response.json();
  }).then(function(filmData){
    filmData.forEach(function(element){
      console.log(element);
    })
  })
})

fetch('https://ghibliapi.vercel.app/locations')
  .then(function(response){
    return response.json();
  })
  .then(function(locationData){
    locationData.forEach(function(locationDetails){
      const locationId = locationDetails.films[0].split('/')[4];
      console.log('Data from endpoint 1:', locationId);
      return fetch(`https://ghibliapi.vercel.app/films/${locationId}`)
    }).then(function(response){
      if(!response.ok){
        throw new Error('Network response was not OK' + response.statusText)
      } else {
        return response.json();
      }
    }).then(function(filmData){
      filmData.forEach(function(element){
        return element;
      })
    }).catch(function(error){
      console.log('request failed:', error)
    })
  })

*/
