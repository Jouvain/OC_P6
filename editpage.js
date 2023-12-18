

//affiche/cache les éléments d'édition selon présence/absence du token
export function revealEditMode(token){
    let displayPro = ""
    let displayFree = ""
    if(token === null){
        displayPro = "none"
        displayFree = "flex"
    }
    else{
        displayPro = "flex"
        displayFree ="none"
    }
    document.querySelector(".callModale__link").style.display=displayPro
    document.querySelector(".logoutClicker").style.display=displayPro
    document.querySelector(".editHeader").style.display=displayPro
    document.querySelector(".loginClicker").style.display=displayFree

    document.querySelector(".logoutClicker").addEventListener("click", ()=>{
        window.localStorage.removeItem("key")
        location.assign("/index.html")
    })
}

export function generateSelectOptions(listeWorks){
    //création d'un set pour lister les catégories sans doublon
    const categoriesSet = generateSet(listeWorks)
    //récupération du "select" récipiendaire
    const formulaire = document.getElementById("category")
    //ajout des catégories au select
    categoriesSet.forEach((element) =>{
        const option = document.createElement("option")
        switch(element){
            case "Appartements":
                option.value = 2
                break
            case "Hotels & restaurants":
                option.value = 3
                break
            default:
                option.value = 1
        }
        option.innerText = element
        formulaire.appendChild(option)
    })
    console.log(categoriesSet)
}