import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Appstate } from './shared/store/appstate';
import { getErrorMessage, showLoadingSpinner } from './shared/store/app.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'UP Agri';
  errorMessage!: Observable<string>;
  showLoading!:Observable<boolean>;
  displayErrorMsg:string='';

  constructor(
    private store:Store<Appstate>,
    ) {}

  ngOnInit() {    
     this.errorMessage = this.store.pipe(select(getErrorMessage));
     this.showLoading = this.store.pipe(select(showLoadingSpinner))
  }
}
