import {generateGallery, eraseGallery, generateFilterTags} from "./galerie.js"



const reponse = await fetch("http://localhost:5678/api/works")
const works = await reponse.json()
const buttonFilter = document.getElementById("workCategory")



generateGallery(works)

generateFilterTags(works)

