import {map as CountryCodeMap} from '../data/countryCodeMap.js';

export const getRoutes = () => {
    const routes = ['*'];

    for (let code of Object.values(CountryCodeMap)) {
        routes.push(`/api/goods/${code}.json`);
    }

    return routes;

};