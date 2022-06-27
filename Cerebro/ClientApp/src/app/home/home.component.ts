import { lastValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FibonacciResponse } from '../core/models';
import { HomeService } from './services/home.service';
import { FormBuilder, Validators } from "@angular/forms";

export interface PeriodicElement {
  name: string;
  weight: number;
  symbol: string;
  position: number;
}

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  notes = [];
  result?: number;
  
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol'
  ];
  
  dataSource: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
  ];

  fibonacci = this.fb.group({
    nth: [{ value: 0, disabled: false }, [Validators.required, Validators.min(0), Validators.max(18446744073709551615)]]
  });

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
  ) {}

  ngOnInit(): void {
    
  }

  getPosition() {
    if (!this.fibonacci.invalid) {
      let nth = this.fibonacci.get('nth')?.value;
      const fibonacci$ = this.homeService.getPosition(nth);
      lastValueFrom(fibonacci$).then((response: FibonacciResponse) => {
        console.log('1. ', response);
        this.result = response.result;
      }).catch((error) => {
        console.log('2. ', error);
      });
    }
  }
}
