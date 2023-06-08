import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  product!: IProduct

  productForm = this.formBuilder.group(
    {
      id: [0],
      name: [''],
      price: [0],
      desc: [''],
      image: [''],
      categoryId: [0]
    }
  )

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private params: ActivatedRoute
  ) {
    this.params.paramMap.subscribe(params => {
      const id = Number(params.get('id'))
      this.productService.getProduct(id).subscribe(data => {
        this.product = data;

        this.productForm.patchValue({
          id: Number(data._id),
          name: data.name,
          price: data.price,
          desc: data.desc,
          image: data.image,
          categoryId: data.categoryId
        })
      })
    })
  }

  onHandleSubmit() {
    const product: IProduct = {
      _id: this.productForm.value.id || 0,
      name: this.productForm.value.name || "",
      price: this.productForm.value.price || 0,
      desc: this.productForm.value.desc || "",
      image: this.productForm.value.image || "",
      categoryId: this.productForm.value.categoryId || 0,
    }

    const result = window.confirm("Update sản phẩm")
    if (result) {
      this.router.navigateByUrl('/admin/product-management')
      this.productService.updateProduct(product).subscribe()
    }
  }

}



