import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as $ from "jquery";
import { AppModule } from './app.module';
import { KeycloakService } from './keycloak.service';
platformBrowserDynamic().bootstrapModule(AppModule); 


 $.getJSON('./assets/appConfig/keycloak.json', (keycloakData) => {
   console.log(keycloakData)
     KeycloakService.init(keycloakData)
       .then(() => {
         const platform = platformBrowserDynamic();
         platform.bootstrapModule(AppModule);
       })
       .catch(err => console.log(err));
  
   });