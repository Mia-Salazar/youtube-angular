import { Component } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service'

import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  videos = []
  constructor(private youtubeService:YoutubeService) {
    this.getVideos()
  }

  getVideos(){
    this.youtubeService.getVideos().subscribe(
      (r:any) => {
        this.videos.push(...r)
        console.log(r)
      })
  }

  showVideo(video) {
    Swal.fire({
      html: `
      <iframe width="100%" height="400" src="https://www.youtube.com/embed/${video}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `
    })

  }
}
