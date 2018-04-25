
import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { KeycloakService } from '../app/keycloak.service';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// import { TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService } from 'ng2-translate';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()

export class SharedService {

    constructor(
        // public toastr: ToastsManager,
        private _http: Http,
        private kc: KeycloakService,
        // private translate:TranslateService
    ) { }

    query(url, param): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (let key in param) {
            params.set(key, param[key]);
        }
        return this._http
            .get(url, { search: params })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

     get(url, param): Promise<any> {
      return   this.kc.getToken().then(
          token => {
      let params: URLSearchParams = new URLSearchParams();
        for (let key in param) {
            params.set(key, param[key]);
        }
        let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'X-TenantId': '71a267d2-7a08-11e7-bb31-be2e44b06b34'
        });
        let options = new RequestOptions({ headers:headers, search: params});
        return this._http
            .get(url,options)
            .toPromise()
            .then(this.extractData)
            .catch((error) => { return this.handleError(error) });
      })
    }

    getRequest(url, param): Promise<any> {
        return   this.kc.getToken().then(
            token => {
        let params: URLSearchParams = new URLSearchParams();
          for (let key in param) {
              params.set(key, param[key]);
          }
          let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'X-TenantId': '71a267d2-7a08-11e7-bb31-be2e44b06b34'
          });         
          let options = new RequestOptions({ headers:headers, search: params});
          return this._http
              .get(url,options)
              //.timeout(5000)
              .toPromise()
              .then(this.extractWithInfo)
              .catch((error) => {                  
                   return this.handleError(error) 
                });
        })
      }

    getFile(url, param): Promise<any> {
        return   this.kc.getToken().then(
            token => {
        let params: URLSearchParams = new URLSearchParams();
          for (let key in param) {
              params.set(key, param[key]);
          }
          let headers = new Headers({
            'Authorization': 'Bearer ' + token,
          });
          let options = new RequestOptions({ headers:headers, search: params});
          return this._http
              .get(url,options)
              .toPromise()
              .then(this.extractBlobData)
              .catch((error) => { return this.handleError(error) });
        })
      }

    post(url, data): Promise<any> {
        return   this.kc.getToken().then(
          token => {
        let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'X-TenantId': '71a267d2-7a08-11e7-bb31-be2e44b06b34'
        });
        let options = new RequestOptions({ headers:headers});
        return this._http.post( url, data, options).toPromise()
            .then(this.extractData)
/*             .then(res => {
                var location = res.headers.get('location');
                return location;
            }) */
            .catch((error) => { return this.handleError(error) });
          })
    }


    put(url, data): Promise<any> {
       return   this.kc.getToken().then(
          token => {
        let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'X-TenantId': '71a267d2-7a08-11e7-bb31-be2e44b06b34'
        });
        let options = new RequestOptions({ headers:headers});
        return this._http.put( url, data, options)
          .toPromise()
          .then(this.extractData)
          .catch((error) => { return this.handleError(error) });
      })
    }

    delete(url): Promise<any> {
         return   this.kc.getToken().then(
          token => {
        let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'X-TenantId': '71a267d2-7a08-11e7-bb31-be2e44b06b34'
        });
        let options = new RequestOptions({ headers:headers});
        return this._http.delete(url, options)
            .toPromise()
            .then(this.extractData)
            .catch((error) => { return this.handleError(error) });
          })
    }


    private extractData(res: Response) {
        if (res instanceof Response) {     
            if(res['_body'] == null || res['_body']==""){
            let body = {};
            body['returnCodestatus'] = res.status;           
            return body;
         }else{
            let body = res.json();
            body['returnCodestatus'] = res.status;            
            return body;
         }
        }   
    }

    private extractBlobData(res: Response) {
        if (res instanceof Response) {  
            if(res['status']==200)
            return res['_body'];
            else
            return null;
        }        
    }
    private extractWithInfo(res: Response) {
        if (res instanceof Response) {       
            let obj = {};
            obj["headers"] = res.headers;
            obj["ok"] = res.ok;
            obj["status"] = res.status;
            obj["statusText"] = res.statusText;
            obj["type"] = res.type;
            obj["url"] = res.url;
            obj["data"] = res['_body'];
            return Promise.resolve(obj); 
        }    
         
    }

    // private handleError(error: Response | any) {
    //     // In a real world app, we might use a remote logging infrastructure
    //     let errMsg: string;
    //     if (error instanceof Response) {
    //         const body = error.json() || '';

    //         let err = body.error || JSON.stringify(body);

    //         errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //     } else {
    //         errMsg = error.message ? error.message : error.toString();
    //     }

    //     return Promise.reject(errMsg);
    // }
    private handleError(error: Response | any) {
        if (error instanceof Response) {            
            let obj = {};
            obj["headers"] = error.headers;
            obj["ok"] = error.ok;
            obj["status"] = error.status;
            obj["statusText"] = error.statusText;
            obj["type"] = error.type;
            obj["url"] = error.url;
            if (error.status == 503 ){
                // this.toastr.error(this.translate.instant("administration_serviceUnavailableError_label"));
            }               
            return Promise.reject({response:obj,error:error.json()});
        }

    }
}
