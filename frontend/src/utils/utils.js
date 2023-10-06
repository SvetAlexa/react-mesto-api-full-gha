export const config = {
    url: 'http://localhost:3000',
    // headers: {
    //     "content-type": "application/json",
    //     "authorization": "e120ef7b-11b8-4832-a4ab-a0449fb1174c"
    // }
}

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`${res.status}`);
}