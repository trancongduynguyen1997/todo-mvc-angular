import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isToggleAll = false;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  toggleAllTodos() {
    this.isToggleAll = !this.isToggleAll;
    this.todoService.toggleAll(this.isToggleAll);
  }

}
