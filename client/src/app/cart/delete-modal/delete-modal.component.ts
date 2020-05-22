import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  @ViewChild('deleteConfirmation') modal;
  index: any = 0;
  itemType: string = "";

  constructor(private modalService: NgbModal, private storageService: StorageService) {

  }

  ngOnInit() {

  }

  open(index, itemType) {
    this.index = index;
    this.itemType = itemType;
    this.modalService.open(this.modal);
  }

  reset() {
    this.index = 0;
    this.itemType = "";
  }

  delete() {
    if (this.itemType == "racquet") {
      let newArrayWithDeletedItem = this.storageService.getSelectedRacquets();
      newArrayWithDeletedItem.splice(this.index, 1);
      this.storageService.updateRacquets("selectedRacquets", newArrayWithDeletedItem);
    } else if (this.itemType == "shoe") {
      let newArrayWithDeletedItem = this.storageService.getSelectedShoes();
      newArrayWithDeletedItem.splice(this.index, 1);
      this.storageService.updateShoes("selectedShoes", newArrayWithDeletedItem);
    } else if (this.itemType == "apparelItem") {
      let newArrayWithDeletedItem = this.storageService.getSelectedApparel();
      newArrayWithDeletedItem.splice(this.index, 1);
      this.storageService.updateApparel("selectedApparel", newArrayWithDeletedItem);
    } else if (this.itemType == "item") {
      let newArrayWithDeletedItem = this.storageService.getSelectedItems();
      newArrayWithDeletedItem.splice(this.index, 1);
      this.storageService.updateItems("selectedItems", newArrayWithDeletedItem);
    }
    this.storageService.updateTotal("total", this.storageService.calculateTotal());
    this.reset();
  }

}
