import { Component } from '@angular/core';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebootcamp-crm';

  titleChanged(event) {
    console.log('title was changed', event);
    this.title = event.target.value;
  }

}
