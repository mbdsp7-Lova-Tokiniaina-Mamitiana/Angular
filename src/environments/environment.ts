// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpoint: 'http://localhost:8010/api',
  //endpoint: 'https://pari-node.herokuapp.com/api',
    photo_endpoint : 'http://localhost:8010/',
    //photo_endpoint : 'https://pari-node.herokuapp.com/',
    node_endpoint: 'http://localhost:8010/api',
    //node_endpoint: 'https://pari-node.herokuapp.com/api',
    grails_endpoint: 'https://mbdsp7-grails-app.herokuapp.com/',
  qr_code_endpoint: 'https://unitag-management-api.p.rapidapi.com/lives',
  qr_code_key: '11d1f7eaa5msh8d72fecedf4d594p113a02jsne2fc50e762f6'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
