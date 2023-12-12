const errorBoard = document.querySelector(".errorBoarding")

const loginForm = document.querySelector(".login__form")
loginForm.addEventListener("submit", function(event){
    event.preventDefault()
    
    
    errorBoard.innerText=""
    const futureBodyFetch = {
        email: event.target.querySelector("[name=mail]").value,
        password: event.target.querySelector("[name=password]").value
    }
    const bodyFetch = JSON.stringify(futureBodyFetch)
    
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: bodyFetch
    })
    .then(async (response) => {
        if (response.ok){
            console.log(response.status)
            const reader = await response.json()
            const activeToken = reader.token
            window.localStorage.setItem("key", activeToken)
            console.log(activeToken)
            location.assign("/index.html")
        }
        else {
            
            console.log(response.status)
            const message = response.status === 401 ? "Mauvais mot de passe" : "Utilisateur inconnu"
            errorBoard.innerText = message
        }
    })
})
// sophie.bluel@test.tld
// S0phie

const displayIcon = document.querySelector(".login__iconBlock--displayOnOff")
const passwordInput = document.getElementById("password")
displayIcon.addEventListener("click", ()=>{
    if(displayIcon.classList[2] === "fa-eye"){
        displayIcon.classList.remove("fa-eye")
        displayIcon.classList.add("fa-eye-slash")
        passwordInput.setAttribute("type", "password")  
    }
    else{
        displayIcon.classList.remove("fa-eye-slash")
        displayIcon.classList.add("fa-eye")
        passwordInput.setAttribute("type", "text") 
    }
})