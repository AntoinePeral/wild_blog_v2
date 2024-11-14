import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  newMessage: Message = {
    firstname:'',
    lastname: '',
    email:'',
    content:'',
  }

  canDisplayData: boolean = false;


  onSubmit(): void{
    console.log(this.newMessage)
  }

  displayData() : void {
   this.canDisplayData = true; 
   console.log(this.canDisplayData);
  }

}
