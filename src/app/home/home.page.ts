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
  // Variables to store user input, weather data, emoji representation, and error messages
  city: string = '';  // The city name input by the user
  weather: any;  // Object to hold the fetched weather data
  weatherEmoji: string = '';  // String to hold the corresponding weather emoji
  errorMessage: string = '';  // String to display error messages

  // Injecting the necessary services into the component's constructor
  constructor(
    private weatherService: WeatherService, 
    private navCtrl: NavController,  
    private geolocation: Geolocation  
  ) {}

  // Method to navigate to the details page
  navigateToDetails() {
    this.navCtrl.navigateForward('/details');
  }

  // Method to fetch weather data based on the city name input by the user
  getWeather() {
    this.errorMessage = '';  // Clear any previous error messages
    this.weatherService.getWeather(this.city).subscribe(
      data => {
        this.weather = data;  
        this.setWeatherEmoji();  
      },
      error => {
        this.errorMessage = 'Could not fetch weather data. Please try again.';  // Display error message if API call fails
      }
    );
  }

  // Method to fetch weather data based on the user's current location
  getCurrentLocationWeather() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const latitude = resp.coords.latitude;
      const longitude = resp.coords.longitude;
      this.weatherService.getWeatherByCoordinates(latitude, longitude).subscribe(
        data => {
          this.weather = data;  // Assign fetched data to the weather object
          this.setWeatherEmoji();  
        },
        error => {
          this.errorMessage = 'Could not fetch weather data. Please try again.';  
        }
      );
    }).catch((error) => {
      console.log('Error getting location', error);  // Log the error if location fetch fails
      this.errorMessage = 'Error getting location. Please try again.';  
    });
  }

  // Method to set an emoji based on the current weather conditions
  setWeatherEmoji() {
    const temp = this.weather.main.temp;  
    const description = this.weather.weather[0].description.toLowerCase();  

    if (description.includes('rain')) {
      this.weatherEmoji = '🌧️';  
    } else if (temp > 25) {
      this.weatherEmoji = '☀️';  
    } else if (description.includes('cloud')) {
      this.weatherEmoji = '☁️';  
    } else {
      this.weatherEmoji = '';  
    }
  }
}

