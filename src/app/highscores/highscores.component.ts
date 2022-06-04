import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoresService, Game } from '../scores.service';
@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {
  data:Game[] = [];
  order = 'ASC';
  toggleOrder() {
    this.order = (this.order == 'ASC') ? 'DESC' : 'ASC';
  }
  constructor(private _router: Router, private _scores: ScoresService) {
  }
  loadScores() {
    this._scores.load().subscribe(result => {
      this.data = result;
    });
  }
  ngOnInit(): void {
    this.loadScores();
  }
}

