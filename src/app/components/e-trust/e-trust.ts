import { Component } from '@angular/core';

type CompanyLogo = { src: string; alt: string, size?:string };

@Component({
  selector: 'app-e-trust',
  standalone: true,
  templateUrl: './e-trust.html',
  styleUrls: ['./e-trust.css'],
})
export class ETrust {
  logos: CompanyLogo[] = [
    { src: 'assets/logo/compagnies/ac.svg', alt: 'AC' },
    { src: 'assets/logo/compagnies/anteos.svg', alt: 'Anteos' },
    { src: 'assets/logo/compagnies/br.svg', alt: 'BR' },
    { src: 'assets/logo/compagnies/dlpk.svg', alt: 'DLPK',size: 'large' },
    { src: 'assets/logo/compagnies/mecatechnic.svg', alt: 'Mecatechnic' },
    { src: 'assets/logo/compagnies/mesa.svg', alt: 'MESA' },
    { src: 'assets/logo/compagnies/nortia.svg', alt: 'Nortia' },
    { src: 'assets/logo/compagnies/saint_barth.svg', alt: 'Saint Barth', size: 'large' },
    { src: 'assets/logo/compagnies/omd.svg', alt: 'Ohmydiod',size:'small' },

  ];
}
