import {
  InvalidName,
  InvalidPassword,
  InvalidUsername,
  PasswordNotMatching,
} from "../errors";
import { validateName } from "./Name";
import { matchPassword, validatePassword } from "./Password";
import { validateUsername } from "./Username";

class AuthValidator {
  constructor() {
    this.username = "";
    this.password = "";
  }

  setUsername(username) {
    this.username = username;
  }

  setPassword(password) {
    this.password = password;
  }

  _validateSignIn() {
    if (!validateUsername(this.username)) {
      throw new InvalidUsername();
    }

    if (!validatePassword(this.password)) {
      throw new InvalidPassword();
    }
  }

  getAuthData() {
    this._validateSignIn();
    return {
      username: this.username,
      password: this.password,
    };
  }
}

export class SignInValidator extends AuthValidator {}

export class SignUpValidator extends AuthValidator {
  constructor() {
    super();
    this.name = "";
    this.confirm_password = "";
  }

  setName(name) {
    this.name = name;
  }

  setConfirmPassword(confirm_password) {
    this.confirm_password = confirm_password;
  }

  _validateSignUp() {
    if (!validateName(this.name)) {
      throw new InvalidName();
    }

    this._validateSignIn();

    if (!matchPassword(this.password, this.confirm_password)) {
      throw new PasswordNotMatching();
    }
  }

  getSignupData() {
    this._validateSignUp();
    const { username, password } = this.getAuthData();

    return {
      name: this.name,
      username,
      password,
      confirm_password: this.confirm_password,
    };
  }
}
