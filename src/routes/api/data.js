import { data as dataURL } from '$data/dataPaths.js';

export async function get() {
    const response = await fetch(dataURL);
    const result = await response.json();

    const data = Object.entries(result).map( (entry) => {
        return {
            ...entry[1],
            country: entry[0]
        }
    });
    
    const body = {
        data
    }

    return {body};
}