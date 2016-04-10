import {Component, OnInit} from 'angular2/core';
import {AuthHttp, JwtHelper} from 'angular2-jwt';
import {Http} from 'angular2/http';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'about',
  template: `
    <p>Login</p>
    <div>
      <input type="text" #input>
      <button (click)="login(input, $event)">ログイン</button>
    </div>
    <div>
      <button (click)="showToken()">token確認</button>
    </div>
  `,
  styles: [``],
  providers: [],
  directives: [],
  pipes: []
})
export class Login implements OnInit {
  constructor(
    public authHttp: AuthHttp,
    public http: Http
  ) {
  }
  login() {
    this.http.get("/auth").subscribe(data=>{
      let token = data.json();
      Cookie.setCookie('token', token);
      console.log( "set Cookie", {token} );
    });
  }
  showToken() {
    let token = Cookie.getCookie('token');
    console.log( {token} );
  }
  ngOnInit() {
    console.log('Hello Login');
  }
}
