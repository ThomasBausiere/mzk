import { Component } from '@angular/core';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [Contact],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class ContactPage {}
