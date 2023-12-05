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

// retire les figures du DOM 
export function eraseGallery(){
    const figures = document.querySelectorAll(".gallery figure")
    figures.forEach((element) => element.remove())
}



export function generateFilterTags(listeWorks){
    // création set pour lister catégories sans doublons
    const categoriesSet = new Set()
    categoriesSet.add("Tous") 
    listeWorks.forEach(function(element){
        categoriesSet.add(element.category.name)
    })
    const categoriesSetIter = categoriesSet.values()
    // création des boutons-tags
    const portfolio = document.getElementById("portfolio")
    const filterTags = document.createElement("div")
    const gallery = document.querySelector(".gallery")
    
    filterTags.setAttribute("class", "filterTags")
    portfolio.insertBefore(filterTags, gallery)
    categoriesSet.forEach(function(element){
        const buttonTag = document.createElement("button")
        buttonTag.value = categoriesSetIter.next().value
        buttonTag.innerText = buttonTag.value
        filterTags.appendChild(buttonTag)
        buttonTag.addEventListener("click", function(){
            if (buttonTag.value === "Tous"){
                eraseGallery()
                generateGallery(listeWorks)
            }
            else{
                const categoryFilter = listeWorks.filter((element) => element.category.name == buttonTag.value)
                eraseGallery()
                generateGallery(categoryFilter)
            }}
        )
    })
}
    

export function generateModalGallery(listeWorks){
    const modalGallery = document.querySelector(".modal__gallery")
    const figures = document.querySelectorAll(".modal__gallery figure")
    figures.forEach((element) => element.remove())
    
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
        iconBgColor.appendChild(icon)
        
        }
    )
}







