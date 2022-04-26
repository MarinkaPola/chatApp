import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message, User} from '../interface';
import {ListUsersService} from '../list-users.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  @ Input() userProfile!: User;
  currentUser!: User;
  private subU!: Subscription;
  constructor(private listUserService: ListUsersService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl(null, [ Validators.minLength(1), Validators.maxLength(300)]),
    });
    this.subU = this.listUserService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
    }

  submit() {
    this.submitted = true;
    const message: Message = {
      text: this.form.value.text,
      datemes: new Date(),
      author: this.userProfile.name,
    };
    this.listUserService.addMessage(message);
    this.listUserService.UpdateChat();
    this.form.reset();
    this.submitted = false;
  }

}
