const generateNextUserId = (users) => {
  if (!Array.isArray(users) || users.length === 0) return 1;
  return Math.max(...users.map(u => u.id || 0)) + 1;
};

module.exports = { generateNextUserId };
