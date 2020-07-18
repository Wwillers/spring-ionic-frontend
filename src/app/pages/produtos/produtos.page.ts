import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/app/models/produto.dto';
import { ProdutoService } from 'src/app/services/domain/produto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];

  constructor(private produtoService: ProdutoService, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    let categoria_id = this.activedRoute.snapshot.queryParamMap.get('categorias');
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
      },
      error => {});
  }

}
