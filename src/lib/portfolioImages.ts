import barbershopImage from '@/assets/portfolio-barbershop.jpg';
import carwashImage from '@/assets/portfolio-carwash.jpg';
import dentalImage from '@/assets/portfolio-dental.jpg';
import fashionImage from '@/assets/portfolio-fashion.jpg';
import restaurantImage from '@/assets/portfolio-restaurant.jpg';

const portfolioImageByPath: Record<string, string> = {
  '/portfolio-barbershop.jpg': barbershopImage,
  '/portfolio-carwash.jpg': carwashImage,
  '/portfolio-dental.jpg': dentalImage,
  '/portfolio-fashion.jpg': fashionImage,
  '/portfolio-restaurant.jpg': restaurantImage,
};

export function resolvePortfolioImage(path: string): string {
  return portfolioImageByPath[path] ?? path;
}
