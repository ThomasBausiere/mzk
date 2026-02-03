import { Component } from '@angular/core';

type ServiceCard = {
  icon: string;     // url
  iconAlt: string;
  text: string;
};

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [],
  templateUrl: './aboutme.html',
  styleUrls: ['./aboutme.css'],
})
export class Aboutme {
  services: ServiceCard[] = [
    {
      icon: 'assets/icones/stylo.svg',
      iconAlt: 'Identité visuelle',
      text: "Je crée des identités visuelles (logos, chartes, supports) pour assurer une cohérence et refléter l’image de chaque client.",
    },
    {
      icon: 'assets/icones/play.svg',
      iconAlt: 'Motion design',
      text: "Je réalise des animations motion design pour donner du mouvement à vos visuels, renforcer l’impact et clarifier vos messages.",
    },
    {
      icon: 'assets/icones/web.svg',
      iconAlt: 'Web design',
      text: "Je conçois des maquettes web (UI/UX) sur Figma et des interfaces responsive, adaptées à tous les supports.",
    },
  ];


  mailtoHref =
    'mailto:amelmerzouk@gmail.com';
}
