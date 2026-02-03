export type ProjectCategory = 'graphisme' | 'motion-design' | 'web-design';
export type ProjectComposition = 1 | 2 | 3 | 4;

export interface Project {
  id: string;                 // identifiant interne
  token: string;              // slug URL (ex: 'ac-immo')
  name: string;               // nom affiché
  companyName: string;        // entreprise affichée

  categories: ProjectCategory[];

  composition: ProjectComposition;

  // assets : assets/projects/<token>/<file>
  thumbnail: string;
  thumbs:string;          // ex: 'thumb.jpg' ou 'vignette.png'
  logo?: string;              // ex: 'logo.png'

  header?: string;            
  title?: string;
  description?: string;

  compositionMedia: string[];
}
