import { articles } from './../../data/data';
import { Component } from '@angular/core';
import { Article } from '../../models/article.model';
import { CommonModule } from '@angular/common';
import { ArticleThumbnailComponent } from '../article-thumbnail/article-thumbnail.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [ CommonModule,  ArticleThumbnailComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent {
  articlesList :Article[] = articles
  
}
