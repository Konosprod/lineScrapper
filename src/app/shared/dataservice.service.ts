import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from './Item.model';

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  itemChanged: Subject<Item[]> = new Subject<Item[]>();

  private items: Item[] = [];

  constructor(private http: HttpClient) {}

  getItems(): Item[] {
    return this.items.slice();
  }

  getItem(id: number) : Item {
    return this.items[id];
  }

  setItem(id: number, item: Item) : void {
    this.items[id] = item
    this.itemChanged.next(this.items)
  }

  fetchItems(url: string): void {
    const proxurl =
      'https://corsproxy.io/?' +
      encodeURIComponent(
        url
      );
    this.http.get(proxurl, { responseType: 'text' }).subscribe((response) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(response, 'text/html');
      this.items = [];
      Array.from(doc.getElementsByClassName('FnStickerPreviewItem')).forEach(
        (sticker) => {
          const data = sticker.getAttribute("data-preview")
          const json = JSON.parse(decodeURIComponent(data ? data : ""));
          this.items.push(new Item(json["animationUrl"] ? json["animationUrl"] : json["staticUrl"], true));
        }
      );
      this.itemChanged.next(this.items);
    });
    //this.itemChanged.next(this.items);
  }

  selectAll() :  void {
    for(var item of this.items) {
      item.selected = true;
    }
    this.itemChanged.next(this.items);
  }

  deselectAll() :  void {
    for(var item of this.items) {
      item.selected = false;
    }
    this.itemChanged.next(this.items);
  }
}
