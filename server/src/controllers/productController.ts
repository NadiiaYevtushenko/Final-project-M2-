import { Request, Response } from 'express';

export const getAllProducts = (req: Request, res: Response): void => {
  res.send('Список товарів');
};

export const getProductById = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.send(`Деталі товару з ID: ${id}`);
};

export const createProduct = (req: Request, res: Response): void => {
  res.status(201).send('Товар створено');
};

export const updateProduct = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.send(`Товар з ID ${id} оновлено`);
};

export const deleteProduct = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.send(`Товар з ID ${id} видалено`);
};
