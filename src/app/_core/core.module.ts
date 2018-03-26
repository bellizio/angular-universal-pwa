import { NgModule, ModuleWithProviders } from '@angular/core';
import { ApiService } from './services/api.service';

@NgModule()
export class CoreModule {
  // this is necessary to avoid creating a second service instance in a lazy-loaded module
  // see here for explanation: https://angular-2-training-book.rangle.io/handout/modules/shared-di-tree.html
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [ApiService]
    };
  }
}
