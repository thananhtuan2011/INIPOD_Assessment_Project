import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserInfor } from '@app/auth/interface/iUserInfor.interface';
import { AuthenticationService } from '@app/auth/service/authentication.service';
import { MENU_ITEMS } from '@app/utils/header.menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  UserInfor!: UserInfor
  private auth_services = inject(AuthenticationService)
  private destroyRef = inject(DestroyRef);

  MENU_ITEMS = MENU_ITEMS;
  isMobileMenuOpen = false;
  expandedMenus: { [key: string]: boolean } = {};

  toggleSubmenu(id: string): void {
    this.expandedMenus[id] = !this.expandedMenus[id];
  }
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  ngOnInit(): void {
    this.GetInforUser();
  }
  GetInforUser() {
    this.auth_services.GetInforUser().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
      if (res) {
        this.UserInfor = res;

      }
    });
  }
  Logout() {
    this.auth_services.logout()
  }
}
