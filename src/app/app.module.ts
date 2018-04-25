import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { Forecasts } from '../pages/forecasts/forecasts';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { KeycloakService } from './keycloak.service';
import { AppConstants } from "./config.service";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';


export function initConfig(config: AppConstants) {
    return () => config.loadAPIService();
  }

@NgModule({
    declarations: [
        MyApp,
        Forecasts
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp),
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Forecasts
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        KeycloakService, AppConstants,
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConstants], multi: true },
    InAppBrowser

    ]
})
export class AppModule {}