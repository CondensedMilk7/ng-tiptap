export const defaultFontFamilies: string[] = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Lucida Console',
  'Roboto',
  'Open Sans',
  'Lato',
  'Oswald',
  'Slabo 27px',
  'Source Sans Pro',
  'Montserrat',
  'Raleway',
  'PT Sans',
  'Noto Sans',
  'Lora',
  'Ubuntu',
  'Droid Sans',
  'Roboto Condensed',
  'Merriweather',
  'Fira Sans',
  'PT Serif',
  'Poppins',
  'Playfair Display',
  'Nunito',
  'Muli',
  'Cabin',
  'Work Sans',
  'Quicksand',
  'Zilla Slab',
  'Comfortaa',
  'Roboto Mono',
  'Libre Baskerville',
  'Rubik',
  'Arvo',
  'PT Sans Narrow',
  'Inconsolata',
  'Karla',
  'Exo 2',
  'Abel',
  'Old Standard TT',
];

export function loadFont(fontName: string) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
    ' ',
    '+'
  )}&display=swap`;
  document.head.appendChild(link);
}
