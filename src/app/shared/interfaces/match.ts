import {Equipe} from './equipe';
import {Pari} from './pari';

export interface Match {
  _id?: string,
  date_match: Date,
  latitude: number,
  longitude: number,
  equipe1: Equipe,
  equipe2: Equipe,
  etat: Boolean,
  pari: Pari[],
}
