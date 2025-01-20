const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const img_path = 'https://image.tmdb.org/t/p/w1280';
const search_api = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const page = 4;

const url = getMovies(api_url);
console.log(url);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';

    //destructuring the movie object
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
        <img src="${img_path + poster_path}" alt="${title}">
        <div class="movie-info">
          <h4>${title}</h4>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl);
    })

}

function getClassByRate(vote){
    if(vote >= 8) {
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else return 'red'
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm && searchTerm !== ''){
        getMovies(search_api + searchTerm)
        search.value = ''
    } else {
        window.location.reload();
    }
});