import { useEffect, useRef, useState } from "react";
import { Pagination } from "../features/product/Pagination";
import { PaginationDto, PaginationMetaDto, Product } from "../utils/interfaces";
import { ProductList } from "../features/product/ProductList";
import { ModalContainer } from "../features/product/ModalContainer";

export const ProductPage = () => {
  const [paginationData, setPaginationData] = useState<PaginationMetaDto>();
  const [products, setProducts] = useState<Product[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const productFetched = useRef(false);

  const fetchProducts = async () => {
    try {
      const url = `${import.meta.env.VITE_BASE_API_URL}/product`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const result: PaginationDto<Product> = await response.json();

      setPaginationData(result.meta);
      setPage(result.meta.page);
      setProducts(result.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProductsForPage = async (page: number) => {
    try {
      const url = `${import.meta.env.VITE_BASE_API_URL}/product?filter[page]=${page}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const result: PaginationDto<Product> = await response.json();

      setPaginationData(result.meta);
      setProducts(result.data);
      setPage(page);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const onPageChange = async (page: number) => {
    setIsLoading(true);
    await fetchProductsForPage(page)
    setIsLoading(false);
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  }

  const handleSaveProduct = async (product: Product) => {

    const createProductRequest = {
      url: 'product',
      method: 'POST'
    }

    const updateProductRequest = {
      url: `product/${product?.id}`,
      method: 'PATCH'
    }
    delete product.id; // dont need this prop into our body request.

    let request = createProductRequest;

    if (productToEdit) {
      request = updateProductRequest;
    }

    try {

      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/${request.url}`, {
        method: request.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
      });

      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  useEffect(() => {
    console.log('Re-render Products');
    fetchProducts();

  }, [productToEdit]);

  useEffect(() => {
    if (productFetched.current) {
      return;
    }
    fetchProducts();
    productFetched.current = true;
  }, []);

  return (
    <div className="min-h-screen h-fit">
      {paginationData && (
        <div className="flex flex-row-reverse">
          <Pagination
            totalPages={paginationData.pageCount}
            setPage={onPageChange}
            disable={isLoading}
            actualPage={page}
          />
        </div>
      )}

      {paginationData && (
        <div>
          <ProductList products={products} handleEditProduct={handleEditProduct} />
        </div>
      )}

      <ModalContainer
        productToUpdate={productToEdit}
        handleSaveProduct={handleSaveProduct}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
