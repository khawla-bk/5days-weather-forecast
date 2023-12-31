import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  timeline: any = [];
  currentTime = new Date()
  weatherNow: any
  location: any

  constructor(private forecastService: ForecastService) { }

  ngOnInit(): void {
    this.forecastService.getWeatherForecast().subscribe(data => {
      this.getTodayForecast(data)
    })
  }

  dateRange() {
    const start = new Date();
    start.setHours(start.getHours() + (start.getTimezoneOffset() / 60))
    const to = new Date(start)
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59)
    return { start, to }
  }
  getTodayForecast(today: any) {
    this.location = today.city
    for (const forecast of today.list.slice(0, 8)) {
      this.timeline.push({
        time: forecast.dt_txt,
        temp: forecast.main.temp
      });

      const apiDate = new Date(forecast.dt_txt).getTime();
      const startDate = this.dateRange().start.getTime();
      const endDate = this.dateRange().to.getTime();

      if (startDate <= apiDate && endDate >= apiDate) {
        this.weatherNow = forecast;
        console.log(this.weatherNow)

      }
    }
  }

}
