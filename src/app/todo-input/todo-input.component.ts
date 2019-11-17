import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {

todoContent = '';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.todoContent.trim() === '') {
      return false;
    }
    this.todoService.addTodo(this.todoContent);
    this.todoContent = '';
  }

}
