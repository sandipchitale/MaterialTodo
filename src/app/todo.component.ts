import { Component } from '@angular/core';

@Component({
  selector: 'mddemo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  title = 'Todo';

  quit() {
    window.close();
  }

  isElectron() {
    return window && window['process'];
  }
}
