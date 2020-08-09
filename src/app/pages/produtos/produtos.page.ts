import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/app/models/produto.dto';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from 'src/app/config/api.config';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];

  constructor(
    private produtoService: ProdutoService, 
    private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let categoria_id = this.activedRoute.snapshot.queryParamMap.get('categorias');
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
      },
      error => {});
  }

  loadImageUrls () {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
        },
        error => {});
    }
  }

  showProdutoDetail() {
    this.router.navigate(['produto-detail']);
  }

}
