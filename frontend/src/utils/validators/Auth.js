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

  _validateSignin() {
    if (!validateUsername(this.username)) {
      throw new InvalidUsername();
    }

    if (!validatePassword(this.password)) {
      throw new InvalidPassword();
    }
  }

  getAuthData() {
    this._validateSignin();
    return {
      username: this.username,
      password: this.password,
    };
  }
}

export class SigninValidator extends AuthValidator {}

export class SignupValidator extends AuthValidator {
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

  _validateSignup() {
    if (!validateName(this.name)) {
      throw new InvalidName();
    }

    this._validateSignin();

    if (!matchPassword(this.password, this.confirm_password)) {
      throw new PasswordNotMatching();
    }
  }

  getSignupData() {
    this._validateSignup();
    const { username, password } = this.getAuthData();

    return {
      name: this.name,
      username,
      password,
      confirm_password: this.confirm_password,
    };
  }
}
