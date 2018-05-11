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
    public: "BDtYpZsfQADeA3zY6lS8sy3LstcjzQj8WIWeoLOX9hNb9eXNO1D4ize_F_fFHRK562VVkqDqI9WwfZHzDE-e2vM",
    private: "mPQR_Fvta98jmY_FKQV0anWtKiEInhu1Ydn1ArldtdY",
    firebase: "BKxOtrfpFp4SgQ2Amtp3KRtcywMSaHlKHYRq5RxW7UAHXaspbApo-sjXm5kjIvNLfU37lYLqhWMjhrczGDX1EIo",
    google: "AIzaSyC9jWOLMy90azFnovlz_XWNJu6MNfDtAjw"
}

export const config = { BASE_URL, HEADERS, KEYS };