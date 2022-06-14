import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CalculatorComponentValue } from './components/level3/level3.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wedoogft-challenge-frontend';

  level3Control: FormControl<CalculatorComponentValue | null> =
    this._fb.control<CalculatorComponentValue | null>(null);

  constructor(private _fb: FormBuilder) {
    this.level3Control.valueChanges.subscribe((data) => console.log(data));
  }

  setLevel3(): void {
    this.level3Control.patchValue({
      value: 42,
      cards: [22, 20],
    });
  }
}
