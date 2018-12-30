import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-robo-pass';

    searchInput: FormControl;

    constructor(
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
    }
}
