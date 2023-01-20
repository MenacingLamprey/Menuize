import { IAuth } from "../apiTypes";

class AuthClass implements IAuth {
  authenticated : boolean;

  constructor() {
    this.authenticated = false;
  }

  login(cb : Function) {
    this.authenticated = true;
    cb();
  }

  logout(cb :Function) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export const Auth = new AuthClass();