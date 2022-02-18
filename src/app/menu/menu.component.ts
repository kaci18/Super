import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
	@Output() loginStatusHandler: EventEmitter<boolean> = new EventEmitter();
	@Output() sendLoggedPlayer: EventEmitter<string> = new EventEmitter();

	public isLogged: boolean = false;

	public verify(form: FormGroup) {
		const playerName = form.value.name;
		const playerEmail = form.value.email;

		this.sendLoggedPlayer.emit(playerName);
		this.loginStatusHandler.emit(true);
		this.isLogged = true;
	}
}

