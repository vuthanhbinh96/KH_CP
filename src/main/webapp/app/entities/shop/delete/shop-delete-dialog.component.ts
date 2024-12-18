import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ShopService } from '../service/shop.service';
import { IShop } from '../shop.model';

@Component({
  templateUrl: './shop-delete-dialog.component.html',
})
export class ShopDeleteDialogComponent {
  shop?: IShop;

  constructor(protected shopService: ShopService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shopService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
