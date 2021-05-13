import {Component, OnInit} from '@angular/core';
import {Employee} from './employee';
import {EmployeeService} from './employee.service';
import {HttpErrorResponse} from '@angular/common/http';
import {error} from '@angular/compiler/src/util';
import {Form, NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // @ts-ignore
  public employees: Employee[];
  // @ts-ignore
  public editEmployee: Employee;
  // @ts-ignore
  public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
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


  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }


  public onOpenModel(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');

    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deletemployeeModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();

  }


  public onAddEmployee(form: NgForm): void {
    // @ts-ignore
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(form.value).subscribe((response: Employee) => {

      console.log(response);
      this.getEmployees();
      form.reset();

      // tslint:disable-next-line:no-shadowed-variable
    }, (error: HttpErrorResponse) => {
      alert(error.message);
      form.reset();

    });
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe((response: Employee) => {

      console.log(response);
      this.getEmployees();

      // tslint:disable-next-line:no-shadowed-variable
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }


  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe((response: void) => {
      console.log(response);
      this.getEmployees();
      // tslint:disable-next-line:no-shadowed-variable
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }


}
