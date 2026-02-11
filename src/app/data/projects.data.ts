import { Project } from '../models/projects';

export const PROJECTS: Project[] = [
  {
    id: 'ac-immo',
    token: 'ac-immo',
    name: 'ac-immo',
    companyName: 'ac-immo',
    categories: ['graphisme', 'motion-design', 'web-design'],
    composition: 3,
    thumbnail: 'thumb.jpeg',
    thumbs: 'thumbs.jpg',
    logo: 'logo.png',

    header: 'header.mp4',

    title: 'Création graphique :  AC IMMO',
    description:
      'Collaboration avec un investisseur immobilier pour la création de son site web et de son identité visuelle complète. Le logo, la charte graphique et la brochure ont été conçus pour refléter son expertise et sa modernité. Les choix de typographie, de couleurs et de mise en page ont été pensés pour créer une image élégante, renforcer la crédibilité auprès des banquiers et clients, et assurer un positionnement professionnel fort et contemporain.',

    // comp 3 = 5 medias
    compositionMedia: [
      'https://www.youtube.com/watch?v=JKbAOwIlNm4', // 01
      '02.png',
      '03.png',
      '04.png',
      'https://www.youtube.com/watch?v=TwFo_vpPaSw', // 05
    ],
  },

  {
    id: 'anteos',
    token: 'anteos',
    name: 'anteos',
    companyName: 'anteos',
    categories: ['graphisme'],
    composition: 1,
    thumbnail: 'thumb.jpeg',
    thumbs: 'thumbs.jpg',
    logo: 'logo.png',

    header: 'header.mp4',

    title: 'Identité graphique : Antéos',
    description: 'Dans le cadre d’une mission freelance, j’ai conçu l’identité graphique complète d’une marque d’argile dédiée à la santé des sportifs, avec un positionnement premium. Le travail s’est concentré sur la création d’une identité forte et impactante, reflétant les valeurs sportives, naturelles et haut de gamme de la marque',
    // comp 1 = 4 medias (images)
    compositionMedia: ['01.png', '02.png', '03.png', '04.png'],
  },

  {
    id: 'app',
    token: 'app',
    name: 'app',
    companyName: 'app',
    categories: ['web-design'],
    composition: 2,
    thumbnail: 'thumb.jpeg',
    thumbs: 'thumbs.jpg',
    logo: 'logo.png',

    header: 'header.mp4',

    title: 'Application mobile : Institut de Genech',
    description: 'Dans le cadre d’un projet scolaire, j’ai conçu l’UI/UX d’une application pensée pour répondre aux besoins des élèves. Elle leur permet d’accéder à leur emploi du temps et de le gérer en y ajoutant des éléments personnalisés. L’application permet également de suivre l’actualité de l’établissement, de rechercher des stages ou encore d’échanger par e-mail.',
    // comp 2 = 3 medias
    compositionMedia: [
      'https://www.youtube.com/watch?v=NWamvh_II9U', // 01
      'https://www.youtube.com/watch?v=Bm7Dh4C-Ks8', // 02
      'https://www.youtube.com/watch?v=oaPLorvjR2E', // 03
    ],
  },

  {
    id: 'can',
    token: 'can',
    name: 'can',
    companyName: 'can',
    categories: ['motion-design'],
    composition: 1,
    thumbnail: 'thumb.jpg',
    thumbs: 'thumbs.png',
    logo: 'logo.png',

    header: 'header.mp4',

    title: 'CAN 2023',
    description: 'Lors d’une mission freelance pour l’agence BR Units, j’ai travaillé sur la création des visuels dédiés à l’habillage des stades de la CAN 2023. Des vomitoires aux backdrops, en passant par les tapis, les bancs de joueurs et les zones médias, chaque espace a été conçu pour renforcer l’identité visuelle de l’événement. Un projet de grande ampleur qui m’a permis de décliner une charte graphique cohérente et impactante sur de nombreux supports.',
    compositionMedia: [
      'https://www.youtube.com/watch?v=a_pTFUWOZbk', // 01
      'https://www.youtube.com/watch?v=tGsLevhCCKw', // 02
      'https://www.youtube.com/watch?v=SvQTFCzeRxY', // 03
      'https://www.youtube.com/watch?v=7VtzvjC7Tc8', // 04
    ],
  },

  {
    id: 'icones',
    token: 'icones',
    name: 'icones',
    companyName: 'nortia',
    categories: ['graphisme'],
    composition: 2,
    thumbnail: 'thumb.jpeg',
    thumbs: 'thumbs.jpg',
    logo: 'logo.png',

    header: 'header.mp4',

    title: 'Création graphique :  Icônes Nortia',
    description: 'Pour le site web de Nortia, j’ai conçu et animé des icônes, en développant une direction artistique alignée avec l’image moderne et premium de la marque. Chaque choix graphique respecte la charte tout en renforçant la cohérence visuelle et l’expérience utilisateur.',
    compositionMedia: [
      'https://www.youtube.com/watch?v=X9RoDw4cVA4', // 01
      'https://www.youtube.com/watch?v=emUdBSU-ijc', // 02
      'https://www.youtube.com/watch?v=kkzPinrdr6w', // 03
    ],
  },

  {
    id: 'invitation',
    token: 'invitation',
    name: 'invitation',
    companyName: 'invitation',
    categories: ['graphisme'],
    composition: 4,
    thumbnail: 'thumb.jpeg',
    thumbs: 'thumbs.jpg',
    logo: 'logo.png',

    header: 'header.mp4',

    title: 'Création invitation : coupe du monde',
    description: 'Collaboration avec Nortia pour la création de visuels de newsletters invitant les clients à assister à la diffusion de matchs de la Coupe du Monde au Stade de France. Les visuels s’appuient sur les couleurs de l’équipe de France, complétées par l’orange de la charte graphique Nortia. Ce jeu de couleurs complémentaires a été pensé pour créer du contraste, capter l’attention et renforcer la visibilité et l’impact des visuels.',
    // comp 4 = 6 medias (images)
    compositionMedia: ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png'],
  },

  {
    id: 'nortia-fr',
    token: 'nortia-fr',
    name: 'nortia-fr',
    companyName: 'nortia',
    categories: ['graphisme'],
    composition: 1,
    thumbnail: 'thumb.jpeg',
    thumbs: 'thumbs.jpg',
    logo: 'logo.png',

    header: 'header.mp4',

    title: 'Motion promotionnel : Nortia.fr',
    description: 'Pour valoriser le nouveau site internet de Nortia et renforcer sa visibilité dans un secteur financier traditionnel, j’ai conçu une vidéo en motion design utilisant de la kinetic typography. Une direction artistique minimaliste, associée à des animations fluides et des transitions dynamiques, crée un rendu moderne, élégant et premium, le tout accompagné d’une musique rythmée qui donne au site une identité distinctive et contemporaine.',
    compositionMedia: [
      'https://www.youtube.com/watch?v=MeEkVYsvOA0', // 01
      'https://www.youtube.com/watch?v=OxI8AQK_aCs', // 02
      'https://www.youtube.com/watch?v=2CnQ74XmM_g', // 03
      'https://www.youtube.com/watch?v=sRqcj-bTas0', // 04
    ],
  },

  {
    id: 'omd',
    token: 'omd',
    name: 'omd',
    companyName: 'omd',
    categories: ['motion-design'],
    composition: 2,
    thumbnail: 'thumb.jpg',
    thumbs: 'thumbs.jpg',
    logo: 'logo.png',

    header: 'header.mp4',

    title: 'Spot Auto promo : Oh My Diode',
    description: `Durant mon CDD chez Ohmydiode, j'ai eu l'opportunité de réaliser un spot autopromo pour l'agence à l'occasion des vacances d'été. Pour ce projet, j'ai utilisé la 3D en intégrant la technique de l'anamorphisme, ce qui a permis de créer un effet visuel impactant et original.`,
    compositionMedia: [
      'https://www.youtube.com/watch?v=H_g3m_y8qL0', // 01
      'https://www.youtube.com/watch?v=QTinKnkkZFM', // 02
      'https://www.youtube.com/watch?v=ewbGaB2KUlw', // 03
    ],
  },

  {
    id: 'universite',
    token: 'universite',
    name: 'universite',
    companyName: 'universite',
    categories: ['motion-design'],
    composition: 1,
    thumbnail: 'thumb.jpg',
    thumbs: 'thumbs.jpg',
    logo: 'logo.png',

    header: 'header.mp4',

    title: 'Motion design : Émission Université 2023',
    description: 'Pour l’entreprise Nortia, j’ai conçu la scénographie en motion design d’un événement annuel diffusé sur TF1, portant sur les dernières tendances de la finance. J’ai réalisé les animations pour les écrans du plateau, les génériques, jingles, sommaires et synthés, et produit des teasers, interviews animées et bannières web pour assurer une communication complète et cohérente autour de l’événement sur les réseaux sociaux.',
    compositionMedia: [
      'https://www.youtube.com/watch?v=EFdhP0YHVBA', // 01 
      'https://www.youtube.com/watch?v=6TZptp3fhRA', // 02
      'https://www.youtube.com/watch?v=JSRUUUMDWBw', // 03
      'https://www.youtube.com/watch?v=P0kd3Hob4Vc', // 04
    ],
  },
];
