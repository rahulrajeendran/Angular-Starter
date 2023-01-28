import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { discardPeriodicTasks } from '@angular/core/testing';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent{
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  doing= ['work','sleep','game','project'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  taskform !: FormGroup
  updt :boolean=false
  update : number=0;
  flag:number=1;
  constructor(private fb :FormBuilder){}
  ngOnInit(): void{
    this.taskform=this.fb.group({
      task:['',Validators.required]
      // des:['',Validators.required]
    })
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  submit(){
    console.log("submitted");
    this.todo.push(this.taskform.controls['task'].value);
  }
  deletetodo(i :number){
    this.todo.splice(i,1);
  }
  deletedoing(i :number){
    this.doing.splice(i,1);
  }
  deletedone(i :number){
    this.done.splice(i,1);
  }
  updatetodo(item:any,i:number){
   this.taskform.controls['task'].setValue(item);
   this.updt=true
   this.update=i
   this.flag=0;
  }
  updatedoing(item:any,i:number){
   this.taskform.controls['task'].setValue(item);
   this.updt=true
   this.update=i
   this.flag=1;
  }
  updating(){
    if (this.flag==0) {
      this.todo[this.update]=this.taskform.controls['task'].value
    } else {
      this.doing[this.update]=this.taskform.controls['task'].value
    }
    this.updt=false
  }

  show(){
    console.log(this.taskform)
  }

}
