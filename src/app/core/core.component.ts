import {
  Component,
  Input,
EventEmitter,
Output,
ViewChild
} from '@angular/core';

import { TetrisCoreComponent } from 'ngx-tetris';
import { HostListener } from '@angular/core';
import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faUndo,
  faSyncAlt,
  faPlay,
  faPause,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

export interface LogData {
  timePlayed: number;
  timeStamp: number;
  score: number;
  action: string;
}

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faUndo = faUndo;
  faSyncAlt = faSyncAlt;
  faPlay = faPlay;
  faPause = faPause;
  faSignOutAlt = faSignOutAlt;

  @Output() onPageBack: EventEmitter<MouseEvent> = new EventEmitter();
  @Output() loginStatusHandler: EventEmitter<boolean> = new EventEmitter();

  @Input() playerName: string = '';
  @ViewChild(TetrisCoreComponent) private _tetris!: TetrisCoreComponent;

  // te zmienne są inputami w timerach
  public isModalHidden: boolean = true;
  public optionsInFilter: Array<string> = [];
  public score: number = 0;
  public status: string = 'Ready';
  public timePlayed: number = 0;
  public timeStamp: number = 0;

  // TEST DATA
  public historyData: Array<LogData> = [];

  // timer initial data
  private timeoutId: number = 0;
  private timerOn: boolean = false;

  // shows and hides history page
  public handleModalVisibility($event: boolean) {
    this.isModalHidden = $event;
  }

  public countScoreAndTimePlayed() {
    let allScores = this.historyData.map((item) => item.score);
    let allPlayTimes = this.historyData.map((item) => item.timePlayed);
    this.score = Math.max(...allScores);
    this.timePlayed = Math.max(...allPlayTimes);
  }

  // game controls
  public onButtonPressed($event: MouseEvent) {
    switch (($event.target as HTMLButtonElement).value) {
      case 'start':
        this._tetris.actionStart();
        this.status = 'Playing';
        this.timerStart();
        this.logData('Started game');
        ($event.target as HTMLButtonElement).blur();
        break;
      case 'stop':
        this._tetris.actionStop();
        this.status = 'Paused';
        this.timerPause();
        this.logData('Paused game');
        ($event.target as HTMLButtonElement).blur();
        break;
      case 'reset':
        this._tetris.actionReset();
        this._tetris.actionStop();
        this.status = 'Ready';
        this.timerReset();
        this.logData('Restarted game');
        ($event.target as HTMLButtonElement).blur();
        break;

      case 'left':
        this._tetris.actionLeft();
        break;

      case 'right':
        this._tetris.actionRight();
        break;

      case 'down':
        this._tetris.actionDown();
        break;

      case  'rotate':
        this._tetris.actionRotate();
        break;
    }
  }

  //game events
  public onLineCleared() {
    this.score++;
    this.logData('Cleared line');
  }
  public onGameOver() {
    this.timerPause();
    this.status = 'Game over';
    this.logData('Ends game');

    this.generateOptionsInFilter();
    this.countScoreAndTimePlayed();
    this.handleModalVisibility(false);
  }

  //back to intro page
  public onBackClick($event: MouseEvent) {
    this.onPageBack.emit($event);
    this.loginStatusHandler.emit(false);
  }

  //utility functions
  private logData(action: string) {
    this.createTimestamp();
    this.historyData.push({
      action: action,
      score: this.score,
      timePlayed: this.timePlayed,
      timeStamp: this.timeStamp,
    });
  }

  private createTimestamp() {
    this.timeStamp = Date.now();
  }

  private generateOptionsInFilter() {
    let allOptions = this.historyData.map((item) => item.action);
    this.optionsInFilter = [...new Set(allOptions)];
    this.optionsInFilter.unshift('All'); //default option
  }

  //hidden feature - WSAD/Arrows/Space controls
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent($event: KeyboardEvent) {
    switch ($event.code) {
      case 'KeyS':
      case 'ArrowDown':
        this._tetris.actionDown();
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this._tetris.actionLeft();
        break;
      case 'KeyD':
      case 'ArrowRight':
        this._tetris.actionRight();
        break;
      case 'Space':
        this._tetris.actionRotate();
        break;
    }
  }

  //Timer methods
  private timerStart() {
    if (!this.timerOn) {
      this.timerOn = true;
      this.timeoutId = window.setInterval(() => {
        this.timePlayed++;
      }, 1000);
    }
  }
  private timerPause() {
    this.timerOn = false;
    clearInterval(this.timeoutId);
  }
  private timerReset() {
    this.timerPause();
    this.timePlayed = 0;
  }
}
  

