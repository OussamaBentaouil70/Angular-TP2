import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  errorMessage: string='';
  alert: { type: string, message: string } | null = null;
  public formData!: FormGroup;
  constructor(private usersService: UsersService, private router: Router){ 
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
  }
ngOnit():void{
 
}

onClickSubmit(value: any){
  console.log('VALUE: ', this.formData.value);
  

  this.usersService.createUser(value).subscribe(
    (response) => {
      console.log('User created successfully:', response);
      this.alert = { type: 'success', message: 'User updated successfully.' };
      setTimeout(() => {
        this.router.navigate(['/admin/users']);
      }, 1000);

    },
    (error) => {
      console.error('Failed to create user:', error);
      this.alert = { type: 'error', message: 'An error occurred while updating the user.' };
    }
  );
}

}
