import {generateGallery, generateFilterTags, generateModalGallery} from "./galerie.js"
import { revealEditMode, generateSelectOptions } from "./editpage.js"

/*
const storedToken = window.localStorage.getItem("key")
const storedWorks = window.localStorage.getItem("worklist")
console.log(storedToken)
let works =""
if(storedWorks === null){
    const reponse = await fetch("http://localhost:5678/api/works")
    works = await reponse.json()
}
else{
    works = await storedWorks.json()
}
console.log(storedWorks)
console.log(works)
*/

const storedToken = window.localStorage.getItem("key")
const reponse = await fetch("http://localhost:5678/api/works")
const works = await reponse.json()




generateGallery(works)

if(storedToken === null){
    generateFilterTags(works)
}


revealEditMode(storedToken)

const wrapperModal = document.querySelector(".wrapper--modal")
const modalOpener = document.getElementById("OpenModal")
const modalCloser = document.querySelector(".modal__quitIcon")
const photoFormOpener = document.getElementById("photoFormOpener")
const wrapperPhotoForm = document.querySelectorAll(".photoForm")
const title = document.querySelector(".modal__title")
const button = document.getElementById("photoFormOpener")
const photFormReturn = document.querySelector(".modal__returnIcon")


modalOpener.addEventListener("click", () => {
    wrapperModal.style.display = "flex"
    generateModalGallery(works)
    title.innerText="Galerie photo"
    button.innerText="Ajouter une photo"
    document.querySelector(".modal__gallery").style.display = "grid"
})
modalCloser.addEventListener("click", ()=>{
    wrapperModal.style.display = "none"
    wrapperPhotoForm.forEach((element)=>{
        element.style.display = "none"
    })
    button.classList.remove("modal__button--validate")
    deactivateButtonValidate(button)
})


photoFormOpener.addEventListener("click", ()=>{
    wrapperPhotoForm.forEach((element)=>{
        element.style.display = "flex"
    })
    document.querySelector(".modal__gallery").style.display = "none"
    title.innerText="Ajout photo"
    button.innerText="Valider"
    button.classList.add("modal__button--validate")
    activateButtonValidate(button)
})

photFormReturn.addEventListener("click", ()=>{
    wrapperPhotoForm.forEach((element)=>{
        element.style.display = "none"
    })
    document.querySelector(".modal__gallery").style.display = "grid"
    title.innerText="Galerie photo"
    button.innerText="Ajouter photo"
    button.classList.remove("modal__button--validate")
    deactivateButtonValidate(button)
})

const inputAddPicture = document.getElementById("choosedPicture")
const picturingChoice = document.querySelector(".picturingChoice")
let picture =""
inputAddPicture.addEventListener("change", (event)=>{
    console.log(event.target.value)
    picturingChoice.src = URL.createObjectURL(event.target.files[0])
    picture = event.target.files[0]
})

generateSelectOptions(works)

const buttonValidate = document.querySelector(".modal__button--validate")

function activateButtonValidate(element){
    element.addEventListener("click", function(){
        const formData = new FormData()
        const title = document.getElementById("title")
        const category = document.getElementById("category")
        formData.append("image", picture)
        formData.append("title", title.value)
        formData.append("category", category.value)
        console.log(formData)
        console.log(title.value)
        console.log(category.value)
        console.log(picturingChoice.src)
        console.log(picture)
        const checkedToken = window.localStorage.getItem("key")
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {Authorization: `Bearer ${checkedToken}`},
            body: formData,
        })
        .then((response)=>{
            //const newReponse = await fetch("http://localhost:5678/api/works")
            //const newWorks = await newReponse.json()
            //generateGallery(newWorks)
            //generateModalGallery(newWorks)
            wrapperPhotoForm.forEach((element)=>{
                element.style.display = "none"
            })
            button.innerText="Ajouter photo"
            document.querySelector(".modal__gallery").style.display = "grid"
            return response.json()
        }).then((data)=>{
            console.log(data)
            works.push(data)
            generateGallery(works)
            generateModalGallery(works)
            let stringWorks = works
            stringWorks.forEach((element)=>{
                element = JSON.stringify(element)
            })
            window.localStorage.setItem("worklist", stringWorks)
        })   
    })
}

function deactivateButtonValidate(element){
    element.removeEventListener("click", function(){})
}

// TEST //
const test = document.getElementById("test")
test.addEventListener("click", ()=>{
    console.log(works)
    let worklist = window.localStorage.getItem("worklist")
    worklist = JSON.parse(worklist)
    console.log(worklist)
    console.log(worklist[1])
})

/*
buttonValidate.addEventListener("click", function(){
    const formData = new FormData()
    const title = document.getElementById("title")
    const category = document.getElementById("category")
    formData.append("image", picture)
    formData.append("title", title.value)
    formData.append("category", category.value)
    console.log(formData)
    console.log(title.value)
    console.log(category.value)
    console.log(picturingChoice.src)
    console.log(picture)
    const checkedToken = window.localStorage.getItem("key")
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {Authorization: `Bearer ${checkedToken}`},
        body: formData,
    })
    .then(async function(){
        const newReponse = await fetch("http://localhost:5678/api/works")
        const newWorks = await newReponse.json()
        generateGallery(newWorks)
        generateModalGallery(newWorks)
        wrapperPhotoForm.style.display = "none"
    })   
})
*/