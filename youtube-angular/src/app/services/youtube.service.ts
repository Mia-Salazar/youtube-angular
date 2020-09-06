import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  key = 'AIzaSyDxb4inUXYqSfb7gNlqFrTKVbxPPNZuSHc'
  update = 'UUEnHRI6z2gjxQUKekxjshdQ'
  url = 'https://www.googleapis.com/youtube/v3'
  next:string = ''

  constructor(private http:HttpClient) {
  }

  getVideos(){
    const params = new HttpParams()
                  .set('part', 'snippet')
                  .set('maxResults', '10')
                  .set('playlistId', this.update)
                  .set('key', this.key)
                  .set('pageToken', this.next)
    return this.http.get(`${this.url}/playlistItems`, {params:params}).pipe(
      map( (res:any) => {
        this.next = res.nextPageToken;
        return res.items
      }),
      map( (items:any) => {
        return items.map(video => video.snippet)
      })
      )
  }
}
