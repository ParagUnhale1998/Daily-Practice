import { Component } from '@angular/core';
import { DataSharingService } from 'src/app/modules/user/services/data-sharing.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {
  instructions:boolean =false

  constructor(private userService:DataSharingService){
    this.instructions=this.userService.userInstructions
  }
  closeModal(){
    this.userService.userInstructions = false
    this.instructions = false
  }
}
