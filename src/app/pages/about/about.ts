import { Component } from '@angular/core';
import { Aboutme } from '../../components/aboutme/aboutme';
import { ETrust } from '../../components/e-trust/e-trust';
import { PTrust } from '../../components/p-trust/p-trust';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [Aboutme, ETrust, PTrust],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About {}
