import { Injectable } from '@angular/core';
import { Player } from './player';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  player: Player = {
    email: '',
    name: '',
  };
  constructor() { }
  setPlayer(player: Player) {
    this.player = player;
  }
  getPlayer() {
    return this.player;
  }
}