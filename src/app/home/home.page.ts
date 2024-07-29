import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  city: string = '';
  weather: any;

  constructor(
    private weatherService: WeatherService,
    private navCtrl: NavController
  ) {}

  navigateToDetails() {
    this.navCtrl.navigateForward('/details');
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(data => {
      this.weather = data;
    });
  }
}
