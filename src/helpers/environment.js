let APIURL = '';

switch (window.location.hostname) {

    case 'localhost' || '127.0.0.1':

        APIURL = 'http://localhost:3000';
        break;

        case 'liquorlab-client.herokuapp.com':

        APIURL = 'https://liquorlab-client.herokuapp.com'
}

export default APIURL;