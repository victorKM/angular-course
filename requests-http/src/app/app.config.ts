import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideAnimations(), provideFirebaseApp(() => initializeApp({"projectId":"curso-angular-victork","appId":"1:220420474610:web:aea5359986599b8fe8726b","storageBucket":"curso-angular-victork.firebasestorage.app","apiKey":"AIzaSyCsaM4uSQz8ttICjOt_CNA5lM-89iRaGbQ","authDomain":"curso-angular-victork.firebaseapp.com","messagingSenderId":"220420474610"})), provideRemoteConfig(() => getRemoteConfig())]
};
