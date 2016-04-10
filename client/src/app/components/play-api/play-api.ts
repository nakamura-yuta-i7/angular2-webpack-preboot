import {Component, OnInit} from 'angular2/core';
import {AuthHttp} from 'angular2-jwt';
import {Http} from 'angular2/http';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'play-api',
  template: `
    <p>Play Api</p>
    <main>
      <ul>
        <li *ngFor="#data of apiData">
          <button (click)="requestApi(data.url)">{{data.url}}</button>
        </li>
      </ul>
      <article>{{apiRtnData|json}}
      </article>
    </main>
  `,
  styles: [`
    main {
      display: flex;
      border: 1px solid white;
      text-align:left;
    }
    ul {
      border: 1px solid white;
    }
    article {
      flex:1;
      border: 1px solid white;
      white-space: pre;
      padding: 10px;
      background: RGBA(69, 117, 189, 1.00);
    }
  `],
  providers: [],
  directives: [],
  pipes: []
})
export class PlayApi {
  apiData: any[];
  constructor(
    public authHttp: AuthHttp,
    public http: Http
  ) {
    this.apiData = [
      { url: "/api/users" },
      { url: "/api" },
    ];
  }
  apiRtnData: string;
  requestApi(url: string) {
    this.authHttp.get(url).subscribe(
      data => {
        this.apiRtnData = data.json();
      }
    );
  }
}
