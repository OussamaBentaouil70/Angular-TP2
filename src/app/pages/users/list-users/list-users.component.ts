import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { UserType } from 'src/app/types/users.type';

@Component({
  selector: 'app-list',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, OnDestroy {


  public loading = true;
  public activePage: number = 0;
  public users: UserType[] = [];
  public totalPages = 1;

  constructor(public usersService: UsersService, private router: Router) {}

  getUsers(page: number = 1): void {
    if (page >= 1 && page <= this.totalPages && this.activePage !== page) {
      this.loading = true;
      this.users = [];
      this.activePage = page;
      const users$ = this.usersService.getUsers(page);
      lastValueFrom(users$).then(response => {
        this.users = response?.data;
        this.totalPages = response?.total_pages;
        this.loading = false;
      }).catch(error => {
        this.users = [];
        this.totalPages = 1;
        this.loading = false;
      });
    }
  }

  deleteUser(userId: number) {
    const confirmation = confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      this.usersService.deleteUser(userId).subscribe(
        () => {
          alert('User deleted successfully!');
          this.users = this.users.filter(user => user.id !== userId);
        },
        error => {
          console.error('An error occurred while deleting the user.', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    
  }
  updateUser(userId: number) {
    this.router.navigate(['/update', userId]);
  }
}
