
//https://www.youtube.com/watch?v=vvjaRIM4Bjs

Promise.all([
    fetch('https://ghibliapi.vercel.app/films'),
    fetch('https://ghibliapi.vercel.app/locations')
]).then(function(responses){
    //Get a JSON object from each of the response
    return Promise.all(responses.map(function(response){
        return response.json();
    }))
}).then(function(data){
    //accessing the films data[0] node and storing in a movieData variable
    
    let movieData = ('movies', data[0]);
    let currentPage = 1;
    const itemsPerPage = 10; 
    let app = document.querySelector('.blog__item')
    
    movieData.forEach(function(movie){
        app.innerHTML += 
        `
    <div class = "container">
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
    })

}).catch(function(error){
    console.warn(error);

}) 

/*Promise.all([
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
    const mergedData = mergeData(filmsData, locationData, 'id');
    displayMergedData(mergeData);
}).catch(function(error){
    console.warn('Error fetching data: ', error);
})

function mergeData(data1, data2, identifier){
    const mergedData = [];

    data1.forEach(function(item1){
        const matchingItem = data2.find(function(item2){
            return item1[identifier] === item2[identifier]
        })
        if(matchingItem){
            mergedData.push(Object.assign({}, item1, matchingItem))
        }
    });
}

displayMergedData(mergedData);*/