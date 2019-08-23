import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  public form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ])
      ),
      distance: new FormControl('',
        Validators.compose([
          Validators.required,
          // Validators.maxLength(500)
        ])
      ),
    });
  }

  search() {
     this.router.navigate(['x/fm/searchResult', this.form.get('name').value,
                                                this.form.get('distance').value]);

  }


}
