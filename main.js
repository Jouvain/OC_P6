import * as module from "./fonctions.js"

// récupération du token et des travaux
const storedToken = window.localStorage.getItem("key")
const reponse = await fetch("http://localhost:5678/api/works")
const works = await reponse.json()

// génération de la page
module.generateGallery(works)
if(storedToken === null){
    generateFilterTags(works)
}
module.revealEditMode(storedToken)

// récupération d'éléments du DOM réutilisés
const wrapperPhotoForm = document.querySelectorAll(".photoForm")
const button = document.getElementById("photoFormOpener")
let picture =""

// gestion d'évènement pour les boutons d'édition (modale comprise)
const modalOpener = document.getElementById("OpenModal")
modalOpener.addEventListener("click", () => {
    document.querySelector(".wrapper--modal").style.display = "flex"
    module.generateModalGallery(works)
    document.querySelector(".modal__title").innerText="Galerie photo"
    button.innerText="Ajouter une photo"
    document.querySelector(".modal__gallery").style.display = "grid"
})
const modalCloser = document.querySelector(".modal__quitIcon")
modalCloser.addEventListener("click", ()=>{
    document.querySelector(".wrapper--modal").style.display = "none"
    module.wrapUnwrap(wrapperPhotoForm, "none")
    button.classList.remove("modal__button--validate")
    module.deactivate(button)
})
const photoFormOpener = document.getElementById("photoFormOpener")
photoFormOpener.addEventListener("click", ()=>{
    module.wrapUnwrap(wrapperPhotoForm, "flex")
    document.querySelector(".modal__gallery").style.display = "none"
    document.querySelector(".modal__title").innerText="Ajout photo"
    button.innerText="Valider"
    button.classList.add("modal__button--validate")
    activateButtonValidate(button)
    module.generateSelectOptions(works)
})
const photFormReturn = document.querySelector(".modal__returnIcon")
photFormReturn.addEventListener("click", ()=>{
    module.wrapUnwrap(wrapperPhotoForm, "none")
    document.querySelector(".modal__gallery").style.display = "grid"
    document.querySelector(".modal__title").innerText="Galerie photo"
    button.innerText="Ajouter photo"
    button.classList.remove("modal__button--validate")
    module.deactivate(button)
})
const inputAddPicture = document.getElementById("choosedPicture")
const picturingChoice = document.querySelector(".picturingChoice")
inputAddPicture.addEventListener("change", (event)=>{
    picturingChoice.src = URL.createObjectURL(event.target.files[0])
    picture = event.target.files[0]
})

// FONCTION LOCALE
function activateButtonValidate(element){
    element.addEventListener("click", function(){
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
            wrapperPhotoForm.forEach((element)=>{
                element.style.display = "none"
            })
            button.innerText="Ajouter photo"
            document.querySelector(".modal__gallery").style.display = "grid"
            return response.json()
        }).then((data)=>{
            works.push(data)
            module.generateGallery(works)
            module.generateModalGallery(works)
            /* TEST (exploration du localStorage)
            let stringWorks = works
            stringWorks.forEach((element)=>{
                element = JSON.stringify(element)
            })
            window.localStorage.setItem("worklist", stringWorks)
            */
        })   
    })
}




/*
// TEST (exploration du localStorage) //
const test = document.getElementById("test")
test.addEventListener("click", ()=>{
    console.log(works)
    let worklist = window.localStorage.getItem("worklist")
    worklist = JSON.parse(worklist)
    console.log(worklist)
    console.log(worklist[1])
})
*/

