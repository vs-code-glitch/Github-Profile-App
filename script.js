const input = document.querySelector("input");
const btn = document.querySelector("button");
const card = document.querySelector(".card");

const repos_container = document.querySelector('.repos');


async function user(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const responseData = await response.json();
  // console.log(responseData);
  return responseData;
}
async function repos(username) {
  const resp = await fetch(`https://api.github.com/users/${username}/repos`);
  const respData = await resp.json();

  return respData;
}

async function add_repo() {
  const reposData = await repos(input.value);
  console.log(reposData);
  repos_container.innerHTML = reposData
    .map((repo) => {
      return `
            <div class="card">
                <h2>${repo.name}</h2>
                <a href="${repo.clone_url}" target="_blank">Take a look at this repo ></a>
            </div>
        `;
    })
    .join("");
}

btn.addEventListener('click', async () => {
  const input_value = input.value;
  const search_result = await user(input_value);
  console.log(search_result);

  add_repo();
  
  if (!search_result.login) {
    alert('No user found')
  } else {
    card.innerHTML = `
    <div class="avatar">
        <img src="${search_result.avatar_url}" alt="">
       </div>
       <div class="info">
          <h2>${search_result.name}</h2>
          <p>${search_result.login}</p>
          <div class="follow-info">
            <span>${search_result.followers}</span>
            <span>Followers</span>
          </div>
          <div class="single">
            <span>${search_result.following}</span>
            <span>Following</span>
          </div>
          <div class="single">
            <span>${search_result.public_repos}</span>
            <span>Repos</span>
          </div>
       </div>
       <a href="${search_result.html_url}" target="_blank">Visit Github Profile</a>
       `;
  }
   
})