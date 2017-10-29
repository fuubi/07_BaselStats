import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactAndLinksPage } from '../pages/contact-and-links/contact-and-links';
import { HoloLensPage } from '../pages/holo-lens/holo-lens';
import { MapPage } from '../pages/map/map';
import { ApiPage } from '../pages/api/api';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

            // used for an example of ngFor and navigation
            this.pages = [
            {title: 'Home', component: HomePage},
            {title: 'About', component: AboutPage},
            {title: 'Contacts and Links', component: ContactAndLinksPage},
            {title: 'Holo Lens', component: HoloLensPage},
            {title: 'Statistic Data Api', component: ApiPage},
            {title: 'Map', component: MapPage}
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
