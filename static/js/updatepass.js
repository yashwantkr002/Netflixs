let email =document.getElementById("oldpass")
let password =document.getElementById("password")
let cpassword =document.getElementById("cpassword")
let mainerr =document.getElementById("error")
let err1 =document.getElementById("err1")
let err2 =document.getElementById("err2")

let flage1 =false
let flage2 =false
let flage3 =false

const submit_func = ()=>{
    if(email.value.trim()===""){
        err1.innerHTML="Please enter your email"
        flage1=false
    }
    else{
        err1.innerHTML=""
        flage1=true
    }
    if(password.value === "" || password.value.length <8){
        err2.innerHTML="Please enter your password"
        flage2=false
    }
    else{
        err2.innerHTML=""
        flage2=true
    }
    console.log(flage1,flage2,flage3)
    if(flage1==true && flage2== true &&flage3 == true){
        return true
    }
    else{
        return false
    }
}

cpassword.addEventListener('input',()=>{
    if(cpassword.value!==password.value ){
        cpassword.style.border="3px solid red"
        if(flage3){
            flage3=false
        }
    }
    else{
        cpassword.style.border="3px solid green"
        flage3=true
    }
})