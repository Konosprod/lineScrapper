import { Component, Input, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/shared/dataservice.service';
import { Item } from 'src/app/shared/Item.model';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.css']
})
export class GridItemComponent implements OnInit {

 @Input() public item: Item = new Item("", false);
 @Input() public id: number = 0;

  constructor(private dataService: DataserviceService) { }

  ngOnInit(): void {
  }

  onSelect() {
    this.item.selected = !this.item.selected
    this.dataService.setItem(this.id, this.item);
  }

}
