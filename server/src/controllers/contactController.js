exports.handleContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Усі поля є обов’язковими' });
  }

  // 🔸 Тут можна реалізувати: запис в базу, відправку email, логування і т.д.
  console.log('📨 Contact form submitted:', { name, email, message });

  return res.status(200).json({ message: 'Форму успішно надіслано' });
};
