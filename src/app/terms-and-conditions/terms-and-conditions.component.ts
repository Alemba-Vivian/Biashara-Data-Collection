import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  constructor(private router: Router) {}

  navigateBack() {
    const state = history.state;
    if (state && state.step!== undefined) {
      this.router.navigate(['/application/apply'], { state: { step: state.step} });
    } else {
      // Handle case where state is not available
    }
  }

  ngOnInit(): void {}
}
