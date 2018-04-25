import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable()
export class KeycloakService {
  static auth: any = {};
  static init(keycloakData): Promise<any> {
    let kyclk = keycloakData;
    let keycloakAuth: any = new Keycloak(kyclk);
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.roles = {};
    KeycloakService.auth.userInfo = {};
    return new Promise((resolve, reject) => {
      keycloakAuth.init({ onLoad: 'login-required', checkLoginIframe: false })
        .success(() => {
          KeycloakService.auth.loggedIn = true;
          KeycloakService.auth.authz = keycloakAuth;
          KeycloakService.auth.logoutUrl = window.location.origin + kyclk.logoutUrl;
          keycloakAuth.loadUserInfo().success(function (userInfo) {
            KeycloakService.auth.userInfo = userInfo;
            /*Lets not use storage to store user data*/
            /*sessionStorage.user_name = userInfo.preferred_username;
            sessionStorage.displayName = userInfo.name;*/
            resolve();
          }).error(function () {
            console.log('Failed to load user info');
          })

        })
        .error(() => {
          reject();
        });
    });
  }

  getRoles() {
    return KeycloakService.auth.roles;
  }

  getLoginInfo() {
    return KeycloakService.auth.userInfo;
  }

  logout() {
    console.log('*** LOGOUT');
    KeycloakService.auth.loggedIn = false;
    var options = { redirectUri: KeycloakService.auth.logoutUrl }
    KeycloakService.auth.authz.logout(options)
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz.updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      }
    });
  }
}
