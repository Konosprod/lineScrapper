import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../shared/dataservice.service';

@Component({
  selector: 'app-user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.css']
})
export class UserInputsComponent implements OnInit {

  url: string = "";

  constructor(private dataService: DataserviceService) { }

  ngOnInit(): void {
  }

  getItems() {
    this.dataService.fetchItems(this.url);
  }

}
