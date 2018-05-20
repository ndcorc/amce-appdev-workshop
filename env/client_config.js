const BASE_URL = 'https://2E1DF6F175974BB19E70DE0CACC3D0FC.uscom-central-1.oraclecloud.com:443/mobile/custom/PenFedAPI';
const REGISTRATION_URL = 'https://2E1DF6F175974BB19E70DE0CACC3D0FC.uscom-central-1.oraclecloud.com:443/mobile/platform/devices';
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
const NOTIFICATIONS = {
    notificationToken: "",
    notificationProvider: "APNS",
    mobileClient: {
        "id": "com.creditunion.client.app",
        "version": "1.1",
        "platform": "IOS"
    }
}

export const config = { BASE_URL, REGISTRATION_URL, HEADERS, NOTIFICATIONS };