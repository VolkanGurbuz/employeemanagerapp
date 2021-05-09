import {Component, OnInit} from '@angular/core';
import {Employee} from './employee';
import {EmployeeService} from './employee.service';
import {HttpErrorResponse} from '@angular/common/http';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // @ts-ignore
  public employees: Employee[];


  constructor(private employeeService: EmployeeService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      // tslint:disable-next-line:no-shadowed-variable
      (error: HttpErrorResponse) => {
        alert(error.message);
    }
    );
  }


}
