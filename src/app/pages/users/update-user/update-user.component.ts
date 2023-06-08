import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  public formData !: FormGroup;
  userId:number= 0;
  errorMessage: string='';
  alert: { type: string, message: string } | null = null;
  constructor(private http : HttpClient, private router: Router,  private route: ActivatedRoute, private usersService: UsersService){}

  ngOnInit() {
    this.formData = new FormGroup({
      first_name: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      last_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z]\w{3,14}$/)
      ])),  
      job: new FormControl('', Validators.compose([
        Validators.required
      ])),
      phone_number: new FormControl("", Validators.compose([
        Validators.required
      ]))
    })
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      console.log(this.userId);
      this.getUser(this.userId);
    
    });
  }

  getUser(userId: number) {
    this.usersService.getUsers(1).subscribe(
      (response: any) => {
        const user = response.data.find((u: { id: number; }) => u.id === userId);
        if (user) {
          this.formData.patchValue(user);
        } else {
          this.errorMessage = 'User not found.';
          console.log(this.errorMessage);
        }
      },
      error => {
        this.errorMessage = 'An error occurred. Please try again later.';
        console.log(this.errorMessage);
      }
    );
  }
  onClickSubmit(value: any){
    console.log('VALUE: ', this.formData.value);
  

      this.usersService.updateUser(value, this.userId).subscribe(
        (response: any) => {
          this.alert = { type: 'success', message: 'User updated successfully.' };
          console.log(this.alert);
          setTimeout(() => {
            this.router.navigate(['/admin/users']);
          }, 1000);
        },
        error => {
          this.alert = { type: 'error', message: 'An error occurred while updating the user.' };
        }
      );
 
  
  
  }

}
