import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Title} from 'angular2/platform/browser';
import {FORM_PROVIDERS} from 'angular2/common';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Http} from 'angular2/http';
import {JwtHelper} from 'angular2-jwt';

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
  
  private _localStorage: any;
  private _email: string;
  constructor(
    public api: Api,
    public appState: AppState,
    public http: Http,
    public jwtHelper: JwtHelper,
    public router: Router,
    public title: Title
  ) {
    this._localStorage = localStorage;
    var token = localStorage.getItem('id_token');
    console.log( {token} );
    try {
      console.log(
        this.jwtHelper.decodeToken(token),
        this.jwtHelper.getTokenExpirationDate(token),
        this.jwtHelper.isTokenExpired(token)
      );
      this._email = this.jwtHelper.decodeToken(token).email;
    } catch (err) {
      console.log( err );
    }
  }
  logout() {
    localStorage.removeItem("id_token")
  }
}
