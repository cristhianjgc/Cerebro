import { lastValueFrom } from 'rxjs';
import { UserResponse } from './core/models';
import { Component, OnInit } from '@angular/core';
import { StorageService } from './core/services/storage.service';
import { ProfileService } from './profile/services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  userId: string = '';

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService
  ) {

  }

  ngOnInit() {
    // Init User
    this.userId = this.storageService.getItemFromSessionStorage('userId');
    if (!this.userId) {
      const user$ = this.profileService.createUser(null);
      lastValueFrom(user$).then((response: UserResponse) => {
        this.userId = response.user.userId;
        this.profileService.setUser(this.userId);
        this.storageService.setItemToSessionStorage('userId', this.userId);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.profileService.setUser(this.userId);
    }
  }
}
