
export const environment = {
    production: true,
    pixabay: {
        key: '10397002-c2d687bc4283324cd4f90ab5f',
        endpoint: 'https://pixabay.com/api/'
    },
    iss: {
        endpoint: 'http://api.open-notify.org/iss-now.json'
    },
    google: {
        geocode: {
            endpoint: 'https://maps.googleapis.com/maps/api/geocode/json'
        },
        place: {
            endpoint: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'
        },
        firebase: {
            apiKey: 'AIzaSyCemMirPDJF3qYKnS2u8P5eOxyd3VLB9tg',
            authDomain: 'pixsat-d4641.firebaseapp.com',
            databaseURL: 'https://pixsat-d4641.firebaseio.com',
            projectId: 'pixsat-d4641',
            storageBucket: 'pixsat-d4641.appspot.com',
            messagingSenderId: '275471394807'
        },
        key: 'AIzaSyAb5Ddu9xGwyz0VzYD9wZkWdYutqrWF_1E'
    }
};
