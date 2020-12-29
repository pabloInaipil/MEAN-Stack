import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';





@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();

  }

  resetForm( form: NgForm) {
    form.reset();
  


  }


  getEmployees(){
    this.employeeService.getEmployees().subscribe(
      res => {
        this.employeeService.employees = res;

      },
      err => console.error(err)
    );
  }

  addEmployee( form: NgForm){
    if (form.value._id) {
      this.employeeService.putEmployee(form.value).subscribe( 
        res => console.log(res),
        err => console.log(err)
      )

    } else {
      this.employeeService.createEmployee(form.value).subscribe(
        (res) => {
          this.getEmployees();
          form.reset();
        },
        (err) => console.error(err)
      );
    }
  
  }

  deleteEmployee( id: string) {
    if ( confirm('Are you shure you want to delete it?')) {
    this.employeeService.deleteEmployee(id).subscribe(
      (res) => {
        this.getEmployees();
      }, 
      (err) => console.error(err)
      );
    }
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  
}


}
