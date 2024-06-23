let Email_num=document.getElementById("Email_num");
let number=document.getElementById("number");
let pass=document.getElementById("pass");
let cpass_disp=document.getElementById("cpass_disp");
let username=document.getElementById("username")
let password=document.getElementById("password")
let cpassword=document.getElementById("cpassword")
let error_massage1=document.getElementById('error_massage1');
let error_massage2=document.getElementById('error_massage2');
let error_massage3=document.getElementById('error_massage3');
let error_massage4=document.getElementById('error_massage4');
let c_box=document.getElementById('c_box');
let res=0;
let rese=0;

function  myFunction(ele1,ele2,ele3){
    ele1.style.display="block"
    ele2.removeAttribute('placeholder')
    ele2.style.margin='5px 0px'
    ele3.style.display="none"
}
function thfun(ele1,ele2,ele3,ele4){
    if(ele2.value.length==0){
    ele1.style.display="none"
    ele2.setAttribute('placeholder',ele3)
    ele2.style.margin='10px 0px'
    ele4.style.display="block"
    }
}

const submitcheck =()=>{
    if(username.value.length < 8){
        error_massage1.style.display='block'
        res=0;
      }
      else{
        error_massage1.style.display='none'
         res=1;
      }
 
      if(password.value.length <8){
         error_massage2.style.display='block'
         rese=0;
      }
      else{
        error_massage2.style.display='none'
       rese=1;
      }
      if (res==1 && rese==1){
         return true; 
      }
      else{
         return false;
      }
}

cpassword.addEventListener('input',()=>{
   if(cpassword.value==password.value){
      c_box.style.border='2px solid green'
   }
   else{
      c_box.style.border='2px solid red'

   }
})