import * as module from "./fonctions.js"

// récupération du token et des travaux
const storedToken = window.localStorage.getItem("key")
const reponse = await fetch("http://localhost:5678/api/works")
let works = await reponse.json()

// génération de la page
module.generateGallery(works)
if(storedToken === null){
    module.generateFilterTags(works)
}
module.revealEditMode(storedToken)

// récupération d'éléments du DOM réutilisés
const wrapperPhotoForm = document.querySelectorAll(".photoForm")
const wrapperDeleteForm = document.querySelectorAll(".deleteForm")
let picture =""

// gestion d'évènement pour les boutons d'édition (modale comprise)
const modalOpener = document.getElementById("OpenModal")
modalOpener.addEventListener("click", () => {
    document.querySelector(".wrapper--modal").style.display = "flex"
    module.generateModalGallery(works)
    document.querySelector(".modal__title").innerText="Galerie photo"
    document.querySelector(".modal__gallery").style.display = "grid"
})
const modalCloser = document.querySelector(".modal__quitIcon")
modalCloser.addEventListener("click", ()=>{
    document.querySelector(".wrapper--modal").style.display = "none"
})
const photoFormOpener = document.getElementById("photoFormOpener")
photoFormOpener.addEventListener("click", ()=>{
    module.wrapUnwrap(wrapperPhotoForm, "flex")
    document.querySelector(".modal__title").innerText="Ajout photo"
    module.wrapUnwrap(wrapperDeleteForm, "none")
    module.generateSelectOptions(works)
})
const photFormReturn = document.querySelector(".modal__returnIcon")
photFormReturn.addEventListener("click", ()=>{
    module.wrapUnwrap(wrapperPhotoForm, "none")
    module.wrapUnwrap(wrapperDeleteForm, "flex")
    document.querySelector(".modal__gallery").style.display = "grid"
    document.querySelector(".modal__title").innerText="Galerie photo"
})
const inputAddPicture = document.getElementById("choosedPicture")
const picturingChoice = document.querySelector(".picturingChoice")
inputAddPicture.addEventListener("change", (event)=>{
    picturingChoice.src = URL.createObjectURL(event.target.files[0])
    picture = event.target.files[0]
})
// gestion des display, requête et actualisation des travaux
document.querySelector(".modal__button--validate").addEventListener("click", ()=>{
    const formData = new FormData()
    const title = document.getElementById("title")
    const category = document.getElementById("category")
    formData.append("image", picture)
    formData.append("title", title.value)
    formData.append("category", category.value)
    const checkedToken = window.localStorage.getItem("key")
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {Authorization: `Bearer ${checkedToken}`},
        body: formData,
    })
    .then((response)=>{
        module.wrapUnwrap(wrapperPhotoForm, "none")
        module.wrapUnwrap(wrapperDeleteForm, "flex")
        document.querySelector(".modal__gallery").style.display = "grid"
        return response.json()    
    })
    .then(async()=>{
        const newResponse = await fetch("http://localhost:5678/api/works")
        works = await newResponse.json()
        module.generateGallery(works)
        module.generateModalGallery(works)     
    }) 
})
    
    


    







