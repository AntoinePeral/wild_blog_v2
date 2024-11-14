import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {
  private formBuilder = inject(FormBuilder);

  signUpForm = this.formBuilder.group({
    username: ['',[Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email, this.forbidenExtensionValidator]],
    passwords: this.formBuilder.group({
      password: ['', [Validators.required, this.securePasswordValidator()]],
      confirmPassword: ['']
    }, {validators: this.passwordMatchValidator('password', 'confirmPassword')}),
    address : this.formBuilder.group({
      street: ['',[ Validators.required, Validators.minLength(3)]],
      zipCode: [''],
      city: ['',[ Validators.required, Validators.minLength(3)]]
    }),
    emergencyContacts: this.formBuilder.array([])
  })

  onSubmit():void{
    if(this.signUpForm.valid){
      console.log('Formulaire envoyé avec succès', this.signUpForm.value);
    } else {
      console.log('Formulaire invalide');
    }

    console.log(this.signUpForm.value);
    console.log(!this.signUpForm.value.address?.zipCode);
    
    if(!this.signUpForm.value.address?.zipCode){
      this.signUpForm.patchValue({address: {zipCode: '59000'}})
      console.log(this.signUpForm.value);
  }
}

  get contacts(){
    return this.signUpForm.get('emergencyContacts') as FormArray;
  }

  addEmergencyContact(){
    const contactGroup = this.formBuilder.group({
      name:[''],
      phone:['']
    })
    this.contacts.push(contactGroup);
  }

  removeEmergencyContact(index: number){
    this.contacts.removeAt(index)
  }

  securePasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isValidLength = value.length >= 12;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;

      return passwordValid ? null : { securePassword: true };
    };
  }

  
  passwordMatchValidator(control1: string, control2: string): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const password = control.get(control1);
      const confirmPassword = control.get(control2);
      const isValid = password?.value === confirmPassword?.value 
      return isValid ? null : {'notEqual': true}
    }
  }

  forbidenExtensionValidator(control: FormControl): ValidationErrors | null{
    const isValid = control.value.endsWith('.com');
    return isValid ? null : {'extension': {value: control.value, expected: '.com'}}
  }
}
