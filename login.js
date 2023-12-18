//gestion d'évènement du formulaire
document.querySelector(".login__form").addEventListener("submit", (event)=>{
    //reset du message potentiel - vide tant qu'aucune erreur n'est traitée
    event.preventDefault()
    const errorBoard = document.querySelector(".errorBoarding")
    errorBoard.innerText=""
    //création du corps de la requête + requête
    const bodyFetch = {
        email: event.target.querySelector("[name=mail]").value,
        password: event.target.querySelector("[name=password]").value
    }
    const body = JSON.stringify(bodyFetch)
    //si requête OK, stockage du token de BearerAuth puis redirection SINON message d'erreur
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: body
    })
    .then(async (response) => {
        if (response.ok){
            const reader = await response.json()
            const activeToken = reader.token
            window.localStorage.setItem("key", activeToken)
            location.assign("/index.html")
        }
        else {
            const message = response.status === 401 ? "Mauvais mot de passe" : "Utilisateur inconnu"
            errorBoard.innerText = message
        }
    })
})

//affiche/cache l'icone (selon classe) et l'input du password (selon type)
document.querySelector(".login__iconBlock--displayOnOff").addEventListener("click", (event)=>{
    if(event.target.classList[2] === "fa-eye"){
        event.target.classList.remove("fa-eye")
        event.target.classList.add("fa-eye-slash")
        document.getElementById("password").setAttribute("type", "password") 
    }
    else{
        event.target.classList.remove("fa-eye-slash")
        event.target.classList.add("fa-eye")
        document.getElementById("password").setAttribute("type", "text") 
    }
})