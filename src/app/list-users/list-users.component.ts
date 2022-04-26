import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListUsersService} from '../list-users.service';
import {Message, User} from '../interface';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy {
  users!: User[];
  private error: any;
  private Sub!: Subscription;
  visibility = true;
  user!: User;
  messages: Message[] = [];

  userProfile: User =
    {
      id: '-MN7ynlrFqNPWun6umE4',
      name: 'MariPola',
      phone: '+380997155542',
      photoUrl: 'https://i.picsum.photos/id/569/200/200.jpg?hmac=rzX0dRJRyZs2NIa_h_87CJVeoetRLtTlweCZmYrYlCA'
    };
  searchStr!: '';
  private MSub!: Subscription;
  private ASub!: Subscription;

  // messagesLast!: Message;


  constructor(private listUsersService: ListUsersService) {
  }

  ngOnInit(): void {
    this.getUserAll();
    this.MSub = this.listUsersService.getAddMessage().subscribe(datae => {
      if (datae.event === 'addMessage') {
        console.log(datae.event);
        setTimeout(() => {
          this.getUserAll();
        }, 1000);
      }
    });
    this.ASub = this.listUsersService.getsendAnswer().subscribe(datae => {
      if (datae.event === 'sendAnswer') {
        console.log(datae.event);
        setTimeout(() => {
          this.getUserAll();
        }, 2000);
      }
    });
  }

  ngOnDestroy() {
    if (this.Sub) {
      this.Sub.unsubscribe();
    }
  }

  openChat(user: User) {
    this.visibility = false;
    console.log(user);
    this.listUsersService.changeChat(user);
  }

  getUserAll() {
    this.Sub = this.listUsersService.getAll().subscribe(data => {
        console.log(data);
        this.users = data;

        for (const user of this.users) {
          if (user.messages) {
            console.log(user.messages);
            const ArrayMessages = Object.values(user.messages);
            const ArrayMessagesLenth = ArrayMessages.length;
            user.messagesLast = ArrayMessages[ArrayMessagesLenth - 1];
            console.log(user.messagesLast);
          }
        }

        this.users.sort(function(a, b) {
          if (a.messagesLast && b.messagesLast) {
            console.log(5);
            return new Date(b.messagesLast.datemes).getTime() - new Date(a.messagesLast.datemes).getTime();
          }
          return 0;
        });
        console.log(this.users);
      },
      error => {
        this.error = error.message;
        console.log(error);
      },
    );
  }
}
