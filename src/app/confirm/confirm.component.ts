import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataserviceService } from '../shared/dataservice.service';
import { Item } from '../shared/Item.model';
import * as JSZip from 'jszip';
import * as FS from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  allSelected: boolean = true;

  constructor(
    private dataService: DataserviceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  saveFiles(): void {
    const selected: Item[] = this.dataService
      .getItems()
      .filter((value: Item) => {
        return value.selected === true;
      });
    const zip = JSZip();

    const requests = [];

    for (const item of selected) {
      const proxurl = 'https://corsproxy.io/?' + encodeURIComponent(item.url);
      requests.push(this.http.get(proxurl, { responseType: 'blob' }));
    }

    forkJoin(requests).subscribe((responseList) => {
      for (const [index, response] of responseList.entries()) {
        const imgData = new File([response], index + '.png');
        zip.file(index + '.png', imgData, { binary: true });
      }
      zip.generateAsync({ type: 'blob' }).then((content) => {
        FS.saveAs(content as Blob, 'stickers.zip');
      });
    });
  }

  selectAll(): void {
    this.allSelected = !this.allSelected;
    if (this.allSelected) this.dataService.selectAll();
    else this.dataService.deselectAll();
  }
}
