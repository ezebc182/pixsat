// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    PIXABAY: {
        key: '10397002-c2d687bc4283324cd4f90ab5f',
        endpoint: 'https://pixabay.com/api/'
    },
    ISS: {
        endpoint: 'http://api.open-notify.org/iss-now.json'
    },
    GOOGLE: {
        GEOCODE: {
            endpoint: 'https://maps.googleapis.com/maps/api/geocode/json'
        },
        PLACE: {
            endpoint: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'
        },
        FIREBASE: {
            apiKey: 'AIzaSyCemMirPDJF3qYKnS2u8P5eOxyd3VLB9tg',
            authDomain: 'pixsat-d4641.firebaseapp.com',
            databaseURL: 'https://pixsat-d4641.firebaseio.com',
            projectId: 'pixsat-d4641',
            storageBucket: 'pixsat-d4641.appspot.com',
            messagingSenderId: '275471394807'
        },
        KEY: 'AIzaSyAb5Ddu9xGwyz0VzYD9wZkWdYutqrWF_1E'
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
