export class UserNotExits {
  constructor(code, message) {
    this.code = code || 300;
    this.message = message || 'No active account found with the given credentials !';
  }
}

export class UnauthorizedRequest {
  constructor(code, message) {
    this.code = code || 300;
    this.message = message || 'unauthorized request !';
  }
}

export class NotData {
  constructor(code, message) {
    this.code = code || 300;
    this.message = message || 'no data to view';
  }
}

export class BadRequest {
  constructor(code, message) {
    this.code = code || 300;
    this.message = message || 'request failed !';
  }
}

export class ServerError {
  constructor(code, message) {
    this.code = code || 300;
    this.message = message || 'server error !';
  }
}

export class InvalidName {
  constructor(code, message) {
    this.code = code || 300;
    this.message = message || 'name format is invalid !';
  }
}

export class InvalidUsername {
  constructor(code, message) {
    this.code = code || 300;
    this.message = message || 'username format is invalid !';
  }
}

export class InvalidPassword {
  constructor(code, message) {
    this.code = code || 300;
    this.message = message || 'password format is invalid !';
  }
}

export class PasswordNotMatching {
  constructor(code, message) {
    this.code = code || 300;
    this.message = message || 'confirm password not matching password';
  }
}
