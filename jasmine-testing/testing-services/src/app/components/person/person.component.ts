import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input() person: Person = new Person('','',0,0,0);
  @Output() onSelected = new EventEmitter<Person>();

  imc = '';

  constructor() { }

  ngOnInit(): void {
  }

  calcIMC() {
    this.imc = this.person.calcIMC();
  }

  onClick(){
    this.onSelected.emit(this.person);
  }

}
