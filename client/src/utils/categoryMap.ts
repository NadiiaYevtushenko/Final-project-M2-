const categorySlugMap: Record<string, string> = {
  'fdm-printers': '3D Принтери FDM',
  'sla-printers': '3D Принтери SLA',
  'sls-printers': '3D Принтери SLS',
  'slm-printers': 'Металеві 3D Принтери SLM',
  'industrial-printers': 'Промислові 3D Принтери',
  '3d-scanners': '3D Сканери',
  'fdm-materials': 'Матеріали FDM',
  'sla-materials': 'Матеріали SLA',
  'cnc-machines': 'Настільні ЧПУ Фрезери',
  'food-printers': 'Харчові Принтери',
};

export const resolveCategoryFromSlug = (slug: string): string | undefined => {
  return categorySlugMap[slug];
};
