import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-oplata',
  templateUrl: './oplata.component.html',
  styleUrls: ['./oplata.component.scss']
})
export class OplataComponent implements OnInit {
  isLoading = false;
  isLoad = false;
  timerId: any;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    form.reset();
  }

  pay(){
    this.timerId = setTimeout(()=>{
    this.isLoading = !this.isLoading},100)

    this.timerId = setTimeout(()=>{
      this.isLoading = !this.isLoading, this.isLoad =!this.isLoad},1000)

    // this.timerId = setTimeout(()=>{
    //   console.log('dsadsa')},3000)


  }
}
