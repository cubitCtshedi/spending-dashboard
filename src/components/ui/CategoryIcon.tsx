import {
  Car,
  Film,
  ShoppingBag,
  ShoppingCart,
  Utensils,
  Zap
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  'shopping-cart': ShoppingCart,
  film: Film,
  car: Car,
  utensils: Utensils,
  'shopping-bag': ShoppingBag,
  zap: Zap
}

interface CategoryIconProps extends LucideProps {
  iconName: string
}

export function CategoryIcon({
  iconName,
  ...props
}: CategoryIconProps) {
  const Icon = ICON_MAP[iconName] ?? ShoppingCart
  return <Icon {...props} />
}
