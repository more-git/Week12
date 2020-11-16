import { Component, OnInit } from '@angular/core';
import { ItemsService } from "../services/items.service";

import { ModalService } from "../_modal";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  public newItem;
  public items;
  bodyText: string;
  updateId: number;
  color: string;


  constructor(
    private itemsService: ItemsService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.itemsService.getAll().subscribe(returnItems => {
      this.items = returnItems.docs;
    })
    this.bodyText = "Edit This Task in Modal 1";
  }

  saveItem(): void {
    if (!this.newItem) return;
    this.itemsService.create(this.newItem).subscribe( saveItem => {
      if (saveItem) this.items.push(saveItem);
    })
    this.newItem = "";
  }

  deleteItem(rmItem: string, id: number): void {
    this.itemsService.delete(rmItem, id).subscribe( deleteItem => {
      this.items = this.items.filter(item => item._id != id);
    })
  }

  openModal(id: string, itemID: number, itemTitle: string) {
    this.updateId = itemID;
    this.bodyText = itemTitle;
    //this.bodyText = itemID.toString();
    //this.items.filter(item => item._id != id);
    this.modalService.open(id);
  }

  closeModal(id: string) {
    // change this.items_id == id.toNum()

    var updateItem = this.items.filter(item => item._id == this.updateId);
    updateItem[0].item = this.bodyText; 

    //console.log(updateItem[0].item);
    this.itemsService.update(this.bodyText, this.updateId).subscribe(updateItem => {
    })
    this.modalService.close(id);
  }

  cancelModal(id: string) {
    // change this.items_id == id.toNum()

    //var updateItem = this.items.filter(item => item._id == this.updateId);
    //updateItem[0].item = this.bodyText; 

    //console.log(updateItem[0].item);
    //this.itemsService.update(this.bodyText, this.updateId).subscribe(updateItem => { })
    this.modalService.close(id);
  }
}
