import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
import { Project } from './pages/project/project';
import {  ContactPage } from './pages/contact/contact';

export const routes: Routes = [
    {path:"", component:Home},
    {path:"about", component:About},
    {path:"projects", component:Projects},
    {path:"project/:token", component:Project},
    {path:'contact', component:ContactPage},
    { path: '**', redirectTo: '' },    
];
