import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required],
  })

  carsData: any;

// carsData = [
// {
//   image: '1.png',
//   name: 'Lamborghini Huracan Spyder',
//   engine: '5.2',
//   year: 2019
// },
// {
//   image: '2.png',
//   name: 'Chevrolet Corvette',
//   engine: '6.2',
//   year: 2017
// },
// {
//   image: '3.png',
//   name: 'Ferrari California',
//   engine: '3.9',
//   year: 2010
// },
// {
//   image: '4.png',
//   name: 'Lamborghini Urus',
//   engine: '4.0',
//   year: 2019
// },
// {
//   image: '5.png',
//   name: 'Audi R8',
//   engine: '5.2',
//   year: 2018
// },
// {
//   image: '6.png',
//   name: 'Chevrolet Camaro',
//   engine: '2.0',
//   year: 2019
// },
// {
//   image: '7.png',
//   name: 'Maserati Quattroporte',
//   engine: '3.0',
//   year: 2018
// },
// {
//   image: '8.png',
//   name: 'Dodge Challenger',
//   engine: '6.4',
//   year: 2019
// },
// {
//   image: '9.png',
//   name: 'Аренда Nissan GT-R',
//   engine: '3.8',
//   year: 2019
// },

// ]


  constructor(private fb: FormBuilder, private appService: AppService) {

  }

  category: string = 'sport';
toggleCategory(category: string) {
  this.category = category;
  this.ngOnInit();
}

  ngOnInit() {
    this.appService.getData(this.category).subscribe(carsData => this.carsData = carsData);
  }

  navigationScroll(target: HTMLElement) {
    target.scrollIntoView({behavior: 'smooth'})
  }

  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({behavior: 'smooth'})
    if (car) {
      this.priceForm.patchValue({car: car.name})
    }
  }


  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
  }



  bgPos: any;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = {backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px'};
  }


  onSubmit() {
    if (this.priceForm.valid) {

      this.appService.sendQuery(this.priceForm.value)
      .subscribe(
        {
          next: (response: any) => {
            alert(response.message);
            this.priceForm.reset();
          },
          error: (response) => {
            alert(response.error.message);
          }
        }
      )

    }
  }
  navScroll() {
    const elem: any = document.querySelector(".main");
    document.addEventListener('scroll', () => {
            elem.style.backgroundPositionX = '0' + (0.4 * window.pageYOffset) + 'px';
  })
}


rollsScroll() {
  let layer: any = document.querySelector('.price-image');
  document.addEventListener('mousemove', (event) => {
          layer.style.transform = 'translate3d(' + ((event.clientX * 0.3) / 8) +
          'px,' + ((event.clientY * 0.4) / 8) + 'px,0px)';
  });
}

}
