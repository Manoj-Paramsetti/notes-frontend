export const config = 
    `${process.env.REACT_APP_MODE}` == 'development'? {
        baseURL: process.env.REACT_APP_BACKEND_HOST,
        mode: process.env.REACT_APP_MODE 
    } : {
        baseURL: '',
        mode: process.env.REACT_APP_MODE
    }