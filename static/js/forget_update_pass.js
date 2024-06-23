let password =document.getElementById("password")
let cpassword =document.getElementById("cpassword")
let mainerr =document.getElementById("error")
let err1 =document.getElementById("err")

let flage1 =false
let flage2 =false
let flage3 =false

const submit_func = ()=>{
    if(password.value === "" || password.value.length <8){
        err1.innerHTML="Please enter your password min 8 char"
        flage1=false
    }
    else{
        err1.innerHTML=""
        flage1=true
    }
    if(flage1==true && flage2== true){
        return true
    }
    else{
        return false
    }
}

cpassword.addEventListener('input',()=>{
    if(cpassword.value!==password.value ){
        cpassword.style.border="3px solid red"
        if(flage2){
            flage2=false
        }
    }
    else{
        cpassword.style.border="3px solid green"
        flage2=true
    }
})