
export const environment = {
    production: true,
    pixabay: {
        key: '<your-key>',
        endpoint: 'https://pixabay.com/api/'
    },
    nasa: {
        key: '<your-key>',
        endpoint: 'https://api.nasa.gov/planetary/apod?api_key='
    },
    wheretheissat: {
        endpoint: 'https://api.wheretheiss.at/v1/satellites',
        issID: '25544'
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
            apiKey: '<your-key>',
            authDomain: '<your-project-authdomain>',
            databaseURL: '<your-database-URL>',
            projectId: '<your-project-id>',
            storageBucket: '<your-storage-bucket>',
            messagingSenderId: '<your-messaging-sender-id>'
        },
        key: '<your-key>'
    }
};
