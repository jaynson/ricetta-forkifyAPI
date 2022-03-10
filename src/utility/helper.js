import { TIMEOUT_SECS } from "./config";


const timeout = (s) => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Request took too long! Timeout after ${s} seconds`));
        }, s * 1000);
    });
};

export const getJSON = async (url) => {

    try {
        const fetchPromise = fetch(url);
        const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SECS)]);
        const data = await res.json();
        console.log(res, data);
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
};

export const sendJSON = async (url, uploadData) => {

    try {
        const fetchPromise = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData),
        });
        const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SECS)]);
        const data = await res.json();
        console.log("SENDDING", res, data);
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
};

export const createRecipeObject = function (data) {
    return {
        id: data.id,
        title: data.title,
        publisher: data.publisher,
        sourceUrl: data.source_url,
        imageUrl: data.image_url,
        servings: data.servings,
        cookingTime: data.cooking_time,
        ingredients: data.ingredients,
        ...(data.key && { key: data.key }),
    };
};

export const persistBookmarks = (bookmarkList) => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
};