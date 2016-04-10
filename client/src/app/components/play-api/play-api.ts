import {Component, OnInit} from 'angular2/core';
import {AuthHttp} from 'angular2-jwt';
import {Http} from 'angular2/http';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'play-api',
  template: `
    <p>Play Api</p>
    <ul>
      <li>
        <button (click)=" requestApi('/api/users') ">/api/users</button>
      </li>
    </ul>
  `,
  styles: [``],
  providers: [],
  directives: [],
  pipes: []
})
export class PlayApi {
  constructor(
    public authHttp: AuthHttp,
    public http: Http
  ) {}
  requestApi(url: string) {
    this.authHttp.get(url).subscribe(data=>{
      console.log( data.json() );
    })
  }
}
