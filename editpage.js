import {generateGallery, eraseGallery, generateFilterTags, generateModalGallery} from "./galerie.js"



const reponse = await fetch("http://localhost:5678/api/works")
const works = await reponse.json()
const buttonFilter = document.getElementById("workCategory")



generateGallery(works)

generateFilterTags(works)




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



