import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule
    BrowserModule.withServerTransition({ appId: 'ng-universal-pwa' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {
    const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);

    if (isPlatformBrowser(platformId)) {
      this.registerServiceWorker();
    }
  }

  registerServiceWorker(): void {
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
