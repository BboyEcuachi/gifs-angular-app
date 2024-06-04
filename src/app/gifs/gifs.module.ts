import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { GifCardComponent } from './components/gif-card/gif-card.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    CardListComponent,
    GifCardComponent,
  ],
  imports: [
    CommonModule,
    InfiniteScrollDirective,
  ],
  exports: [
    HomePageComponent,
  ]
})
export class GifsModule { }
