import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'An Phat Medical';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
