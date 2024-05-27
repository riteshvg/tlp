
fetch('https://ghibliapi.vercel.app/locations')
.then(function(response){
  return response.json();
})
.then(function(locationData){
  const allPromises = locationData.map(function(locationDetails){
    const locationID = locationDetails.films[0].split('/')[4];
    console.log('Data from endpoint 1:', locationDetails);
    return fetch(`https://ghibliapi.vercel.app/films/${locationID}`)
    .then(function(response){
      if(!response.ok){
        throw new Error('Network response was not OK' + response.statusText)
      }
      return response.json()
      .then(function(filmDetails){
        return { filmDetails: filmDetails, locationDetails: locationDetails }
      });
     });
    });
  //Use Promise.all to handle all film fetch requests
  return Promise.all(allPromises)
  })
  .then(function(dataArray){
    //filmDataArray contains the film data for each location
    dataArray.forEach(function({filmDetails, locationDetails})
    {
    console.log("Film Data:", filmDetails)
    const app = document.querySelector('.blog__item')
    app.innerHTML += `
    <div class = "container">
        <div class="row">
            <div class="col-sm-9">
                <div class = "blog__header">
                    <h5 class = "blog__title"><a href = "${filmDetails.url}">${filmDetails.title}</a></h5>
                    ${filmDetails.original_title}
                    <ul class="blog__info">
                        <li>
                            <i class="fa fa-user"></i> Released in: <a href="#">${filmDetails.release_date}</a>
                        </li>
                        <li>
                            <i class="fa fa-calendar"></i>Length: <time>${filmDetails.running_time} minutes</time>
                        </li>
                        <li>
                            <i class="fa solid fa-thumbs-up"></i>${filmDetails.rt_score}
                        </li>
                        <li>
                            <i class="fa solid fa-thumbs-up"></i>${locationDetails.name}
                        </li>
                    </ul>
                </div>
                <div class = "blog__body">
                    <img class="img-responsive img-article pull-left" src = "${filmDetails.movie_banner}">
                    <p class = "">${filmDetails.description}</p>

                </div>  
                <div class="blog__footer">
                    <ul class="blog__tags">
                        <li><a href="#">${filmDetails.director}</a></li>
                        <li><a href="#">${filmDetails.producer}</a></li>
                    </ul>
                </div> <!-- / .blog__footer -->
            </div>
        </div>
    <div>
    `
    });
  })
  .catch(function(error){
    console.log('Request Failed:', error)
  })
