import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataserviceService } from '../shared/dataservice.service';
import { Item } from '../shared/Item.model';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css'],
})
export class GridViewComponent implements OnInit, OnDestroy {
  
  private subscription: Subscription | null = null;
  items: Item[] = [];

  constructor(private dataService: DataserviceService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.itemChanged.subscribe((items) => {
      this.items = items;
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
