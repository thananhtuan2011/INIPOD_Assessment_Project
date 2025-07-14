import { Component } from '@angular/core';
import { MENU_ITEMS } from '@app/utils/header.menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  MENU_ITEMS = MENU_ITEMS;
  isMobileMenuOpen = false;
  expandedMenus: { [key: string]: boolean } = {};

  toggleSubmenu(id: string): void {
    this.expandedMenus[id] = !this.expandedMenus[id];
  }
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
