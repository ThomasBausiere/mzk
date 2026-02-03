import { Component } from '@angular/core';

type Testimonial = {
  avatar: string;
  name: string;
  role: string;
  text: string;
};

@Component({
  selector: 'app-p-trust',
  standalone: true,
  templateUrl: './p-trust.html',
  styleUrls: ['./p-trust.css'],
})
export class PTrust {
  testimonials: Testimonial[] = [
    {
      avatar: 'assets/people/testimonials/marion.jpeg',
      name: 'Marion Belhakam',
      role: 'Responsable Communication | MESA',
      text: `Cela a été un réel plaisir de travailler avec Amel !

Elle a su comprendre nos besoins et nos attentes et a rapidement proposé des concepts créatifs ! 

Les retours ont pu être fait très vite, c'est une professionnelle très réactive !  Elle a respecté les délais tout en maintenant une excellente communication tout au long du processus.

Chaque modification demandée a été effectuée avec soin et rapidité, ce qui a rendu la collaboration fluide et agréable.

De plus, elle a su capturer l'essence de ce que je souhaitais communiquer, tout en apportant sa touche artistique. Je recommande vivement Amel pour ceux à la recherche d'une graphiste talentueuse et fiable.`,
    },
    {
      avatar: 'assets/people/testimonials/celine.jpeg',
      name: 'Céline Pinceel',
      role: 'Directrice adjointe | Ohmydiode',
      text: `Lors de son passage chez nous, Amel a su s’adapter facilement et efficacement à l’organisation interne du studio et a accompli toutes ses missions avec succès. Nous la remercions particulièrement pour son professionnalisme, son implication et sa créativité !
En tant que motion designer, Amel a su être force de proposition

sur les projets du studio et apporter sa touche personnelle.
Sa bonne humeur et son esprit d’équipe ont été très appréciés par ses collègues.


C’est pourquoi je vous recommande chaleureusement

Amel Merzouk !`,
    },
    {
      avatar: 'assets/people/testimonials/david.jpeg',
      name: 'David Dumont',
      role: 'Directeur artistique | DLPK',
      text: `Je recommande vivement Amel Merzouk pour le poste de Graphic Designer. Pendant un an et demi chez DLPK en tant que Motion Designer, Amel a démontré d'excellentes compétences techniques et créatives, devenant un atout essentiel pour notre équipe. Elle excelle en motion design, de la conception à la réalisation technique, ainsi qu'en création print. Autonome et proactive, Amel apporte toujours des idées nouvelles. En plus de ses compétences, elle est solaire, agréable au quotidien, toujours souriante et sociable. Son savoir-faire et sa personnalité seront des atouts précieux pour renforcer l'aspect créatif de vos projets, et je suis convaincu qu'elle sera un membre clé de votre équipe.`,
    },
        {
      avatar: 'assets/people/testimonials/anatole.jpeg',
      name: 'Anatole Chevet',
      role: `Entrepreneur dans l'immobillier | AC-Immo`,
      text: `Amel m'a accompagné dans la création de mon identité visuelle pour mon activité immobilière ainsi que pour l'identité graphique du site web. Les trois propositions de logo étaient toutes très cohérentes, et la première a su me faire l'effet coup de cœur recherché. J'ai beaucoup apprécié la présence des explications jointes aux logos, qui m'ont conforté dans mon choix et que j'ai trouvées très précises. Amel voit juste dans notre projet et apporte une vraie plus-value grâce à ses connaissances professionnelles et son sens artistique. Je suis très satisfait du visuel de mon site ainsi que de mon logo. Je ferai de nouveau appel à ses services sans hésitation.`,
    },
        {
      avatar: 'assets/people/testimonials/claire.jpeg',
      name: 'Claire Huntz',
      role: 'CEO Saint-Barths | Prints',
      text: `Je recherchais un motion designer, et j'ai eu la chance de rencontrer Amel. Amel répond parfaitement à mes attentes pour des animations d'illustrations. Grâce à sa créativité et sa réactivité, nous avons aussi travaillé sur des idées de motion design à proposer à mes clients. 

​

Merci Amel` ,
    },
  ];
}
