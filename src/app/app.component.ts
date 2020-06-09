import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sneakers';
  image = "./header/contactLogo.png"
  lat = 52.238350;
  lon = -6.971320;
}
