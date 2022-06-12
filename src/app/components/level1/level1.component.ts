import { Component, OnInit } from '@angular/core';
import { SearchCombinationService } from '../../services/search-combination.service';

@Component({
  selector: 'app-level1',
  templateUrl: './level1.component.html',
  styleUrls: ['./level1.component.scss'],
})
export class Level1Component implements OnInit {
  constructor(private searchCombinationService: SearchCombinationService) {}

  ngOnInit(): void {
    this.searchCombinationService
      .search(22, 5)
      .subscribe((data) => console.log(data));
  }
}
