// Utilidad para combinaci├│n flexible de clases
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export default cn;
