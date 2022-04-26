import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListUsersService} from '../list-users.service';
import {Message, User} from '../interface';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  public error: any;
  messages!: Message[];
  message!: Message;
  private mSub!: Subscription;
  private subU!: Subscription;
  currentUser!: User;
  private subMes!: Subscription;
  private subM!: Subscription;
  private SubAM!: Subscription;
  private textMes!: any;
  private answermes!: Message;
  private MSub!: Subscription;


  constructor(private listUsersService: ListUsersService) {
  }

  ngOnInit(): void {

    this.subU = this.listUsersService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.messages = [];
      console.log(this.currentUser);
      if (this.currentUser.id) {
        this.mSub = this.listUsersService.getAllById(this.currentUser.id).subscribe(data => {
            console.log(data);
            this.messages = data;
          },
          error => {
            this.error = error.message;
            console.log(error);
          },
        );
      }
    });


    this.MSub = this.listUsersService.getAddMessage().subscribe(datae => {
        if (datae.event === 'addMessage') {

          this.subM = this.listUsersService.currentMessage.subscribe(data => {
            console.log(data);
            this.message = data;
          });
          this.listUsersService.sendMes(this.message, this.currentUser).subscribe(datau => {
            this.message = datau;
          });
          this.messages = this.messages.concat(this.message);

          setTimeout(() => {
            this.SubAM = this.listUsersService.sendAnswer().subscribe(datam => {
                console.log(datam);
                this.textMes = datam;
                const answerMes = {
                  author: this.currentUser.name,
                  text: this.textMes.value,
                  datemes: new Date()
                };

                this.messages = this.messages.concat(answerMes);
                this.listUsersService.sendMes(answerMes, this.currentUser).subscribe(datau => {
                  this.answermes = datau;
                });
              },
              error => {
                this.error = error.message;
                console.log(error);
              },
            );
          }, 10000);
        }
      },

      error => {
        this.error = error.message;
        console.log(error);
      },
    );

    /*    this.error = '';
        this.messages = [];
        console.log(this.error, this.messages);*/
  }

  ngOnDestroy() {

    if (this.subU) {
      this.subU.unsubscribe();
    }
    if (this.mSub) {
      this.mSub.unsubscribe();
    }
  }
}
