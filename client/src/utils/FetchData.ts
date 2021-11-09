import axios from 'axios'


export const getAPI = async (url: string, token?: any) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: token }
    })

    return res;
}

export const postAPI = async (url: string, post: object, token?: any) => {
    const res = await axios.post(`/api/${url}`, post, {
        headers: { Authorization: token }
    })

    return res;
}
