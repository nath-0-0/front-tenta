import { FormControl, Validators } from '@angular/forms';

export const emailControl = new FormControl('my@email.com', [
    Validators.required,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
]);
