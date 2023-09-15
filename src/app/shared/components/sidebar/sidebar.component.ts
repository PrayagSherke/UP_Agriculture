import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {



  openSidebar: boolean = true;

  menuSidebar: any = [
    {
      link_name: "Dashboard",
      link: "/dashboard",
      icon: "bx bx-grid-alt",
      sub_menu: []
    }, {
      link_name: "Category",
      link: null,
      icon: "bx bx-collection",
      sub_menu: [
        {
          link_name: "HTML & CSS",
          link: "/html-n-css",
        }, {
          link_name: "JavaScript",
          link: "/javascript",
        }, {
          link_name: "PHP & MySQL",
          link: "/php-n-mysql",
        }
      ]
    }, {
      link_name: "Logout",
      link: "/login",
      icon: "bx bx-cog",
      sub_menu: []
    }
  ]


  constructor() { }

  ngOnInit(): void {
  }

  showSubmenu(itemEle: HTMLElement) {
    itemEle.classList.toggle('showMenu');
  }

}
