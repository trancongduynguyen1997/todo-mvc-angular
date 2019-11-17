import { Injectable } from '@angular/core';
import { Todo } from '../model/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../model/filter-button.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private static readonly TodoStorageKey = 'todos';
  private todos: Todo[];
  private filteredTodos: Todo[];
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private currentFilter: Filter = Filter.All;

  todos$: Observable<Todo[]> = this.displayTodosSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private storageService: LocalStorageService) { }

  fetchFromLocalStorage() {
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey);
    this.filteredTodos = [...this.todos.map(todo => ({ ...todo }))];
    this.updateTodosData();
  }

  updateToLocalStorage() {
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
    this.filterTodos(this.currentFilter, false);
    this.updateTodosData();
  }

  filterTodos(filter: Filter, isFiltering = true) {
    this.currentFilter = filter;
    switch (filter) {
      case Filter.Active:
        this.filteredTodos = this.todos.filter(todo => !todo.isCompleted);
        break;
      case Filter.Completed:
        this.filteredTodos = this.todos.filter(todo => todo.isCompleted);
        break;
      case Filter.All:
        this.filteredTodos = [...this.todos];
        break;
    }
  }

  private updateTodosData() {
    this.displayTodosSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }

}
