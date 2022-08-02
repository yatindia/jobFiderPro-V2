import {API} from "./config"
export function protectedRoute(){

    let login = localStorage.getItem("login")

    if(login === null){

        window.location.href = "/"
    }
}

export async function getProfile(){

    let login = localStorage.getItem("login")
    let data;
    if(login !== null){

        await fetch(`${API}/profile/getprofile`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `<Bearer> ${login}`
            }
        })
        .then(res => res.json())
        .then(res => data = res)
        .catch(error => {
            data =  false
        })
    }
    
    return data
    
}


export function tokenData(){

    let token = localStorage.getItem("login")
    let split = token?.split(".")
    // @ts-ignore
    let data = JSON.parse(atob(split[1]))
    return data

    
}