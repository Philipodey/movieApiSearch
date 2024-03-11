// https://omdbapi.com/?s=spiderman&page=2&apikey=2558656f


const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const result = document.getElementById("result-grid");


async function showMovieDetails(searchName){
    const URL =  `https://omdbapi.com/?s=${searchName}&page=1&apikey=2558656f`;
    const response = await fetch(`${URL}`);
    const data = await response.json();
    // console.log(data)

    if(data.Response == "True") displayMovieList(data.Search)

}


const findMovie = ()=>{
  let searchName = (movieSearchBox.value).trim();
  if(searchName.length > 0){
    searchList.classList.remove("hide-search-list")
    showMovieDetails(searchName)
  }
  else{
    searchList.classList.add("hide-search-list");
  }
}

const displayMovieList = (movies) =>{
    searchList.innerHtml = "";
    for (let index = 0; index < movies.length; index++) {
      let movieListItem = document.createElement("div");
      movieListItem.dataset.id = movies[index].imdbID;
      movieListItem.classList.add("search-list-item");
      if(movies[index].Poster != "N/A")
          moviePoster = movies[index].Poster;
      else
          moviePoster = "image_not_found.png";
      
      movieListItem.innerHTML = `
            
                <div class="search-item-thumbnail">
                    <img src="${moviePoster}" >
                </div>
                <div class="search-movie-info">
                    <h3>${movies[index].Title}</h3>
                    <p><span>${movies[index].Year}<span></p>
                </div>
            
      `;
      searchList.appendChild(movieListItem)
    }
        loadMovieDetails();
}

function loadMovieDetails(){
    const searchMoviesList = searchList.querySelectorAll(".search-list-item");
    searchMoviesList.forEach(movie=>{

      movie.addEventListener("click", async()=>{
          searchList.classList.add("hide-search-list");
          movieSearchBox.value = "";
          const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=2558656f`)
          const movieDetails = await result.json();
        
          displayMovieDetails(movieDetails)

      });
    });
}


function displayMovieDetails(details){
    result.innerHTML = 
    `<div class="movie-poster">
        <img src="${(details.Poster != "N/A") ? details.Poster : "image_not_found"}" alt="movie-poster">
      </div>

      <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-detail-info">
            <li class="year"><b>Year: </b>${details.Year}</li>
            <li class="rated"> <b>Ratings:</b>${details.Rated}</li>
            <li class="released"> <b>Released :</b> ${details.Released}</li>
        </ul>
        <p class="genre"><b>Genre: </b>${details.Genre}</p>
        <p class="writer"><b>Writer: </b>${details.Writer}</p>
        <p class="actors"><b>Actors: </b>${details.Actors}</p>
        <p class="plot"><b>Plot: </b>${details.Plot}</p>
        <p class="language"><b>Language: </b>${details.Language}</p>
        <p class="awards"><i class="fas fa-award"><b></b></i>
        ${details.Awards}</p>
      </div> 
    `;
}

window.addEventListener("click",(event)=>{
  if(event.target.className != "search-movie"){
    searchList.classList.add("hide-search-list")
  }
})

































// async function logMovies() {
//     const response = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=2558656f");
//     const movies = await response.json();
//     console.log(movies);
//   }

//   console.log(logMovies())

