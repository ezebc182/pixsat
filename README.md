# International Space Station

### ISS tracking position in real-time, rendered in a Google Maps map. Just it.


#### Demo
The app is deployed in firebase. See live demo [here](https://pixsat-9e582.firebaseapp.com/)

#### Description
Angular app wich consists in
* Render a map with current ISS location.
* Track position in real-time.
* Retrieve cities names from current ISS position.
* Get photos or videos of cities/countries/places bassed on current ISS position.

#### API's
* [Google Reverse geocode](https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding): For lookup cities given latitude and longitude.
* [Pixabay](https://pixabay.com/api/docs/) : Used to get some CC0 Licensed Photos & Videos.
* [wherettheissat](https://wheretheiss.at/w/developer) : The core, it is used for track ISS position.

#### Stack
* Angular 6
* [Angular Material](https://material.angular.io)

#### Postman documentation
For more information about endpoints and API's calls, refer to https://documenter.getpostman.com/view/4094384/RWguvbKv


#### i18n?
Yes, of course! Supporting English and Spanish.

#### How to test?
Just run ```ng test```
