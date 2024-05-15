import { Product } from "../../utils/interfaces";
import { ProductCard } from "./ProductCard";

interface IProductList {
    products: Product[];
    handleEditProduct(product: Product): void;
    handleDeleteProduct(productId: number): void;
}

export const ProductList = ({ products, handleEditProduct, handleDeleteProduct }: IProductList): JSX.Element => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    product={product}
                    onUpdate={handleEditProduct}
                    onDelete={handleDeleteProduct} />
            ))}
        </div>
    );
};
