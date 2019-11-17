import { Component, OnInit } from '@angular/core';
import { FilterButton, Filter } from '../model/filter-button.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  filterButtons: FilterButton[] = [
    {type: Filter.All, label: 'All', isActived: true},
    {type: Filter.Active, label: 'Active', isActived: false},
    {type: Filter.Completed, label: 'Completed', isActived: false}
  ];

  length = 0;
  constructor() { }

  ngOnInit() {
  }

}
