import fdm from '../../../assets/fdm.jpg';
import sla from '../../../assets/sla.jpg';
import sls from '../../../assets/sls.jpg';
import slm from '../../../assets/slm.jpg';
import industrial from '../../../assets/industrial.jpg';
import scanner from '../../../assets/scanner.jpg';
import fdmMat from '../../../assets/fdmMat.jpg';
import slaMat from '../../../assets/slaMat.jpg';
import cnc from '../../../assets/cnc.jpg';
import food from '../../../assets/food.jpg';

const categoryMap: Record<string, { slug: string; img: string }> = {
  '3D Принтери FDM': { slug: 'fdm-printers', img: fdm },
  '3D Принтери SLA': { slug: 'sla-printers', img: sla },
  '3D Принтери SLS': { slug: 'sls-printers', img: sls },
  'Металеві 3D Принтери SLM': { slug: 'slm-printers', img: slm },
  'Промислові 3D Принтери': { slug: 'industrial-printers', img: industrial },
  '3D Сканери': { slug: '3d-scanners', img: scanner },
  'Матеріали FDM': { slug: 'fdm-materials', img: fdmMat },
  'Матеріали SLA': { slug: 'sla-materials', img: slaMat },
  'Настільні ЧПУ Фрезери': { slug: 'cnc-machines', img: cnc },
  'Харчові Принтери': { slug: 'food-printers', img: food },
};

export const resolveCategoryInfo = (categoryName: string) => {
  return {
    title: categoryName,
    slug: categoryMap[categoryName]?.slug || categoryName.toLowerCase().replace(/\s+/g, '-'),
    img: categoryMap[categoryName]?.img || '/assets/placeholder.jpg',
  };
};
