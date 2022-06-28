import { lastValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { FormBuilder, Validators } from "@angular/forms";
import { FibonacciRequest, FibonacciResponse, HistoricalResponse } from '../core/models';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  notes = [1];
  result?: number;
  dataSource: FibonacciRequest[] = [];
  displayedColumns: string[] = [
    'username',
    'position',
    'result',
    'date'
  ];

  fibonacci = this.fb.group({
    nth: [{ value: 0, disabled: false }, [Validators.required, Validators.min(0), Validators.max(18446744073709551615)]]
  });

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
  ) {}

  ngOnInit(): void {
    this.getHistorical();
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

  getHistorical() {
    const fibonacci$ = this.homeService.getHistorical();
    lastValueFrom(fibonacci$).then((response: HistoricalResponse) => {
      console.log('A. ', response);
      this.dataSource = response.historical;
    }).catch((error) => {
      console.log('B. ', error);
    });
  }
}
