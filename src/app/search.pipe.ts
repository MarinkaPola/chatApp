import {Pipe, PipeTransform} from '@angular/core';
import {User} from './interface';

@Pipe ({
    name: 'searchUsers'
})
export class SearchPipe implements PipeTransform {
    transform(users: User[], search = ''): User[] {
        if (!search.trim()) {
            return users;
        }
        return users.filter( user => {
            return user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
        });
    }

}
