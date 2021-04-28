import axios from "axios";

axios.defaults.baseURL = "https://pmt-proj-default-rtdb.europe-west1.firebasedatabase.app";

const responseBody = (response) => response.data;

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    del: (url) => axios.delete(url).then(responseBody),
};

const Topics = {
    list: () => requests.get("/Topics.json"),
    details: (id) => requests.get(`/Topics/${id}.json`),
    create: (topic) => requests.post("/Topics.json", topic),
    update: (topic, id) => requests.put(`/Topics/${id}.json`, topic),
    delete: (id) => requests.del(`/Topics/${id}.json`),
}

const Articles = {
    list: () => requests.get("/Articles.json"),
    details: (id) => requests.get(`/Articles/${id}.json`),
    create: (article) => requests.post("/Articles.json", article),
    update: (article, id) => requests.put(`/Articles/${id}.json`, article),
    delete: (id) => requests.del(`/Articles/${id}.json`),
};

export default {
    Articles,
    Topics
};
