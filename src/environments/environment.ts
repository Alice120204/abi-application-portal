// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false
};
const firebaseConfig = {
  apiKey: "AIzaSyAP4MUlPcQYHhozNcBFcx87QI5MdU2QD90",
  authDomain: "abi-application-portal-d678a.firebaseapp.com",
  projectId: "abi-application-portal-d678a",
  storageBucket: "abi-application-portal-d678a.appspot.com",
  messagingSenderId: "1024902460995",
  appId: "1:1024902460995:web:0f1665007750c59eef86f6",
  measurementId: "G-0N8N3MLD6Z"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
