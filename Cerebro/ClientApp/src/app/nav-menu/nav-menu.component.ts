import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../core/services/storage.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  userId = '';
  isExpanded = false;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    // User ID
    this.userId = this.storageService.getItemFromSessionStorage('userId');
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
}
