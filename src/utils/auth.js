'use strict';

export function getCookie(name) {
    //Lägg alla kakor i array, kolla igenom om en kaka matchar jwt=
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

//Funktion som kollar om användare har jwt cookie
export function checkUser() {
    const tokenCookie = getCookie('jwt');
    //Om inte cookie finns, returnera false
    if (!tokenCookie) {
        return false;
    } else {
        //annars returnera true
        return true;
    }
}
