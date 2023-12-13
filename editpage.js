
export function revealEditMode(key){
    const modalReveler = document.querySelector(".callModale__link")
    const logoutClicker = document.querySelector(".logoutClicker")
    const loginClicker = document.querySelector(".loginClicker")
    const editHeader = document.querySelector(".editHeader")
    if(key === null){
        modalReveler.style.display="none"
        logoutClicker.style.display="none"
        editHeader.style.display="none"
        console.log("NO EDIT")
    }
    else{
        loginClicker.style.display="none"
        modalReveler.style.display="flex"
        logoutClicker.style.display="inherit"
        editHeader.style.display="flex"
    }
    logoutClicker.addEventListener("click", ()=>{
        window.localStorage.removeItem("key")
        location.assign("/index.html")
    })
}

export function generateSelectOptions(listeWorks){
    //création d'un set pour lister les catégories sans doublon
    const categoriesSet = new Set()
    listeWorks.forEach((element) =>{
        categoriesSet.add(element.category.name)
    })
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