/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImenikservisService } from './imenikservis.service';

describe('Service: Imenikservis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImenikservisService]
    });
  });

  it('should ...', inject([ImenikservisService], (service: ImenikservisService) => {
    expect(service).toBeTruthy();
  }));
});
