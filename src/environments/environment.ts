// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false
};
const firebaseConfig = {
  apiKey: "AIzaSyAOah7B4eof8iM216rMw2mLhuZiqtOMNA0",
  authDomain: "abi-application-portal-6652c.firebaseapp.com",
  projectId: "abi-application-portal-6652c",
  storageBucket: "abi-application-portal-6652c.appspot.com",
  messagingSenderId: "601196775951",
  appId: "1:601196775951:web:3f84b78549e5c5a216717a",
  measurementId: "G-C38FV6D1H8"
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
