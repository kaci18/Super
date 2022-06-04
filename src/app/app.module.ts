import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';	
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TetrisCoreModule } from 'ngx-tetris';
import { IntroComponent } from './intro/intro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { HistoryComponent } from './history/history.component';
import { FilterPipe, SortByPipe, SortScoresPipe } from '../app/pipes.pipe';
import { RouterModule } from '@angular/router';
import { HighscoresComponent } from './highscores/highscores.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    GameComponent,
    HistoryComponent,
    FilterPipe,
    SortByPipe,
    SortScoresPipe,
    HighscoresComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TetrisCoreModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'game/:color', component: GameComponent },
      { path: 'intro', component: IntroComponent },
      { path: 'highscores', component: HighscoresComponent },
      { path: '**', redirectTo: 'intro' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}