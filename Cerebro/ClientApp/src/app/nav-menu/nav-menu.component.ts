import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../profile/services/profile.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  userId = '';
  isExpanded = false;
  subs: Subscription[] = [];

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    // User ID
    this.getUser();
  }

  getUser() {
    let u = this.profileService.userId$.subscribe((userId) => {
      this.userId = userId;
    });
    this.subs.push(u);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }
}
