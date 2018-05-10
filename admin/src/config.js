const BASE_URL = 'https://2E1DF6F175974BB19E70DE0CACC3D0FC.uscom-central-1.oraclecloud.com:443/mobile/custom/PenFedAPI';
const HEADERS = {
    auth: {
        'username': 'nareshbhai.sanodariya@oracle.com',
        'password': 'AppDev@123'
    },
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Oracle-Mobile-Backend-Id': 'a2595484-d848-4015-9173-9c8111ab7e1c'
    }  
}
const KEYS = {
    public: "BPI_fYXR2kLPKwi_eoYsdtNaiyzp-_dQnSjrTUkc2vn37rTQYPaQ17iuTGysAkzxj9NZhgtPp-nTdJ9FdDihZeE",
    private: "lJ6AwW22dj4cGeCTOJ1SNvGpqvz8ZHJfA0nuYSkrAig",
    google: "AIzaSyB9y4yQi3LJL6KiWTl9U2LksO_k4TvdxQE"
}

export const config = { BASE_URL, HEADERS, KEYS };