import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-gif-card',
  templateUrl: './gif-card.component.html',
  styleUrl: './gif-card.component.css'
})
export class GifCardComponent {
  @Input() gif!: Gif;

}
