import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from 'src/app/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe( products => {
      this.counter = products.length;
    });
    this.getAllCategory();

    //Luego de recargar la página por ejemplo, el va a obtener el usuario del estado global y se renderizara.
    this.authService.user$
    .subscribe(data => {
      this.profile = data;
      console.log(data);
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    //Este usuario ya esta creado,  simplemente accedemos a el. admin: 'admin@mail.com','admin123'   customer: 'john@mail.com', 'changeme'
    this.authService.loginAndGet('admin@mail.com','admin123')
    .subscribe( () => {
      this.router.navigate(['/profile'])
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.profile = null;
  }

  getAllCategory() {
    return this.categoriesService.getAll()
    .subscribe( data => {
      this.categories = data;
    });
  }

}










