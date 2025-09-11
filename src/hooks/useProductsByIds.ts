import AIChatApi from '@/api/AIChat'
import { useMutation } from '@tanstack/react-query'

interface Product {
  id: number
  name: string
  final_price: string
  is_available: boolean
  discount_percentage: number
  rating_stars: string
}

interface ProductsResponse {
  products: Product[]
  count: number
}

const fetchProductsByIds = async (ids: number[]): Promise<ProductsResponse> => {
  const response = await AIChatApi.post('/api/products/by-ids/', { ids })
  return response.data
}

export const useProductsByIds = () => {
  return useMutation({
    mutationFn: fetchProductsByIds
  })
}