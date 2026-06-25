// Color mapping by group
const colorByGroup = {
  'Cítricos': '#f07b21',
  'Mangos': '#d4a62f',
  'Aguacates': '#4f8f42',
  'Guayabas': '#83a85c',
  'Otros frutales': '#b96d3a',
  'Anonáceas': '#9bbf54',
}

// Coordenadas generadas espacialmente (viewBox 1102x787)
// Distribuidas en una grilla uniforme de 10x6 para máxima cobertura del terreno
export const guaguya_trees = [
  { id: 1, x: 55, y: 65, species: 'Anon', group: 'Anonáceas', color: colorByGroup['Anonáceas'] },
  { id: 2, x: 165, y: 65, species: 'Tangelo Minneola', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 3, x: 275, y: 65, species: 'Mandarina Oneco', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 4, x: 385, y: 65, species: 'Tangelo Orlando', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 5, x: 495, y: 65, species: 'Tangelo Minneola', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 6, x: 606, y: 65, species: 'Tangelo Minneola', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 7, x: 716, y: 65, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 8, x: 826, y: 65, species: 'Tangelo Orlando', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 9, x: 936, y: 65, species: 'Naranja Ombligona', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 10, x: 1046, y: 65, species: 'Guayaba Pera', group: 'Guayabas', color: colorByGroup['Guayabas'] },

  { id: 11, x: 55, y: 196, species: 'Mandarina Arrayana', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 12, x: 165, y: 196, species: 'Guayaba Pera', group: 'Guayabas', color: colorByGroup['Guayabas'] },
  { id: 13, x: 275, y: 196, species: 'Ciruelo', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 14, x: 385, y: 196, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 15, x: 495, y: 196, species: 'Naranja Sweety', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 16, x: 606, y: 196, species: 'Guayaba Araza', group: 'Guayabas', color: colorByGroup['Guayabas'] },
  { id: 17, x: 716, y: 196, species: 'Aguacate Lorena (Papelillo)', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 18, x: 826, y: 196, species: 'Naranja Sweety', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 19, x: 936, y: 196, species: 'Mandarina Arrayana', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 20, x: 1046, y: 196, species: 'Mandarina Oneco', group: 'Cítricos', color: colorByGroup['Cítricos'] },

  { id: 21, x: 55, y: 327, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 22, x: 165, y: 327, species: 'Tangelo Orlando', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 23, x: 275, y: 327, species: 'Tangelo Orlando', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 24, x: 385, y: 327, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 25, x: 495, y: 327, species: 'Naranja Ombligona', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 26, x: 606, y: 327, species: 'Kumquat Meiwa', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 27, x: 716, y: 327, species: 'Mandarina Arrayana', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 28, x: 826, y: 327, species: 'Tangelo Orlando', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 29, x: 936, y: 327, species: 'Naranja Ombligona', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 30, x: 1046, y: 327, species: 'Limón Nativo', group: 'Cítricos', color: colorByGroup['Cítricos'] },

  { id: 31, x: 55, y: 458, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 32, x: 165, y: 458, species: 'Naranja Ombligona', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 33, x: 275, y: 458, species: 'Aguacate Lorena', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 34, x: 385, y: 458, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 35, x: 495, y: 458, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 36, x: 606, y: 458, species: 'Mandarina Arrayana', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 37, x: 716, y: 458, species: 'Guayaba Coronilla', group: 'Guayabas', color: colorByGroup['Guayabas'] },
  { id: 38, x: 826, y: 458, species: 'Naranja Ombligona Roja', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 39, x: 936, y: 458, species: 'Naranja Sweety', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 40, x: 1046, y: 458, species: 'Naranja Ombligona Roja', group: 'Cítricos', color: colorByGroup['Cítricos'] },

  { id: 41, x: 55, y: 589, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 42, x: 165, y: 589, species: 'Guayaba Peruana', group: 'Guayabas', color: colorByGroup['Guayabas'] },
  { id: 43, x: 275, y: 589, species: 'Aguacate Lorena', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 44, x: 385, y: 589, species: 'Carambola', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 45, x: 495, y: 589, species: 'Mandarina Tangerina', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 46, x: 606, y: 589, species: 'Naranja Sweety', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 47, x: 716, y: 589, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 48, x: 826, y: 589, species: 'Naranja Sweety', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 49, x: 936, y: 589, species: 'Nispero', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 50, x: 1046, y: 589, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },

  { id: 51, x: 55, y: 720, species: 'Naranja Sweety', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 52, x: 165, y: 720, species: 'Madroño', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 53, x: 275, y: 720, species: 'Chirimoyo', group: 'Anonáceas', color: colorByGroup['Anonáceas'] },
  { id: 54, x: 385, y: 720, species: 'Zapote', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
]

export const guaguya_species = [...new Set(guaguya_trees.map((tree) => tree.species))].sort()
export const guaguya_groups = [...new Set(guaguya_trees.map((tree) => tree.group))].sort()

export default guaguya_trees
