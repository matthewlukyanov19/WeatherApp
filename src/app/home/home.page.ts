import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  city: string = '';
  weather: any;
  errorMessage: string = '';

  constructor(
    private weatherService: WeatherService,
    private navCtrl: NavController,
    private geolocation: Geolocation // Inject Geolocation
  ) {}

  navigateToDetails() {
    this.navCtrl.navigateForward('/details');
  }

  getWeather() {
    this.errorMessage = '';
    this.weatherService.getWeather(this.city).subscribe(
      data => {
        this.weather = data;
      },
      error => {
        this.errorMessage = 'Could not fetch weather data. Please try again.';
      }
    );
  }

  getCurrentLocationWeather() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const latitude = resp.coords.latitude;
      const longitude = resp.coords.longitude;
      this.weatherService.getWeatherByCoordinates(latitude, longitude).subscribe(
        data => {
          this.weather = data;
        },
        error => {
          this.errorMessage = 'Could not fetch weather data. Please try again.';
        }
      );
    }).catch((error) => {
      console.log('Error getting location', error);
      this.errorMessage = 'Error getting location. Please try again.';
    });
  }
}
