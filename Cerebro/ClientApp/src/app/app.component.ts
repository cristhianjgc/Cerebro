import { lastValueFrom } from 'rxjs';
import { UserResponse } from './core/models';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  userId: string = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {

  }

  ngOnInit() {
    // Init User
    this.userId = this.storageService.getItemFromSessionStorage('userId');
    if (!this.userId) {
      this.createNewUser();
    } else {
      this.authService.setUser(this.userId);
    }
  }

  private createNewUser() {
    const user$ = this.authService.createUser(null);
    lastValueFrom(user$).then((response: UserResponse) => {
      this.userId = response.user.userId;
      this.authService.setUser(this.userId);
      this.storageService.setItemToSessionStorage('userId', this.userId);
    }).catch((error) => {
      console.log(error);
    });
  }
}
