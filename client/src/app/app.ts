import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Title} from 'angular2/platform/browser';
import {FORM_PROVIDERS} from 'angular2/common';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Http} from 'angular2/http';

import '../style/app.scss';

import {AppState} from "./app.state";
import {Api} from './services/api/api';
import {Home} from './components/home/home';
import {About} from "./components/about/about";
import {PlayApi} from "./components/play-api";
import {Login} from "./components/login";
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app', // <app></app>
  providers: [...FORM_PROVIDERS, Api, Title],
  directives: [...ROUTER_DIRECTIVES],
  pipes: [],
  styles: [require('./app.scss')],
  template: require('./app.html')
})
@RouteConfig([
  {path: '/', component: Home, name: 'Home'},
  {path: '/about', component: About, name: 'About'},
  {path: '/play-api', component: PlayApi, name: 'PlayApi'},
  {path: '/login', component: Login, name: 'Login'}
])
export class App {
  url: string = 'https://github.com/preboot/angular2-webpack';
  
  public is_logged_in: boolean;
  constructor(
    public api: Api,
    public appState: AppState,
    public http: Http,
    public router: Router, public title: Title
  ) {
    this.appState.set("is_logged_in", Cookie.getCookie('token') );
    localStorage.setItem("id_token", Cookie.getCookie('token') );
    console.log( "localStorage", localStorage );
    this.is_logged_in = this.appState.get().is_logged_in;
    this.subscribeTitle();
  }
  subscribeTitle() {
    this.router.subscribe((url)=>{
      console.log( url );
      this.title.setTitle(getTitleFor(url));
    });
    function getTitleFor(url: string) {
      return "angular2";
    }
  }
  logout() {
    this.appState.set("is_logged_in", false );
    this.is_logged_in = false;
    Cookie.deleteCookie('token');
    console.log( "delete Cookie: token" );
  }
}
