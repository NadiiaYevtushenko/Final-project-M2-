module.exports = function slugify(text) {
  return text
    .toString()
    .normalize('NFD')                     // Remove accents
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Zа-яА-Я0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-')                 // Replace spaces with dashes
    .replace(/-+/g, '-')                  // Collapse dashes
    .toLowerCase();
};