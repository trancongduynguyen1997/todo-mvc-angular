import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import {Todo} from '../model/todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

// todos: Todo[] = []; mine
todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    // mine
    // this.todoService.todos$.subscribe(data => {
    //   this.todos = data;
    // });
    this.todos$ = this.todoService.todos$;
  }

  onChangeTodoStatus(todo: Todo) {
    this.todoService.changeTodoStatus(todo.id, todo.isCompleted);
  }

}
