const url = 'https://ghibliapi.vercel.app'

const result = 

fetch(`${url}/locations`)
.then(function(response){
    return response.json()
}).then (function(locationData){
  locationData.map(function(locationDetails){
    console.log(locationDetails.name);
    let films = locationDetails.films
    films.forEach(function(filmsURL){
        let filmsID = filmsURL.split('/')[4]
        console.log('Films:' + filmsID);
        return filmsID;
    })
  })
})

fetch(`${url}/films`)
.then(function(response){
    return response.json();
}).then(function(data){
    data.forEach(function(filmDetails){
        console.log(filmDetails.id);
    })
})  

/**
 * 
 * <div class = "container">
        <div class="row">
            <div class="col-sm-9">
                <div class = "blog__header">
                    <h5 class = "blog__title"><a href = "${movie.url}">${movie.title}</a></h5>
                    ${movie.original_title}
                    <ul class="blog__info">
                        <li>
                            <i class="fa fa-user"></i> Released in: <a href="#">${movie.release_date}</a>
                        </li>
                        <li>
                            <i class="fa fa-calendar"></i>Length: <time>${movie.running_time} minutes</time>
                        </li>
                        <li>
                            <i class="fa solid fa-thumbs-up"></i>${movie.rt_score}
                        </li>
                    </ul>
                </div>
                <div class = "blog__body">
                    <img class="img-responsive img-article pull-left" src = "${movie.movie_banner}">
                    <p class = "">${movie.description}</p>

                </div>  
                <div class="blog__footer">
                    <ul class="blog__tags">
                        <li><a href="#">${movie.director}</a></li>
                        <li><a href="#">${movie.producer}</a></li>
                    </ul>
                </div> <!-- / .blog__footer -->
            </div>
        </div>
    <div>
        `
 */