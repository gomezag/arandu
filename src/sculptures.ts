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
  hero: boolean;
  background: string;
}

const sculptures: Sculpture[] = [
    {
        key: "equilibrio",
        image: equilibrio,
        size: "",
        hero: false,
        background: "bg-stone-100"
    },
    {
        key: "kitsune",
        image: kitsune,
        size: "",
        hero: true,
        background: "bg-stone-100"
    },
    {
        key: "madreDeDos",
        image: madreDeDos,
        size: "15x25x37 cm",
        hero: true,
        background: "bg-stone-100"
    },
    {
        key: "dormision",
        image: dormision,
        size: "",
        hero: true,
        background: "bg-stone-100"
    },
    {
        key: "paternidad",
        image: paternidad,
        size: "",
        hero: false,
        background: "bg-white"
    },
    {
        key: "onirica",
        image: onirica,
        size: "",
        hero: false,
        background: "bg-black"
    },
    {
        key: "pesebre",
        image: pesebre,
        size: "",
        hero: false,
        background: "bg-black"
    },
    {
        key: "sirena",
        image: sirena,
        size: "",
        hero: false,
        background: "bg-black"
    },
];

export default sculptures;
