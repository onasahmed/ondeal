import React from 'react'
import useProduct from '../hooks/useProduct'
import Card from '../component/home/card'

const Home = () => {
  const [product, refetch, isLoading] = useProduct()
  console.log(product?.products)
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {product?.products?.map(item => (
        <Card key={item.id} item={item}></Card>
      ))}
    </div>
  )
}

export default Home
