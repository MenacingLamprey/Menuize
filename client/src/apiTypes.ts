export interface IDrink {
    name : string;
    id : number
}

export interface IUser{
    uid? :string
    username :string;
    password:string;
  }

export interface IAuth {
    authenticated : boolean;
    login : Function;
    logout :Function;
    isAuthenticated : Function;
  }