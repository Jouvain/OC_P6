const errorBoard = document.createElement("p")

const loginForm = document.querySelector(".login__form")
loginForm.addEventListener("submit", function(event){
    event.preventDefault()
    
    errorBoard.setAttribute("class", "errorBoarding")
    errorBoard.remove()
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
    .then(async (Response) => {
        if (Response.ok){
            console.log(Response.status)
            errorBoard.remove()
            location.assign("/editpage.html")
        }
        else {
            errorBoard.remove()
            console.log(Response.status)
            const message = Response.status === 401 ? "Mauvais mot de passe" : "Utilisateur inconnu"
            errorBoard.innerText = message
            loginForm.appendChild(errorBoard)
        }
    })
    
    
    
})
// sophie.bluel@test.tld
// S0phie
