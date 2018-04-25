import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppConstants {
  endPoints: any;
  constructor(private http: Http) { }
  loadAPIService() {
    return new Promise((resolve) => {
      this.http.get('./assets/appConfig/apiservices.json').map(res => res.json())
        .subscribe(config => {
          this.endPoints = config.constants;
          resolve();
        });
    });
  }

}
