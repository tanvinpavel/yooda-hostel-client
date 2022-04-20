import axios from "./api/axios";
import useAuthContext from "./hooks/useAuthContext";

const getChangesValue = (newObj, oldObj) => {
    if (Object.keys(oldObj).length === 0 
        && Object.keys(newObj).length > 0)
        return newObj;

    let diff = {};
    for (const key in oldObj) {
        if (newObj[key] && oldObj[key] !== newObj[key] ) {
            diff[key] = newObj[key]; 
        }
    }

    if (Object.keys(diff).length > 0) 
        return diff;
    
    return diff;
}

const currentDate = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth()+1).padStart(2,'0');
    let currentDate = String(today.getDate()).padStart(2,'0');

    let formateDate = year+"-"+month+"-"+currentDate;

    return formateDate;
}

export {getChangesValue, currentDate };