import { lastValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ProfileService } from './services/profile.service';
import { FibonacciRequest, FibonacciResponse, HistoricalResponse } from '../core/models';

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
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
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    // this.getHistorical();
  }

  // getPosition() {
  //   if (!this.fibonacci.invalid) {
  //     let nth = this.fibonacci.get('nth')?.value;
  //     const fibonacci$ = this.profileService.getPosition(nth);
  //     lastValueFrom(fibonacci$).then((response: FibonacciResponse) => {
  //       console.log('1. ', response);
  //       this.result = response.result;
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  //   }
  // }

  // getHistorical() {
  //   const fibonacci$ = this.profileService.getHistorical();
  //   lastValueFrom(fibonacci$).then((response: HistoricalResponse) => {
  //     console.log('A. ', response);
  //     this.dataSource = response.historical;
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }
}
