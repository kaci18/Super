// ENUM enumeration type designed to hold all the actions we want to log into history.
// saving e.g. GameAction.start save the start of the game.
// This type call can be found in game.component.ts
export enum GameAction {
    start = "Rozpoczęto grę",
    pause = "Zatrzymano grę",
    resume = "Wznowiono grę",
    restart = "Uruchomiono ponownie",
    gameOver = "Koniec gry",
    lineCleared = "Punkt zdobyty"
  }
/**
* the HistoryEntry class is one line of the history entry
  * Contains:
  * timestamp - date / time of entry
  * action - action, i.e. an element of the GameAction enumeration
  * points - current number of points
*/
export class HistoryEntry {
    timestamp: Date;
    action: GameAction;
    points: number;
    /**
     * when creating a new History Entry object, we only pass actions and points. The date is always set to the current date
     */
    constructor(act : GameAction, pts : number) {
        this.action = act;
        this.timestamp = new Date();
        this.points = pts;
    }
}






