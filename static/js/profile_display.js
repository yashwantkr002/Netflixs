let save_btn= document.querySelector('.save_btn');
let file=document.querySelector('#profile_upload');
let profile_info=document.querySelector(".profile_info")
let fname=document.querySelector(".fname")
let lname=document.querySelector(".lname")


const savefun=()=>{
   if(save_btn.style.display=='none'){
     save_btn.style.display="block"
     fname.removeAttribute("disabled")
     lname.removeAttribute("disabled")
    }
    else{
        save_btn.style.display="none"
        fname.setAttribute('disabled',true)
        lname.setAttribute('disabled',true)
    }
}

const change_pic=()=>{
    file.click()
    save_btn.style.display="block"
    fname.removeAttribute("disabled")
    lname.removeAttribute("disabled")
}

file.addEventListener('change',()=>{
    const file_data=file.files[0];
    if(file_data){
        const reader = new FileReader();
        reader.onload = function(){
            const result = reader.result;
            document.querySelector('#profile_img').src=result;
            }
            reader.readAsDataURL(file_data);
            
    }
})