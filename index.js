document.addEventListener("DOMContentLoaded", () => {
    // Listen for the page to be fully loaded & ready before executing code inside this listener
  
    const form = document.querySelector("#Github-form");
    // Get the form element
  
    document.addEventListener('submit', (e) => {
      // Attach an event listener that listens for a submit event when the form is submitted
  
      e.preventDefault()
      // Prevent the default form submission behavior
  
      let search = e.target.search.value
      // Get the search value entered by the user
  
      handleSearch(search)
      // Call the function 'handleSearch' and pass the search value as an argument
    })
  
      function handleSearch(name) {
        // Define the function that handles searching for Github users
  
        fetch(`https://api.github.com/search/users?q=${name}`,{
          method: 'GET',
          headers:{
            'Content-Type':'application/json',
            Accept: 'application/vnd.github.v3+json'
          }
          // Make a GET request to the Github API with the search query
        })
        .then(response => response.json())
        // Convert the response to JSON format
  
        .then((data) => {
          // Handle the JSON data that was returned from the API
  
          displaydata(data);
          // Log the data to the console

          function displaydata(array){
        array.items.forEach( object => {
            let userCard = document.createElement('li')
            userCard.innerHTML = `
            <div class='content'>
                <h3>User: ${object.login}</h3>
                <p>URL: ${object.html_url}</p>
                <div class='repos'>
                    <button class='repoButton' style='margin-bottom:25px'>
                        Repositories
                    </button>
                </div>
                <img src='${object.avatar_url}' />
            </div>`;
            document.getElementById("users").appendChild(userCard)
            

        })

          }
  
          document.querySelector('#user-list').innerHTML='';
          document.querySelector('#repos-list').innerHTML='';
          // Clear out any existing user or repo data that may have been previously displayed
  
          data.items.forEach(user => {
            // Loop through each item in the 'items' array in the returned JSON data
  
            console.log(user);
            // Log the current user object to the console
  
            document.querySelector('#user-list').appendChild(userCard);
            // Add the user card to the DOM by appending it to the #user-list element
  
  
            const repoButton=userCard.querySelector('.repoButton');
            // Get a reference to the repository button inside of the user card
  
            console.log(repoButton);
  
            repoButton.addEventListener('click',() => {
              // Attach an event listener to the repositories button
  
               fetch(user.repos_url,{
                  method:'GET',
                  headers:{
                    'Content-Type':'application/json',
                    Accept: 'application/vnd.github.v3+json'
                  }
                  // Make a GET request to the Github API for the user's repositories
                 }) 
                 .then(res => res.json())
                 // Convert the response to JSON format
  
                 .then(data =>{
                  
                  data.forEach(repo => {
                    // Loop through each item in the returned JSON array of repositories
  
                      let repoCard=document.createElement('li');
                      // Create a new list element that will contain the repo card
  
                      repoCard.innerHTML=`
                      <h4>${repo.name}</h4>
                      <p>${repo.html_url}</p>
                      `;
                      // Populate the repo card with the data from the returned repository object
  
                      document.querySelector('#repos-list').appendChild(repoCard);
                      // Add the repo card to the DOM by appending it to the #repos-list element
  
                  });
                 });
              })
          });
        });
      }
    });
  
  