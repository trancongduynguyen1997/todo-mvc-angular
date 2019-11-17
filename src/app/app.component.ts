import { Component, OnInit } from '@angular/core';
import { TodoService } from './service/todo.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todo-mvc';
  hasTodo$: Observable<boolean>;
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.fetchFromLocalStorage();
    this.hasTodo$ = this.todoService.length$.pipe(map(length => length > 0)); // convert from number to boolean
  }

}
