export const config = {
    // url: 'https://api.larsik.nomoredomainsrocks.ru'
    url: 'http://localhost:3001'
}

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`${res.status}`);
}