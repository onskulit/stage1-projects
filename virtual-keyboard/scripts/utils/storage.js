 const storageSet = (name, value) => {
    window.localStorage.setItem(name, value);
 }

 const storageGet = (name) => {
    return window.localStorage.getItem(name);
 }

 export { storageSet, storageGet }