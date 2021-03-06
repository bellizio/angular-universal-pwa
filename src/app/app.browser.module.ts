import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    AppModule,
    // this uses the service worker generated by Angular service worker
    // remove/comment the line below if registerWorkboxSW() is called in the constructor
    environment.production ? ServiceWorkerModule.register('./ngsw-worker.js') : []
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent]
})

export class AppBrowserModule {

  constructor() {
    // this.registerWorkboxSW();
  }

  // this uses the service worker generated by Workbox
  // ngsw-worker should not be registered if registerWorkboxSW() is called in the constructor
  registerWorkboxSW(): void {
    if (environment.production) {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('./sw.js').then(registration => {
            console.log('SW registered: ', registration);
          }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
        });
      }
    }
  }
}
