// Color mapping by group
const colorByGroup = {
  'Cítricos': '#f07b21',
  'Mangos': '#d4a62f',
  'Aguacates': '#4f8f42',
  'Guayabas': '#83a85c',
  'Otros frutales': '#b96d3a',
}

// Coordenadas generadas espacialmente (viewBox 1102x787)
// Distribuidas en una grilla uniforme de 10x7 para máxima cobertura del terreno
export const guadalitoTrees = [
  { id: 1, x: 55, y: 56, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 2, x: 165, y: 56, species: 'Limón Nativo', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 3, x: 275, y: 56, species: 'Aguacate Booth-7', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 4, x: 385, y: 56, species: 'Aguacate Lorena', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 5, x: 495, y: 56, species: 'Aguacate Booth-7', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 6, x: 606, y: 56, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 7, x: 716, y: 56, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 8, x: 826, y: 56, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 9, x: 936, y: 56, species: 'Aguacate Lula', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 10, x: 1046, y: 56, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },

  { id: 11, x: 55, y: 168, species: 'Naranja Común', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 12, x: 165, y: 168, species: 'Limón Mandarino', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 13, x: 275, y: 168, species: 'Anon', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 14, x: 385, y: 168, species: 'Anon', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 15, x: 495, y: 168, species: 'Mandarina Arrayana', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 16, x: 606, y: 168, species: 'Tangelo Orlando', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 17, x: 716, y: 168, species: 'Naranja Sweety', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 18, x: 826, y: 168, species: 'Mandarina Oneco', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 19, x: 936, y: 168, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 20, x: 1046, y: 168, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },

  { id: 21, x: 55, y: 281, species: 'Mango Común (Hilacha)', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 22, x: 165, y: 281, species: 'Naranja Ombligona', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 23, x: 275, y: 281, species: 'Zapote Costeño', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 24, x: 385, y: 281, species: 'Aguacate Lorena', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 25, x: 495, y: 281, species: 'Marañón', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 26, x: 606, y: 281, species: 'Aguacate Lorena', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 27, x: 716, y: 281, species: 'Carambola', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 28, x: 826, y: 281, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 29, x: 936, y: 281, species: 'Mandarina Arrayana', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 30, x: 1046, y: 281, species: 'Granada', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },

  { id: 31, x: 55, y: 393, species: 'Mamey', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 32, x: 165, y: 393, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 33, x: 275, y: 393, species: 'Brevo', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 34, x: 385, y: 393, species: 'Brevo', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 35, x: 495, y: 393, species: 'Madroño', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 36, x: 606, y: 393, species: 'Mandarina Arrayana', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 37, x: 716, y: 393, species: 'Guayaba Coronilla', group: 'Guayabas', color: colorByGroup['Guayabas'] },
  { id: 38, x: 826, y: 393, species: 'Guanabano', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 39, x: 936, y: 393, species: 'Aguacate Lorena', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 40, x: 1046, y: 393, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },

  { id: 41, x: 55, y: 505, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 42, x: 165, y: 505, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 43, x: 275, y: 505, species: 'Madroño', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 44, x: 385, y: 505, species: 'Carambola', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 45, x: 495, y: 505, species: 'Guayaba Común', group: 'Guayabas', color: colorByGroup['Guayabas'] },
  { id: 46, x: 606, y: 505, species: 'Guayaba Común', group: 'Guayabas', color: colorByGroup['Guayabas'] },
  { id: 47, x: 716, y: 505, species: 'Níspero', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 48, x: 826, y: 505, species: 'Guayaba Común', group: 'Guayabas', color: colorByGroup['Guayabas'] },
  { id: 49, x: 936, y: 505, species: 'Níspero', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 50, x: 1046, y: 505, species: 'Grosello', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },

  { id: 51, x: 55, y: 618, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 52, x: 165, y: 618, species: 'Zapote', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 53, x: 275, y: 618, species: 'Aguacate Lorena', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 54, x: 385, y: 618, species: 'Zapote', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 55, x: 495, y: 618, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 56, x: 606, y: 618, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 57, x: 716, y: 618, species: 'Tangelo Orlando', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 58, x: 826, y: 618, species: 'Madroño', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 59, x: 936, y: 618, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 60, x: 1046, y: 618, species: 'Madroño', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },

  { id: 61, x: 55, y: 730, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 62, x: 165, y: 730, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 63, x: 275, y: 730, species: 'Naranja Sweety', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 64, x: 385, y: 730, species: 'Guanabano', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 65, x: 495, y: 730, species: 'Guanabano', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 66, x: 606, y: 730, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 67, x: 716, y: 730, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
]

export const guadalitoSpecies = [...new Set(guadalitoTrees.map((tree) => tree.species))].sort()
export const guadalitoGroups = [...new Set(guadalitoTrees.map((tree) => tree.group))].sort()

export default guadalitoTrees
