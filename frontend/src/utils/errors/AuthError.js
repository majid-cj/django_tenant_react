export class UserNotExits {
  constructor() {
    this.code = 300;
    this.message = "No active account found with the given credentials !";
  }
}

export class UnauthorizedRequest {
  constructor() {
    this.code = 300;
    this.message = "unauthorized request !";
  }
}

export class NotData {
  constructor() {
    this.code = 300;
    this.message = "no data to view";
  }
}

export class BadRequest {
  constructor(message) {
    this.code = 300;
    this.message = message || "request faild !";
  }
}

export class ServerError {
  constructor() {
    this.code = 300;
    this.message = "server error !";
  }
}

export class InvalidName {
  constructor() {
    this.code = 300;
    this.message = "name format is invalid !";
  }
}

export class InvalidUsername {
  constructor() {
    this.code = 300;
    this.message = "username format is invalid !";
  }
}

export class InvalidPassword {
  constructor() {
    this.code = 300;
    this.message = "password format is invalid !";
  }
}

export class PasswordNotMatching {
  constructor() {
    this.code = 300;
    this.message = "confirm password not matching password";
  }
}
