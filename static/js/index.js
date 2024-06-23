// this is documented for dom template
const movieDetail = document.querySelector(".banner_section")
let movies_section =document.querySelector(".movies_section")
let play_container=document.querySelector('.play_container');
let search_section=document.getElementById("search_section")
let search_input=document.getElementById("search_input")
let search_result=document.querySelector(".search_result")
let search =document.querySelector("#search")
let mobile_menu_on_off=document.getElementById('mobile_menu_on_off')
let header_bar =document.querySelector(".header_bar")
let menu_section=document.querySelector(".menu_section")
const profile=document.getElementById("profile")
const user=document.getElementById("user")
let flage=true

// console.log(search)
// this is for api functioning thing 
const api_key = "b172320a372e7ac103c672f175afa77a";
const api_endpoint = "https://api.themoviedb.org/3/";
const image_path ="https://image.tmdb.org/t/p/w500";
const originalImag="https://image.tmdb.org/t/p/original";

const api_path ={
  Movie_gener : `${api_endpoint}genre/movie/list?api_key=${api_key}`,
  Movielist:(id)=>`${api_endpoint}/discover/movie?api_key=${api_key}&with_genres=${id}`,
  MovieDetail:(id)=>`${api_endpoint}movie/${id}?api_key=${api_key}`,
  MovieSearch:(query)=>`${api_endpoint}search/movie?api_key=${api_key}&query=${query}`,
  MovieCast:(id)=>`${api_endpoint}movie/${id}/credits?api_key=${api_key}`,
  Tranding:`${api_endpoint}trending/movie/week?api_key=${api_key}`,
  
}
const init =() =>{
  moviesApi()
  Tranding()
  search 
 }

 const Tranding =()=>{
    Movies_category(api_path.Tranding,"Tranding")
    .then(res=>{
        let num=Math.floor(Math.random()*res.length)
        TrandingPage(res[num])
    })
    .catch(err=>console.log(err))
 }
 const TrandingPage =(movie)=>{
     movieDetail.innerHTML="";
    // const movie = data[num]
    // console.log(movie)
    let popnum=(Math.floor(movie.popularity))/10
    let BannerDetail=`
    <h1>${movie.original_title} </h1>
          <p class="date"><span>${popnum}% popularity </span>${movie.release_date}</p>
          <p class="overview">${movie.overview}</p>
          <div class="ctrl_btn">
            <button class="play"><i class="fa-solid fa-play"></i> Play</button>
            <button class="more_info"><i class="fa-solid fa-circle-info"></i><span> More Info</span> </button>
    `;
    let div =document.createElement('div')
    div.className="banner_info"
    div.innerHTML=BannerDetail
    movieDetail.append(div)
    movieDetail.style.backgroundImage=`url(${originalImag+movie.backdrop_path})`
    
}


const moviesApi =()=>{
    fetch(api_path.Movie_gener)
    .then(response => response.json())
    .then(response=>{
        // console.log(response.genres);
        let results = response.genres
        if(Array.isArray(results)&& results.length){
            results.forEach((genre)=>{
                // console.log(genre)
                Movies_category(api_path.Movielist(genre.id),genre.name)
            })
        }
    })
    .catch(err=>console.error(err))
}

const Movies_category=async (movieurl,name)=>{
    try {
        const response = await fetch(movieurl);
        const response_1 = await response.json();
        // console.log(response,name);
        let results = response_1.results;
        if (Array.isArray(results) && results.length) {
            //  console.log(re)            
            MoviesBuldSection(results, name);
        }
        return results
    } catch (err) {
        return console.error(err);
    }
}

const MoviesBuldSection =(movie,CategoryName)=>{
    // console.log(movie,CategoryName)
    let movies_container=''
    movie.forEach((e)=>{
       movies_container+=`<div class="movie_id" onclick="SelectMovie(${e.id})">
       <img src="${image_path+e.backdrop_path}" alt="${e.original_title}">
     </div>`;
    })
    let MoviesBodyContainer=`
    <h2>${CategoryName}</h2>
        <div class="movies_row">
        ${movies_container} 
    </div>
    `;
    let div =document.createElement("div")
    div.className="movies_container"
    div.innerHTML=MoviesBodyContainer
    movies_section.append(div)

// console.log(MoviesBodyContainer)
}

const cutfun =()=>{
    play_container.style.display="none"
}
 
// select  one movies and dispaly

const SelectMovie = (id)=>{
  search_input.value='';
  search_section.style.display="none"
  search_result.innerHTML=""
  play_container.style.display="block"
  play_container.innerHTML='';    
  fetch(api_path.MovieDetail(id))
  .then(res=>res.json())
  .then(res=>{
      // console.log(res)
      // TrandingPage(res)
      let contener=`
      <div class="cut_icon"><i class="fa-solid fa-circle-xmark cut" onclick="cutfun()"></i></div>
      <div class="popupImage_conrainer">
        <div class="image_cont">
          <img src="${image_path+res.backdrop_path}" alt="${res.original_title}">
        </div>
        <div class="pop_info">
          <h3>${res.original_title}</h3>
          <p class="date"><span>${res.popularity}% popularity </span>${res.release_date}</p>
          <p class="movie_info">${res.overview}</p>
        </div>
      </div>
      <div class="ctrl_btns">
        <div class="play_btn">
          <i class="fa-solid fa-circle-play inc" onclick="Redirect('${res.original_title}')"></i>
          <p>Play</p>
        </div>
        <div class="download_btn">
          <i class="fa-solid fa-download inc"></i>
          <p>Download</p>
        </div>
        <div class="sevelist_btn">
          <i class="fa-solid fa-circle-plus inc"></i>
          <p>My List</p>
        </div>
        <div class="share_btn">
          <i class="fa-solid fa-share-nodes inc" onclick="share()" ></i>
          <p>share</p>
        </div>
      </div>
      `;
      let div =document.createElement("div")
      div.innerHTML=contener
      play_container.append(div)
  })
  .catch(err=>console.error(err))
}

const Redirect=(tname)=>{
  // console.log(tname)
  window.location.href=`/play/${tname}`
}
// search fucntion display****
const searchDisplay=()=>{
  if(search_section.style.display=="none"){
    search_section.style.display="block"
    search_input.focus()
  }
  else if(search_input.value.trim()==""){
    search_section.style.display="none"
    search_result.innerHTML='';
  }
}
const MovieSearch = (value) => {
  return fetch(api_path.MovieSearch(value))
    .then(response => response.json())
    .then(data => {
      let mydata = data.results;
      // console.log(mydata);
      if(Array.isArray(mydata)&& mydata.length){
        return mydata;
      }

    })
    .catch(err => console.error(err));
};

const movieSearchAndBuild = () => {
  search_result.innerHTML=""
  let search_value = search_input.value.trim();
  if (search_value) {
    MovieSearch(search_value)
      .then(result => {
        let contener=''
        result.forEach((e)=>{
           contener += `
           <div class="movies_search_row" onclick="SelectMovie(${e.id})">
           <img src="${image_path}${e.backdrop_path}" alt="${e.original_title}">
           <div class="search_movies_detail">
             <h4>${e.original_title}</h4>
             <p>${e.overview}</p>
           </div>
           </div> `
          })
        let div=document.createElement('div')
        div.innerHTML=contener
        // console.log(div)
        search_result.append(div)


      })
      .catch(error => {
        console.error(error);
      });
  }
};
const debounce=(func,wait)=>{
  let timeId
  return ()=>{
    clearTimeout(timeId)
    timeId=setTimeout(()=>{
      func()
    },wait)
  }
}

const OnOffFunc=()=>{
  if(flage){
    menu_section.style.display="block"
    header_bar.style.backgroundColor="gray"
    flage=false
    }
  else{
    menu_section.style.display="none"
    header_bar.style.backgroundColor="transparent"
    flage=true
}
}
window.addEventListener('resize', ()=>{
  if(window.innerWidth>768){
    menu_section.style.display="block"
    header_bar.style.backgroundColor="transparent"
  }
   else if(!flage){
     header_bar.style.backgroundColor="gray"
     }
     else{

      menu_section.style.display="none"
    }
     })
// profile section
user.addEventListener('click',()=>{
  if(profile.style.display=='none'){
    profile.style.display='block'
  }
  else{
    profile.style.display='none'
  }
})
// share function
const share=()=>{
  if (navigator.share) {
    try {
        navigator.share({
            title: document.title,
            text: 'Check out this awesome page!',
            url: window.location.href,
        });
        console.log('Page shared successfully!');
    } catch (error) {
        console.error('Error sharing:', error);
    }
} else {
    alert('Web Share API is not supported in your browser.');
}
  }
//scroll function header background change
const scrollfunc=(e)=>{
  if(window.scrollY>10){
    header_bar.style.backgroundColor="black"
  }
  else{
    header_bar.style.backgroundColor="transparent"
  }
}
window.addEventListener('scroll',scrollfunc)
mobile_menu_on_off.addEventListener('click',OnOffFunc)
const mydebounce=debounce(movieSearchAndBuild,700)
search_input.addEventListener('keyup',mydebounce)
window.addEventListener("load",init)
search.addEventListener('click',searchDisplay)
