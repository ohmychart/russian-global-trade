import { partnerGoods as dataURL } from '$data/dataPaths.js';

export async function get({params}) {
    const response = await fetch(dataURL(params.partner));
    const result = await response.json();
    const body = {
        ...result
    }

    return {body};
}