import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilterButton, Filter } from '../model/filter-button.model';
import { TodoService } from '../service/todo.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { map, takeUntil } from 'rxjs/operators';

const btnActived = trigger('btnActivedAnimation', [
  state('unactived', style({
    color: 'black'
  })),
  state('actived', style({
    color: 'burlywood'
  })),
  transition('unactived <=> actived', [animate(250)])
]);

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [btnActived]
})
export class FooterComponent implements OnInit, OnDestroy {
  filterButtons: FilterButton[] = [
    { type: Filter.All, label: 'All', isActived: true },
    { type: Filter.Active, label: 'Active', isActived: false },
    { type: Filter.Completed, label: 'Completed', isActived: false }
  ];

  length = 0;
  $isAnyCompleted: Observable<boolean>;
  private $unsubscribe = new Subject<void>();
  subscription: Subscription;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.subscription = this.todoService.length$.subscribe(length => this.length = length);
    this.$isAnyCompleted = this.todoService.todos$.pipe(
      map(todos => todos.some(todo => todo.isCompleted)),
      takeUntil(this.$unsubscribe)
    );
  }

  filter(type: Filter) {
    this.todoService.filterTodos(type, true);
    this.activeFilter(type);
  }

  private activeFilter(type: Filter) {
    this.filterButtons.forEach(btn => {
      btn.isActived = (btn.type === type);
    });
  }

  clearAllCompleted() {
    this.todoService.clearAllCompleted();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

}
