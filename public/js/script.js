// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

// tax-botton
let taxBtn = document.getElementById("switchCheckDefault");
taxBtn.addEventListener("click",()=>{
  let taxInfo = document.querySelectorAll(".tax-info");
  taxInfo.forEach((tax) =>{
    if(tax.style.display != "inline"){
      tax.style.display = "inline"
    }else{
      tax.style.display = "none"
    }
  })
})

// filters ki js ha 
