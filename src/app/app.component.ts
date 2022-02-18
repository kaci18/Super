import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'projekt_pr';
  public showPage: string = 'intro'; //change pages - intro/game

  public isLogged: boolean = false;
  public playerName: string = '';

  public changePage($event: MouseEvent) {
    this.showPage = ($event.target as HTMLButtonElement).value;
  }

  public getPlayerData($event: string) {
    this.playerName = $event;
  }

  public chanegeLoginStatus($event: boolean) {
    this.isLogged = $event;
  }
}
