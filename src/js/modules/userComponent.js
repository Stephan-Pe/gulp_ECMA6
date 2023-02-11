import './user-card.js';
import { fetchData } from './fetch.js';
const API_URL = 'data/data.json';

let globalData = {};



export async function userData() {
    try {
        globalData = await fetchData(API_URL, {
            mode: 'no-cors'
        });
        let userData = globalData.users;
        const userContainer = document.querySelector('#database');
        userData.forEach(user => {
            const el = document.createElement('user-card');
            el.user = user;
            if (userContainer) userContainer.appendChild(el);

        });
    } catch (error) {
        console.log(error);
    }

}



