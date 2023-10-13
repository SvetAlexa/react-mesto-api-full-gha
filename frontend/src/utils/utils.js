export const config = {
    url: 'https://api.larsik.nomoredomainsrocks.ru'
}

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`${res.status}`);
}