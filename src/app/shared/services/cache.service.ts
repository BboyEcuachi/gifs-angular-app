import { Injectable } from '@angular/core';

const CACHE_TIME = 5; // Cache time in minutes

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  save(key: string, data: any): void {
    const expires = new Date().getTime() + CACHE_TIME * 60 * 1000; // Calculate expiration time
    const record = { value: data, expires };
    localStorage.setItem(key, JSON.stringify(record));
  }

  load(key: string): any {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const record = JSON.parse(item);
    const now = new Date().getTime();
    if (now >= record.expires) {
      localStorage.removeItem(key);
      return null;
    }

    return record.value;
  }
}
