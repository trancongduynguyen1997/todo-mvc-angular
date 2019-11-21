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
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
    this.filteredTodos = [...this.todos];
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
    if (isFiltering) {
      this.updateTodosData();
    }
  }

  private updateTodosData() {
    this.displayTodosSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }

  addTodo(content: string) {
    const timestamp = new Date().getTime();
    const newTodo = new Todo(timestamp, content, false);
    this.todos.unshift(newTodo);
    this.updateToLocalStorage();
  }

  changeTodoStatus(todoId: number, isCompleted: boolean) {
    const index = this.todos.findIndex(todo => todo.id === todoId);
    const todo = this.todos[index];
    todo.isCompleted = isCompleted;
    this.todos.splice(index, 1, todo);
    this.updateToLocalStorage();
  }

  editTodo(todoId: number, content: string) {
    const index = this.todos.findIndex(todo => todo.id === todoId);
    const todo = this.todos[index];
    todo.content = content;
    this.todos.splice(index, 1, todo);
    this.updateToLocalStorage();
  }

  deleteTodo(todoId: number) {
    const index = this.todos.findIndex(todo => todo.id === todoId);
    this.todos.splice(index, 1);
    this.updateToLocalStorage();
  }

  toggleAll(isToggleAll: boolean) {
    // if (isToggleAll) {
    //   const toggleTodos = this.todos.map(todo => {
    //     const newtodo = { ...todo, isCompleted: true };
    //     return newtodo;
    //   });
    //   this.todos = [...toggleTodos];
    // }
    // else {
    //   const toggleTodos = this.todos.map(todo => {
    //     const newtodo = { ...todo, isCompleted: false };
    //     return newtodo;
    //   });
    //   this.todos = [...toggleTodos];
    // }

    this.todos = this.todos.map(todo => {
      return {
        ...todo,
        isCompleted: !this.todos.every(t => t.isCompleted)
      }
    });

    this.updateToLocalStorage();
  }

  clearAllCompleted() {
    this.todos = this.todos.filter(todo => !todo.isCompleted);
    this.updateToLocalStorage();
  }

}
