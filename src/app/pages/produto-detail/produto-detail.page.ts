import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/app/models/produto.dto';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { ActivatedRoute } from '@angular/router';
import { API_CONFIG } from 'src/app/config/api.config';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;

  constructor(private produtoService: ProdutoService, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    let produto_id = this.activedRoute.snapshot.queryParamMap.get('produtos');
    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error => {});
  }

}
