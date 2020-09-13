import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/services/testService';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {

	list: any[];


  constructor(
		private testService: TestService
	) { }

  ngOnInit(): void {
		this.getAll();
	}
	
  getAll() {
    this.testService.getAll().subscribe(
      data => this.list = data.json(),
      err => console.log(err)
    );
  }

}
