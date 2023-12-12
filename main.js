import {generateGallery, eraseGallery, generateFilterTags, generateModalGallery} from "./galerie.js"
import { revealEditMode } from "./editpage.js"


const storedToken = window.localStorage.getItem("key")
console.log(storedToken)


const reponse = await fetch("http://localhost:5678/api/works")
const works = await reponse.json()
const buttonFilter = document.getElementById("workCategory")


console.log(works)
generateGallery(works)

if(storedToken === null){
    generateFilterTags(works)
}


revealEditMode(storedToken)

const wrapperModal = document.querySelector(".wrapper--modal")
const modalOpener = document.getElementById("OpenModal")
const modalCloser = document.querySelector(".modal__quitIcon")

modalOpener.addEventListener("click", () => {
    wrapperModal.style.display = "flex"
    generateModalGallery(works)
})
modalCloser.addEventListener("click", ()=>{
    wrapperModal.style.display = "none"
})

const photoFormOpener = document.getElementById("photoFormOpener")
const wrapperPhotoForm = document.querySelector(".wrapper--photoForm")
const photoFormCloser = document.querySelector(".modal__quitIcon--photo")
const photFormReturn = document.querySelector(".modal__returnIcon")
photoFormOpener.addEventListener("click", ()=>{
    wrapperPhotoForm.style.display = "flex"
})
photoFormCloser.addEventListener("click", ()=>{
    wrapperPhotoForm.style.display = "none"
    wrapperModal.style.display = "none"
})
photFormReturn.addEventListener("click", ()=>{
    wrapperPhotoForm.style.display = "none"
})