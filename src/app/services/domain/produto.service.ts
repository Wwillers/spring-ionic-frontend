import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Observable } from 'rxjs';
import { ProdutoDTO } from 'src/app/models/produto.dto';

@Injectable()
export class ProdutoService {

    constructor(private http: HttpClient) {
    }

    findById(produto_id: string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    } 

    findByCategoria(categoria_id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }

    getSmallImageFromBucket (id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

    getImageFromBucket (id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

}