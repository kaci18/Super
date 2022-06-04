import { Component, OnInit, Input } from '@angular/core';
import { HistoryEntry } from '../history-entry';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  //in this variable we store history entries passed from the parent component (GameComponent)
  @Input() history : HistoryEntry[] = [];
  //in this variable we store the phrase by which we filter the list
  term = '';
  //we store the current sort direction in this variable
  order = 'ASC';
  //this function changes the sort order: ASC - ascending, DESC - descending
  toggleOrder() {
    this.order = (this.order == 'ASC') ? 'DESC' : 'ASC';
  }
  constructor() { }
  ngOnInit(): void {
  }
}