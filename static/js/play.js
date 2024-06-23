const youtubeEndpoint="https://www.googleapis.com/youtube/v3";
const youtubeApiKey="AIzaSyCLVIVGjxpdgGg7IWlw-XxlZrauSCGf3I8";
let play_container=document.querySelector(".play_container") 
// let queary="Turning Red";
let queary=document.getElementById("slag").innerText


let api_path ={
    SearchVideo:(queary)=>`${youtubeEndpoint}/search?q=${queary}&key=${youtubeApiKey}`
}

const init =()=>{
   fetchVideo(api_path.SearchVideo(queary))
}
const fetchVideo=(url)=>{
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
        // console.log(res)
        let data=res.items
        if(Array.isArray(data)&& data.length){
            // https://www.youtube.com/embed/${pyt}?autoplay=1&contro=1
            let video=`<iframe  src="https://www.youtube.com/embed/${data[0].id.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>`
               let div =document.createElement("div")
               div.innerHTML=video
               play_container.append(div)
            // console.log(div)
        }
    })
    .catch(err=>console.error(err))
}

window.addEventListener("DOMContentLoaded",init)
