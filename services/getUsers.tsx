import axios from "axios";


export const getAllUsers = async () => (
     await axios
        .get('https://127.0.0.1:8080')
        .then(res => {return res.data})
        .catch(error => {
            console.log(error)
            return null
        })
)

export const getUsersBySearch = async (term: string) => (
    await axios
        .get(`https://127.0.0.1:8080/?term=${term}`)
        .then(res => {return res.data})
        .catch(error => {
            console.log(error)
            return null
        })
)
