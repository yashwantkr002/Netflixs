let btn = document.getElementById("btn");
let inputs = document.querySelectorAll(".input");
let flage=false;

const init=(e)=>{

  inputs[0].focus()
inputs.forEach((input, index1) => {
  input.addEventListener("keyup", (ele) => {
    let currentElement = input;
    let nextElement = input.nextElementSibling;
    let prevElement = input.previousElementSibling;
    if (currentElement.value.length > 1) {
      currentElement.value = "";
      return;
    }
    
    if (
      nextElement &&
      nextElement.hasAttribute("disabled") &&
      currentElement.value !== ""
    ) {
      nextElement.removeAttribute("disabled");
      nextElement.focus();
    }

    if(ele.key === "Backspace"){
        inputs.forEach((input,index2)=>{
            if(index1<=index2 &&  prevElement){
                input.setAttribute('disabled',true)
                currentElement.value=""
                prevElement.focus()
            }

        });
    }
    if(!inputs[0].disabled && inputs[3].value!==""){
      flage= true
    }
    else{
      flage=false
    }
  });
});
}
const submitcheck=()=>{
  if(flage){
    return true
  }
  return false
}
window.addEventListener("load",init);
