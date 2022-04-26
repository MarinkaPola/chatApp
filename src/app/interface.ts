

export interface User {
  id?: string;
  name: string;
  phone: string;
  photoUrl: string;
  messages?: [Message];
  messagesLast?: Message;
}

export interface Message {
  idmes?: string;
  author: string;
  text: string;
  datemes: Date;
}

