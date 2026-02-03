import { Component } from '@angular/core';
import { HomeHeader } from '../../components/home-header/home-header';
import { ProjectsCarousel } from '../../components/projects-carousel/projects-carousel';
import { ETrust } from '../../components/e-trust/e-trust';
import { Aboutme } from '../../components/aboutme/aboutme';
import { PTrust } from '../../components/p-trust/p-trust';
import { Invisible } from '../../components/invisible/invisible';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeader, ProjectsCarousel, ETrust, Aboutme, PTrust, Invisible],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {}
