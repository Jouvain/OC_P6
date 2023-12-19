/************ FONCTIONS POUR GALERIE **********/

// reset galerie puis créé/attribue/injecte les élements de la galerie selon array reçu
export function generateGallery(listeWorks){
    const gallery = document.querySelector(".gallery")
    eraseGallery()
    listeWorks.forEach(function(element){
        const container = document.createElement("figure")
        gallery.appendChild(container)
        const image = document.createElement("img")
        image.setAttribute("src", element.imageUrl)
        container.appendChild(image)
        const title = document.createElement("figcaption")
        title.innerText = `${element.title}`
        container.appendChild(title)
        }
    )
}

// retire les figures de la galerie du DOM 
export function eraseGallery(){
    const figures = document.querySelectorAll(".gallery figure")
    figures.forEach((element) => element.remove())
}

// création set pour lister catégories sans doublons
export function generateSet(listeWorks){
    const set = new Set()
    set.add("Tous") 
    listeWorks.forEach(function(element){
        set.add(element.category.name)
    })
    return set
}

// génération des boutons-filtres
export function generateFilterTags(listeWorks){
    //création du set
    const categoriesSet = generateSet(listeWorks)
    //création et positionnement du conteneur
    const portfolio = document.getElementById("portfolio")
    const filterTags = document.createElement("div")
    filterTags.setAttribute("class", "filterTags")
    const gallery = document.querySelector(".gallery")
    portfolio.insertBefore(filterTags, gallery)
    //création des boutons et du filtre au clic
    const categoriesSetIter = categoriesSet.values()
    categoriesSet.forEach(function(element){
        const buttonTag = document.createElement("button")
        buttonTag.value = categoriesSetIter.next().value
        buttonTag.innerText = buttonTag.value
        filterTags.appendChild(buttonTag)
        buttonTag.addEventListener("click", function(){
            eraseGallery()
            if (buttonTag.value === "Tous"){
                generateGallery(listeWorks)
            }
            else{
                const categoryFilter = listeWorks.filter((element) => element.category.name === buttonTag.value)
                generateGallery(categoryFilter)
            }}
        )
    })
}
    
/*************** FONCTIONS POUR EDITMODE ********************/

export function generateModalGallery(listeWorks){
    //reset des images éventuellement déjà chargées
    const figures = document.querySelectorAll(".modal__gallery figure")
    figures.forEach((element) => element.remove())
    // création des conteneurs et éléments
    const modalGallery = document.querySelector(".modal__gallery")
    listeWorks.forEach(function(element){
        const container = document.createElement("figure")
        container.setAttribute("class", "modal__figure")
        modalGallery.appendChild(container)
        const image = document.createElement("img")
        image.setAttribute("src", element.imageUrl)
        container.appendChild(image)
        const iconBgColor = document.createElement("div")
        iconBgColor.setAttribute("class", "modal__iconBgColor")
        container.appendChild(iconBgColor)
        const icon = document.createElement("i")
        icon.setAttribute("class", "fa-solid fa-trash-can modal__icon")
        icon.value = element.id
        iconBgColor.appendChild(icon)
        //requête pour effacer selon valeur de l'icone(donc de l'élement)
        icon.addEventListener("click", (event)=>{
            const targetId = event.target.value
            const checkedToken = window.localStorage.getItem("key")
            fetch(`http://localhost:5678/api/works/${targetId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${checkedToken}`}
            })
            //SI OK supprime l'élement du DOM, actualise la liste de travaux et regénère la galerie
            .then((response) =>{
                if(response.ok){
                    container.remove()
                    const index = listeWorks.indexOf(element)
                    listeWorks.splice(index, 1)
                    generateGallery(listeWorks)
                }
                else{
                    console.log("échec de la suppression")
                }
            })
        })
    })
}

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

//création d'un set pour lister les catégories sans doublon puis ajoute en option
export function generateSelectOptions(listeWorks){
    const categoriesSet = generateSet(listeWorks)
    categoriesSet.forEach((element)=>{
        if (element === "Tous"){
            categoriesSet.delete(element)
        }
    })//effacer pour éviter cumuls à la répétition
    const formulaire = document.getElementById("category")
    document.querySelectorAll("option").forEach((element)=>{
        element.remove()
    })
    const option = document.createElement("option")
    option.value = ""
    formulaire.appendChild(option)
    categoriesSet.forEach((element) =>{
        const option = document.createElement("option")
        switch(element){//category = integer (cf swagger) donc besoin de chiffrer les valeurs
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
}

// valeur "text" de "flexOrNone" pour définir display de l'elementMultiple
export function wrapUnwrap (elementMultiple, flexOrNone){
    elementMultiple.forEach((element)=>{
        element.style.display = flexOrNone
    })
}




