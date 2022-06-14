import { Component, Input } from '@angular/core';
import { SearchCombinationService } from '../../services/search-combination.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, filter } from 'rxjs';
import { Combination } from '../../models/combination';
import { Solution } from '../../models/solution';
import { MatSnackBar } from '@angular/material/snack-bar';

function amountIsNumber(amount: number | null): amount is number {
  return typeof amount === 'number';
}

@Component({
  selector: 'app-level2',
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.scss'],
})
export class Level2Component {
  @Input() shopId!: number;

  amountControl: FormControl<number | null> = this._fb.control<number>(20, [
    Validators.required,
  ]);

  foundSolution$: BehaviorSubject<Solution | null> =
    new BehaviorSubject<Solution | null>(null);

  otherSolutions$: BehaviorSubject<Combination | null> =
    new BehaviorSubject<Combination | null>(null);

  constructor(
    private _searchCombinationService: SearchCombinationService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.amountControl.valueChanges
      .pipe(filter((value) => !value))
      .subscribe(() => this.resetResults());
  }

  private resetResults(): void {
    this.otherSolutions$.next(null);
    this.foundSolution$.next(null);
  }

  validate(): void {
    const amount = this.amountControl.value;
    if (this.amountControl.valid && amountIsNumber(amount)) {
      this.resetResults();
      this._searchCombinationService
        .search(amount, this.shopId)
        .subscribe((combination: Combination) => {
          if (combination.equal) {
            this.chooseSolution(combination.equal);
          } else {
            if (combination.floor && combination.ceil) {
              this.otherSolutions$.next(combination);
            } else {
              if (combination.ceil) {
                this._snackBar.open(`The amount ${amount} is too low`, 'Close');
                this.chooseSolution(combination.ceil);
              }
              if (combination.floor) {
                this._snackBar.open(
                  `The amount ${amount} is too high`,
                  'Close'
                );
                this.chooseSolution(combination.floor);
              }
            }
          }
        });
    }
  }

  chooseSolution(solution: Solution): void {
    this.otherSolutions$.next(null);
    this.amountControl.patchValue(solution.value);
    this.foundSolution$.next(solution);
  }

  nextAmount(): void {
    const amount = this.amountControl.value ?? 0;
    this._searchCombinationService
      .search(amount + 1, this.shopId)
      .subscribe((combination: Combination) => {
        if (combination.equal) {
          this.chooseSolution(combination.equal);
        } else {
          if (!combination.ceil && combination.floor) {
            this._snackBar.open(`No higher amount!`, 'Close');
            this.chooseSolution(combination.floor);
          } else if (combination.ceil) {
            this.chooseSolution(combination.ceil);
          }
        }
      });
  }
  previousAmount(): void {
    const amount = this.amountControl.value ?? 0;
    this._searchCombinationService
      .search(amount - 1, this.shopId)
      .subscribe((combination: Combination) => {
        if (combination.equal) {
          this.chooseSolution(combination.equal);
        } else {
          if (!combination.floor && combination.ceil) {
            this._snackBar.open(`No lowerer amount!`, 'Close');
            this.chooseSolution(combination.ceil);
          } else if (combination.floor) {
            this.chooseSolution(combination.floor);
          }
        }
      });
  }
}
