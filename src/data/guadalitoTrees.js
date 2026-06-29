// Color mapping by group
const colorByGroup = {
  'Cítricos': '#f07b21',
  'Mangos': '#d4a62f',
  'Aguacates': '#4f8f42',
  'Guayabas': '#83a85c',
  'Otros frutales': '#b96d3a',
}

// Coordenadas posicionadas manualmente sobre el mapa satelital (viewBox 1102x787)
// Ajustadas con el calibrador y colocadas una por una en modo edición
export const guadalitoTrees = [
  { id: 1, x: 446.47, y: 513.14, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 2, x: 458.00, y: 472.32, species: 'Limón Nativo', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 3, x: 487.15, y: 446.85, species: 'Aguacate Booth-7', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 4, x: 489.22, y: 472.83, species: 'Aguacate Lorena', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 5, x: 506.10, y: 466.24, species: 'Aguacate Booth-7', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 6, x: 501.19, y: 526.29, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 7, x: 501.05, y: 516.74, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 8, x: 500.20, y: 508.72, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 9, x: 501.15, y: 501.80, species: 'Aguacate Lula', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 10, x: 501.58, y: 486.94, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },

  { id: 11, x: 501.44, y: 477.39, species: 'Naranja Común', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 12, x: 512.22, y: 477.87, species: 'Limón Mandarino', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 13, x: 513.56, y: 464.93, species: 'Anon', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 14, x: 519.60, y: 465.32, species: 'Anon', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 15, x: 510.51, y: 499.13, species: 'Mandarina Arrayana', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 16, x: 508.51, y: 523.47, species: 'Tangelo Orlando', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 17, x: 506.81, y: 513.66, species: 'Naranja Sweety', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 18, x: 512.35, y: 504.69, species: 'Mandarina Oneco', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 19, x: 519.12, y: 478.33, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 20, x: 527.61, y: 464.06, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },

  { id: 21, x: 525.00, y: 478.85, species: 'Mango Común (Hilacha)', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 22, x: 517.98, y: 497.74, species: 'Naranja Ombligona', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 23, x: 515.85, y: 504.37, species: 'Zapote Costeño', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 24, x: 514.16, y: 517.66, species: 'Aguacate Lorena', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 25, x: 515.44, y: 521.95, species: 'Marañón', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 26, x: 519.94, y: 516.16, species: 'Aguacate Lorena', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 27, x: 521.70, y: 502.60, species: 'Carambola', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 28, x: 523.57, y: 492.20, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 29, x: 523.53, y: 485.06, species: 'Mandarina Arrayana', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 30, x: 573.28, y: 475.37, species: 'Granada', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },

  { id: 31, x: 559.24, y: 486.38, species: 'Mamey', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 32, x: 535.98, y: 486.65, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 33, x: 536.52, y: 477.06, species: 'Brevo', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 34, x: 537.25, y: 466.65, species: 'Brevo', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 35, x: 537.16, y: 456.06, species: 'Madroño', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 36, x: 552.72, y: 456.85, species: 'Mandarina Arrayana', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 37, x: 549.01, y: 441.05, species: 'Guayaba Coronilla', group: 'Guayabas', color: colorByGroup['Guayabas'] },
  { id: 38, x: 551.38, y: 427.32, species: 'Guanabano', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 39, x: 563.14, y: 486.94, species: 'Aguacate Lorena', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 40, x: 565.12, y: 488.26, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },

  { id: 41, x: 566.27, y: 488.24, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 42, x: 562.13, y: 457.89, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 43, x: 567.93, y: 441.14, species: 'Madroño', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 44, x: 565.06, y: 448.47, species: 'Carambola', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 45, x: 568.94, y: 455.09, species: 'Guayaba Común', group: 'Guayabas', color: colorByGroup['Guayabas'] },
  { id: 46, x: 575.61, y: 457.25, species: 'Guayaba Común', group: 'Guayabas', color: colorByGroup['Guayabas'] },
  { id: 47, x: 575.62, y: 462.11, species: 'Níspero', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 48, x: 575.89, y: 467.03, species: 'Guayaba Común', group: 'Guayabas', color: colorByGroup['Guayabas'] },
  { id: 49, x: 576.63, y: 471.20, species: 'Níspero', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 50, x: 576.24, y: 474.54, species: 'Grosello', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },

  { id: 51, x: 566.96, y: 493.84, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 52, x: 569.29, y: 491.24, species: 'Zapote', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 53, x: 571.30, y: 494.85, species: 'Aguacate Lorena', group: 'Aguacates', color: colorByGroup['Aguacates'] },
  { id: 54, x: 569.69, y: 500.48, species: 'Zapote', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 55, x: 573.76, y: 486.57, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 56, x: 536.77, y: 374.97, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 57, x: 542.60, y: 380.62, species: 'Tangelo Orlando', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 58, x: 546.37, y: 384.07, species: 'Madroño', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 59, x: 571.52, y: 384.24, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 60, x: 579.19, y: 390.61, species: 'Madroño', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },

  { id: 61, x: 603.34, y: 432.84, species: 'Naranja Valencia', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 62, x: 595.07, y: 456.98, species: 'Limón Tahití', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 63, x: 591.68, y: 471.40, species: 'Naranja Sweety', group: 'Cítricos', color: colorByGroup['Cítricos'] },
  { id: 64, x: 588.35, y: 501.81, species: 'Guanabano', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 65, x: 572.92, y: 499.34, species: 'Guanabano', group: 'Otros frutales', color: colorByGroup['Otros frutales'] },
  { id: 66, x: 573.88, y: 503.37, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
  { id: 67, x: 575.82, y: 506.48, species: 'Mango Tommy', group: 'Mangos', color: colorByGroup['Mangos'] },
]

export const guadalitoSpecies = [...new Set(guadalitoTrees.map((tree) => tree.species))].sort()
export const guadalitoGroups = [...new Set(guadalitoTrees.map((tree) => tree.group))].sort()

export default guadalitoTrees
