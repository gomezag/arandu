import madreDeDos from './assets/madreDeDos.jpeg';
import dormision from './assets/dormision.jpeg';
import sirena from './assets/sirena.jpeg';
import onirica from './assets/onirica.jpeg';
import paternidad from './assets/paternidad.jpeg';
import pesebre from './assets/pesebre.jpeg';
import equilibrio from './assets/enEquilibrio.jpeg'
import kitsune from './assets/kitsune.jpeg';


interface Sculpture {
  key: string;
  image: string;
  size: string;
}

const sculptures: Sculpture[] = [
    {
        key: "equilibrio",
        image: equilibrio,
        size: ""
    },
    {
        key: "kitsune",
        image: kitsune,
        size: ""
    },
    {
        key: "madreDeDos",
        image: madreDeDos,
        size: "15x25x37 cm"
    },
    {
        key: "dormision",
        image: dormision,
        size: ""
    },
    {
        key: "paternidad",
        image: paternidad,
        size: ""
    },
    {
        key: "onirica",
        image: onirica,
        size: ""
    },
    {
        key: "pesebre",
        image: pesebre,
        size: ""
    },
    {
        key: "sirena",
        image: sirena,
        size: ""
    },
];

export default sculptures;
