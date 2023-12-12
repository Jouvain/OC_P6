
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

