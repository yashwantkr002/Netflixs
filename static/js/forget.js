let email = document.getElementById("email")
let mobile = document.getElementById("mobile_no")
let err = document.querySelector(".error")


const submit_func =()=>{
    if(email.value.trim()==="" && mobile.value.trim()==="")
        {
         err.innerHTML="plese enter any email or mobile numbr"
        return false
     }
    elseif(email.value.trim()!=="" || mobile.value!=="")
    {   
        err.innerHTML=''
        return true
    }

}

const removeblock = () =>{
        err.innerHTML=""
}