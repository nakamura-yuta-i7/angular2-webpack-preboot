import {enableProdMode, provide} from "angular2/core";
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, PathLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {AuthHttp, AuthConfig} from 'angular2-jwt';

// Angular2 @LocalStorage
// https://github.com/marcj/angular2-localStorage
// 
// var appPromise = bootstrap(MyRootAppComponent);
// // register LocalStorage, this registers our change-detection.
// import {LocalStorageSubscriber} from 'angular2-localstorage/LocalStorageEmitter';
// LocalStorageSubscriber(appPromise);

const ENV_PROVIDERS = [];
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'build') {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app';
import {AppState} from "./app/app.state";

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
  return bootstrap(App, [
    // These are dependencies of our App
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ...ENV_PROVIDERS,
    ...[AppState],
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig({
          noJwtError: true
        }), http);
      },
      deps: [Http]
    }),
    provide(LocationStrategy, {useClass: PathLocationStrategy}) // use #/ routes, remove this for HTML5 mode
  ])
  .catch(err => console.error(err));
});
