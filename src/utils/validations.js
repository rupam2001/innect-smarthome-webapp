export function ValidateEmail(email){
    if(!email) return false
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        return true
    return false
}

export function ValidatePassword(password){
    if(!password) return false
    if(password.length >= 8) return true
    return false
}