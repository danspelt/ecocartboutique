// Assuming you're using functional components and hooks
import productsService from '@/lib/services/productService';
import ProductList from '@/components/ProductList ';


const HomePage = async () => {
  const products = await productsService.getAllProducts();
  console.log(products);
  return (
    <div>
      <h1>Welcome to Our E-Shop</h1>
        {products && <ProductList products={products} /> }
    </div>  
  );
};

export default HomePage;