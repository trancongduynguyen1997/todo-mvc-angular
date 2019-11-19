import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../model/todo.model';
import { trigger, state, style, transition, animate } from '@angular/animations';


const fadeStrikeThroughAnimation = trigger('fadeStrikeThrough', [
  state('completed', style({
    fontSize: '17px',
      color: 'lightgrey',
      textDecoration: 'line-through',
  })),
  state('active', style({
    fontSize: '18px',
      color: 'black',
  })),
  transition('active <=> completed', [animate(250)])
]);

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [fadeStrikeThroughAnimation]
})
export class TodoItemComponent implements OnInit {

  isHovered = false;
  isEditing = false;
  @Input() todo: Todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() delete: EventEmitter<Todo> = new EventEmitter<Todo>();
  constructor() { }

  ngOnInit() {
  }

  submitEdit(event: KeyboardEvent) {
    const { key } = event;
    event.preventDefault(); // prevent "form" from it's default submit
    if (key === 'Enter') {
      this.editTodo.emit(this.todo);
      this.isEditing = false;
    }
  }

  changeTodoStatus() {
    this.changeStatus.emit({ ...this.todo, isCompleted: !this.todo.isCompleted });
  }

deleteTodo() {
  this.delete.emit(this.todo);
}

}
