export const BASE_URL = 'https://api.svetalexa.nomoredomainsrocks.ru'

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`${res.status}`);
}