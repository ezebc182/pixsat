// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    pixabay: {
        key: '10397002-c2d687bc4283324cd4f90ab5f',
        endpoint: 'https://pixabay.com/api/'
    },
    nasa: {
        key: '0ciyfwqaXio5djlpZVUYihTOuJjltZwI3tNf1fHm',
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
            apiKey: 'AIzaSyBN5qhUuVq87MhAPkQ79WM9ifg_sWQ2ZcY',
            authDomain: 'pixsat-9e582.firebaseapp.com',
            databaseURL: 'https://pixsat-9e582.firebaseio.com',
            projectId: 'pixsat-9e582',
            storageBucket: '',
            messagingSenderId: '161859528725'
        },
        key: 'AIzaSyAb5Ddu9xGwyz0VzYD9wZkWdYutqrWF_1E'
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
