import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'iapp-testcomponent',
  templateUrl: './testcomponent.component.html',
  styleUrls: ['./testcomponent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestcomponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
