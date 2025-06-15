const express = require('express');
const router = express.Router();

router.post('/set-theme', (req, res) => {
  const { theme } = req.body;
  if (!['light', 'dark'].includes(theme)) {
    return res.status(400).json({ error: 'Invalid theme' });
  }

  res.cookie('theme', theme, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 днів
    httpOnly: false, //  
    sameSite: 'Lax'
  });

  res.json({ success: true });
});

module.exports = router;