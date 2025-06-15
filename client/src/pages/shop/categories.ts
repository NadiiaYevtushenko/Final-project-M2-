import fdm from '../../assets/fdm.jpg';
import sla from '../../assets/sla.jpg';
import sls from '../../assets/sls.jpg';
import slm from '../../assets/slm.jpg';
import industrial from '../../assets/industrial.jpg';
import scanner from '../../assets/scanner.jpg';
import fdmMat from '../../assets/fdmMat.jpg';
import slaMat from '../../assets/slaMat.jpg';
import cnc from '../../assets/cnc.jpg';
import food from '../../assets/food.jpg';

const categories = [
  { title: '3D Принтери FDM', img: fdm, slug: 'fdm-printers' },
  { title: '3D Принтери SLA', img: sla, slug: 'sla-printers' },
  { title: '3D Принтери SLS', img: sls, slug: 'sls-printers' },
  { title: 'Металеві 3D Принтери SLM', img: slm, slug: 'slm-printers' },
  { title: 'Промислові 3D Принтери', img: industrial, slug: 'industrial-printers' },
  { title: '3D Сканери', img: scanner, slug: '3d-scanners' },
  { title: 'Матеріали FDM', img: fdmMat, slug: 'fdm-materials' },
  { title: 'Матеріали SLA', img: slaMat, slug: 'sla-materials' },
  { title: 'Настільні ЧПУ Фрезери', img: cnc, slug: 'cnc-machines' },
  { title: 'Харчові Принтери', img: food, slug: 'food-printers' },
];

export default categories;