import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Message, User} from './interface';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';



@Injectable({providedIn: 'root'})
export class ListUsersService {

  public user = new BehaviorSubject({name: '', phone: '', photoUrl: ''});
  currentUser = this.user.asObservable();

  public message = new BehaviorSubject({author: '', datemes: new Date(0) , text: ''});
  currentMessage = this.message.asObservable();
  private subChat = new Subject<any>();
  private subAnswer = new Subject<any>();

  webSocket: WebSocket | undefined;

  constructor(private http: HttpClient) {}



  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.fbDBUrl}/users.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
          }));
      }));
  }

  getAllById(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.fbDBUrl}/users/${id}/messages.json`)
      .pipe(map((responsemes: { [key: string]: any }) => {
        return Object
          .keys(responsemes)
          .map(key => ({
            ...responsemes[key],
            idmes: key,
            datemes: new Date(responsemes[key].datemes)
          }));
      }));
  }

  sendMes(message: Message, user: User): Observable<Message>{
    console.log(user.id);
    console.log(message);
    return this.http.post(`${environment.fbDBUrl}/users/${user.id}/messages/.json`, message)
      .pipe(map((responsemes: any) => {
        return {
          ...message,
          idmes: responsemes.name,
        };
      }));
  }
 /* create(user: User): Observable<User> {
    return this.http.post(`${environment.fbDBUrl}/users.json`, user)
      .pipe(map((response: any ) => {
        return {
          ...user,
          id: response.name,
        };
      }));
  }
*/

  public changeChat(user: User) {
    this.user.next(user);
  //  this.messages.next(messages);
    console.log(this.user);
  }


  public addMessage(message: Message) {
    this.message.next(message);
    console.log(this.message);
  }

  getAddMessage(): Observable<any> {
    return this.subChat.asObservable();
  }
  UpdateChat() {
    this.subChat.next({event: 'addMessage'});
  }

  sendAnswer() {
    this.subAnswer.next({event: 'sendAnswer'});
    return this.http.get(`https://api.chucknorris.io/jokes/random`);
  }
  getsendAnswer(): Observable<any> {
    return this.subAnswer.asObservable();
  }
}
