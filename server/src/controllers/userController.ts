import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../config/jwtUtils';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

const dummyUsers: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwordHash: string;
  isAdmin: boolean;
}[] = [];

// ✅ Реєстрація звичайного користувача (ніколи не адміністратор)
export const createUser = (req: Request, res: Response): void => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
  } = req.body;

  if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
    res.status(400).json({ message: 'Всі поля обовʼязкові' });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ message: 'Паролі не збігаються' });
    return;
  }

  const userExists =
    email === 'admin@ex.com' || dummyUsers.find((u) => u.email === email);

  if (userExists) {
    res.status(409).json({ message: 'Користувач з таким email вже існує' });
    return;
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const newUser = {
    firstName,
    lastName,
    email,
    phone,
    passwordHash,
    isAdmin: false, // звичайний користувач
  };

  dummyUsers.push(newUser);

  console.log('🆕 Створено користувача:', newUser);

  res.status(201).json({ message: 'Реєстрація успішна' });
};

// 🔐 Логін (особлива обробка для admin@ex.com)
export const loginUser = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  // 🎯 Спеціальний випадок — адміністратор
  if (email === 'admin@ex.com') {
    const adminPassword = '11111';
    const isPasswordCorrect = password === adminPassword;

    if (!isPasswordCorrect) {
      res.status(401).json({ message: 'Невірний пароль' });
      return;
    }

    const token = generateToken({ email, isAdmin: true });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        email,
        firstName: 'Admin',
        isAdmin: true,
      },
    });
    return;
  }

  // 🔍 Для всіх інших — dummyUsers
  const user = dummyUsers.find((u) => u.email === email);

  if (!user) {
    res.status(401).json({ message: 'Користувача не знайдено' });
    return;
  }

  const passwordMatch = bcrypt.compareSync(password, user.passwordHash);

  if (!passwordMatch) {
    res.status(401).json({ message: 'Невірний пароль' });
    return;
  }

  const token = generateToken({
    email: user.email,
    isAdmin: user.isAdmin,
  });

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      email: user.email,
      firstName: user.firstName,
      isAdmin: user.isAdmin,
    },
  });
};

// 🔒 Приватний профіль
export const getProfile = (req: AuthenticatedRequest, res: Response) => {
  res.send({ user: req.user });
};

// 🔄 Оновлення профілю (імітація)
export const updateProfile = (req: AuthenticatedRequest, res: Response): void => {
  res.send(`Профіль користувача ${req.user.email} оновлено`);
};
