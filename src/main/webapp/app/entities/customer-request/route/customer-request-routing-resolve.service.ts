import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { CustomerRequestService } from '../service/customer-request.service';
import { ITicket, Ticket } from '../../ticket/ticket.model';

@Injectable({ providedIn: 'root' })
export class CustomerRequestRoutingResolveService implements Resolve<ITicket> {
  constructor(protected service: CustomerRequestService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITicket> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ticket: HttpResponse<Ticket>) => {
          if (ticket.body) {
            return of(ticket.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ticket());
  }
}
