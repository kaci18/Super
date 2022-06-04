import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from '../player';
import { StorageService } from '../storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements OnInit {
  introForm: FormGroup;
  player: Player = {
    name: '',
    email: ''
  };
  contrast: Boolean = false;
  color: String = 'default';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  //after validating the login form, we send the website and player details
  start() {
    this._storage.setPlayer(this.player);
    //this.color = (this.contrast == true) ? 'contrast' : 'default';
    this._router.navigate(['/game/'+this.color]);
  }
  constructor(private _router: Router, public _storage: StorageService, public fb: FormBuilder) {
    this.introForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      contrast: [false, []]
    });
    this.introForm.get('contrast')?.valueChanges.subscribe(contrastValue => {
      this.color = (contrastValue == true) ? 'contrast' : 'default';
    });
  }
  ngOnInit() {
    this.player = this._storage.getPlayer();
  }
}