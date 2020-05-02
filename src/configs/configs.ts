export const appConfig = {
    apiUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://resella.herokuapp.com',
    accountServiceUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : 'https://resella-account.herokuapp.com',
    productServiceUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:5002' : 'https://resella-product.herokuapp.com',
    googleClientId: '1019516191359-n1kp8l2diarp6292mthbhfih6j1789mq.apps.googleusercontent.com',
    googleSecretId: 'v-D8In-JDvePMnRneNnxCT0v',
    facebookClientId: '1063563020718887',
    imageBBKey: 'f862032b88474acbeb542037b2ae982b',
    imageBBUrl: 'https://api.imgbb.com/1/upload'
}