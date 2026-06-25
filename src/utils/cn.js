// Utilidad para combinación flexible de clases
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export default cn;
