export class Item {
    public url: string = "";
    public selected: boolean = false;

    constructor(url: string, selected: boolean) {
        this.url = url;
        this.selected = selected;
    }
}