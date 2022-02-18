import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TetrisCoreModule } from 'ngx-tetris';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { CoreComponent } from './core/core.component';
import { TimerComponent } from './core/timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CoreComponent,
    TimerComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TetrisCoreModule
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
