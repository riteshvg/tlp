const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

async function getUser(username) {
  try {
    const { data } = await axios.get(APIURL + username); //destructure
    createUserCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorCard('No user found!');
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios.get(APIURL + username + '/repos?sort=created'); //destructure
    addReposToCard(data);
  } catch (err) {
    createErrorCard('Problem fetching repos!');
  }
}

function createUserCard(user) {
  const cardHTML = `
    <div class="card">
        <div>
          <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
          <h2>${user.name}</h2>
          <p>${user.bio}</p>

          <ul>
            <li>${user.followers}<strong>Followers</strong></li>
            <li>${user.following}<strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
          </ul>

          <div id="repos"></div>
        </div>
      </div>
    `;
  main.innerHTML = cardHTML;
}

function createErrorCard(message) {
  const cardHTML = `
        <div class = "card">
            <h1>${message}</h1>
        </div>
    `;
  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');

  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('repo');
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = '';
  }
});

/***
 *
 * how to use the async await function with axios to make the code easier to read and maintain
 * how to request data from multiple endpoints in an API
 * e.target provides a reference to the element where the event occured
 * how to limit the responses to different parameters like sort
 * how to use try...catch method to catch errors in API access and display custom messages
 * how to use for..each method to iterate over an array of repository objects and display them
 * how to append parameters to the fetch url
 * how to prevent the default behavior of forms
 */
