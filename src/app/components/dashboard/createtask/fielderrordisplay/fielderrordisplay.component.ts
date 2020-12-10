import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fielderrordisplay',
  templateUrl: './fielderrordisplay.component.html',
  styleUrls: ['./fielderrordisplay.component.scss']
})
export class FieldErrorDisplayComponentComponent{
  @Input() errorMsg: string | undefined;
  @Input() displayError: boolean | undefined;
}
