import { ThisReceiver } from '@angular/compiler';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { HostListener } from '@angular/core';
import { TetrisCoreComponent } from 'ngx-tetris';
import { GameAction, HistoryEntry } from '../history-entry';
import { Player } from '../player';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  // change number of points
  linesCleared = 0;
  // curent status
  status = 'READY';
  // variable per game time - in seconds
  time: number = 0;
  //interval variable for counting time
  interval:any=[];
  //if the game is currently paused
  paused = true;
  //whether to display information about the end of the game (lost)
  gameOverInfo = false;
  //We change the styles for the array and status by dynamically modifying these variables
  // * if we lose the table is colored red
  boardStyle = 'default';
  //this color is set when logging in and we return to it each time we start the game
  currentColor = 'default';
  // * when we pause the game, the status text is highlighted in red
  statusStyle = 'white';
  // this is an array of History Entry objects storing successive actions to be displayed in the table
  history: HistoryEntry[] = [];
  //information about the current player from the site
  currentPlayer: Player;
  /**
    * function that logs all actions to the history, saves:
    * Action type - a GameAction variable (from the history-entry.ts file)
    * Current number of points
    * Current date / time
    * */
  logAction(act: GameAction) {
    this.history.push(new HistoryEntry(act, this.linesCleared));
  }
  //when we get a point, we increase the number of points and log the actions to history
  onLineCleared() {
    this.linesCleared++;
    this.logAction(GameAction.lineCleared);
  }
  //when we lose, we stop the timer, display information about the end of the game and log the action
  onGameOver() {
    this.pauseTimer();
    this.gameOverInfo = true;
    this.boardStyle = 'game-over';
    this.logAction(GameAction.gameOver);
  }
  //when we exit the game we send information about the page change to the parent component
  gameExit() {
    this._router.navigate(['/intro']);
  }
  //function that starts the clock, resets the number of seconds and sets a new interval that every 1000 ms (i.e. a second) increases the timer
  startTimer() {
    this.resetTimer();
    this.paused = false;
    this.interval = setInterval(() => {
      if (!this.paused) {
        this.time++;
      }
    }, 1000);
  }
  // we move the flag when we want to stop the game - this will stop counting time
  pauseTimer() {
    this.paused = true;
  }
  // we change the flag when we want to resume the game - this will start counting the time
  restartTimer() {
    this.paused = false;
  }
  // we reset the timer and the interval that counts it
  resetTimer() {
    this.time = 0;
    clearInterval(this.interval);
  }
  //in this component we want to see the game variable from the Tetris component we downloaded
  @ViewChild(TetrisCoreComponent) game!: TetrisCoreComponent;
  // To react to buttons (arrows, enter, esc) we use HostListener - found on the network and check document: keydown - what was pressed on the keyboard
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    //depending on the pressed key, it executes the appropriate operations on the game this.game .....
    switch (event.key) {
      case 'ArrowDown':
        this.game.actionDown();
        break;
      case 'ArrowLeft':
        this.game.actionLeft();
        break;
      case 'ArrowRight':
        this.game.actionRight();
        break;
      case 'ArrowUp':
        this.game.actionRotate();
        break;
      /**
       *ESCAPE is used to stop and restart the game
        * If we haven't lost, we check the current status and pause or resume the game accordingly, that is:
        * we pause / resume the timer
        * we change the status to START / STOP
        * we change the status style to red / white
        * we log actions to have stories
        */
      case 'Escape':
        if (!this.gameOverInfo) {
          if (this.status == 'START') {
            this.pauseTimer();
            this.status = 'STOP';
            this.game.actionStop();
            this.logAction(GameAction.pause);
            this.statusStyle = 'red';
          } else if (this.status == 'STOP') {
            this.restartTimer();
            this.status = 'START';
            this.game.actionStart();
            this.logAction(GameAction.resume);
            this.statusStyle = 'white';
          }
        }
        break;
      /**
       * ENTER is responsible for the first game start and RESTART
        * we set the color of the board to the default (if we lost it is red)
        * we hide any info about the loss
        * we log actions to history
        * and depending on whether it is the first start or restart, we modify the timer accordingly and start the game
        */
      case 'Enter':
        this.boardStyle = this.currentColor;
        this.gameOverInfo = false;
        this.logAction(GameAction.start);
        this.statusStyle = 'white';
        if (this.status == 'READY') {
          this.startTimer();
          this.status = 'START';
          this.game.actionStart();
          this.linesCleared = 0;
        } else {
          this.resetTimer();
          this.startTimer();
          this.status = 'START';
          this.game.actionStart();
          this.game.actionReset();
          this.linesCleared = 0;
        }
        break;
      default:
        break;
    }
    event.key;
  }
  constructor(public _storage: StorageService, private _router: Router, private _route: ActivatedRoute) {
    this.currentPlayer = this._storage.getPlayer();
  }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
        this.currentColor = params['color'] == '' ? 'default' : params['color'];
        this.boardStyle = this.currentColor;
    });
  }
}









