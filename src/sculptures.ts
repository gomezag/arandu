import sagradaFamiliaImage from './assets/sagradaFamilia.jpeg';
import sleepingCatsImage from './assets/sleepingCats.jpeg';
import sirenSongImage from './assets/sirenSong.jpeg';
import mujer from './assets/mujer.jpeg';
import peregrinaje from './assets/peregrinaje.jpeg';
import pesebre from './assets/pesebre.jpeg';

interface Sculpture {
  key: string;
  image: string;
  size: string;
}

const sculptures: Sculpture[] = [
  {
    key: "sagradaFamilia",
    image: sagradaFamiliaImage,
    size: "15x25x37 cm"
  },
  {
    key: "sleepingCats",
    image: sleepingCatsImage,
    size: ""
  },
  {
    key: "peregrinaje",
    image: peregrinaje,
    size: ""
  },
  {
    key: "mujer",
    image: mujer,
    size: ""
  },
  {
    key: "pesebre",
    image: pesebre,
    size: ""
  },
  {
    key: "sirenSong",
    image: sirenSongImage,
    size: ""
  }
];

export default sculptures;
