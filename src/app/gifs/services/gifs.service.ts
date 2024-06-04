import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, firstValueFrom } from 'rxjs';
import { Gif, IGifsSearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagHistory: string[] = [];
  private url = 'https://api.giphy.com/v1/gifs';
  private apiKey = 'ubk9QhcLDcZZUx8d3XeQmlIChO55Zrl8';

  constructor(
    private http: HttpClient
  ) {
    this.loadLocalStorage();
  }

  get tagHistory(): string[] {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter(t => t.toLowerCase() !== tag);
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.slice(0, 10);

    this.saveLocalStorage();
  }

  private saveLocalStorage() {
    localStorage.setItem('tagHistory', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage() {
    const tagHistory = localStorage.getItem('tagHistory');

    if (!tagHistory) return;

    this._tagHistory = JSON.parse(tagHistory);

    if (this._tagHistory.length === 0) return;

    this.searchTag(this._tagHistory[0]);
  }

  async searchTag(tag: string, offset = 0): Promise<void> {

    if (tag.length === 0) return;

    this.organizeHistory(tag);

    const endpoint = `${this.url}/search`;
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('offset', offset)
      .set('limit', 10);

    const request = this.http.get<IGifsSearchResponse>(endpoint, { params }).pipe(
      catchError(error => {
        console.error('Error:', error)
        return [];
      })
    );

    const { data } = await firstValueFrom(request);

    if (!offset) this.gifList = data;
    else this.gifList.push(...data);
  }

  async searchMore() {
    const lastTag = this._tagHistory[0];
    this.searchTag(lastTag, this.gifList.length);
  }
}
