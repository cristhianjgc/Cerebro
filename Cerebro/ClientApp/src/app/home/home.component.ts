import { Sort } from '@angular/material/sort';
import { lastValueFrom, Subscription } from 'rxjs';
import { HomeService } from './services/home.service';
import { FormBuilder, Validators } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileService } from '../profile/services/profile.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FibonacciRequest, FibonacciResponse, HistoricalResponse } from '../core/models';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  notes = [1];
  result?: number;
  usersPageSize = 5;
  userId: string = '';
  subs: Subscription[] = [];
  lastRequest?: FibonacciRequest;
  usersPageSizeOptions = [5, 10, 25, 100];
  dataSource: MatTableDataSource<FibonacciRequest>;
  displayedColumns: string[] = ['user', 'position', 'result', 'date'];

  fibonacci = this.fb.group({
    nth: [{ value: 0, disabled: false }, [Validators.required, Validators.min(0), Validators.max(18446744073709551615)]]
  });

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator | undefined;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private profileService: ProfileService
  )
  {
    this.dataSource = new MatTableDataSource<FibonacciRequest>([]);
  }

  ngOnInit(): void {
    // User ID
    this.getUser();

    // Historical
    this.getHistorical();
  }

  ngAfterViewInit(): void {
    // Sort and Paginator
    this.dataSource.paginator = this.paginator!;
  }

  getUser() {
    let u = this.profileService.userId$.subscribe((userId) => {
      this.userId = userId;
    });
    this.subs.push(u);
  }

  getPosition() {
    if (!this.fibonacci.invalid) {
      const request: FibonacciRequest = {
        userId: this.userId,
        position: this.fibonacci.get('nth')?.value
      };

      const fibonacci$ = this.homeService.getPosition(request);
      lastValueFrom(fibonacci$).then((response: FibonacciResponse) => {
        this.getHistorical();
        this.result = response.result;
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  getHistorical() {
    this.dataSource.data = [];
    const fibonacci$ = this.homeService.getHistorical();
    lastValueFrom(fibonacci$).then((response: HistoricalResponse) => {
      this.dataSource = new MatTableDataSource<FibonacciRequest>(response.historical);
      this.dataSource.paginator = this.paginator!;
      this.lastRequest = this.dataSource.data[0];
    }).catch((error) => {
      console.log(error);
    });
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'user':
          return this.compare(a.nickname ?? a.userId!, b.nickname ?? b.userId!, isAsc);
        case 'position':
          return this.compare(a.position!, b.position!, isAsc);
        case 'result':
          return this.compare(a.result!, b.result!, isAsc);
        case 'date':
          return this.compare(a.requestDate!, b.requestDate!, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  checkKey(e: any) {
    if (e.keyCode === 13) {
      this.getPosition();
    }
  }

  clearResult() {
    this.result = undefined;
    this.fibonacci.controls.nth.setValue('');
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }
}
