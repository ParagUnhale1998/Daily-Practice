import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss'],
})
export class UserReposComponent {
  reposData$ = this.dataService.reposData$;
  pageNumber: number = 1;
  pageSize: number = 9;
  isLoading: boolean = true;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.loading$.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

  pageChanged(event: number): void {
    this.pageNumber = event;
  }
}
/*  constructor(private dataService: DataService) {
    // this.dataService.reposData$.subscribe(data => {
    //   this.isLoading  = false
    // })
  }*/
