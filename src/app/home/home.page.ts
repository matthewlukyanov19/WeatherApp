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
  weatherEmoji: string = '';
  errorMessage: string = '';

  constructor(
    private weatherService: WeatherService,
    private navCtrl: NavController,
    private geolocation: Geolocation
  ) {}

  navigateToDetails() {
    this.navCtrl.navigateForward('/details');
  }

  getWeather() {
    this.errorMessage = '';
    this.weatherService.getWeather(this.city).subscribe(
      data => {
        this.weather = data;
        this.setWeatherEmoji();
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
          this.setWeatherEmoji();
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

  setWeatherEmoji() {
    const temp = this.weather.main.temp;
    const description = this.weather.weather[0].description.toLowerCase();

    if (description.includes('rain')) {
      this.weatherEmoji = '🌧️';  // Rain emoji
    } else if (temp > 25) {
      this.weatherEmoji = '☀️';  // Sun emoji
    } else if (description.includes('cloud')) {
      this.weatherEmoji = '☁️';  // Cloud emoji
    } else {
      this.weatherEmoji = '';  // No emoji for other conditions
    }
  }
}

