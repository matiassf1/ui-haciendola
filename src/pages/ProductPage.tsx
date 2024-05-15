import { useEffect, useRef, useState } from "react";
import { Pagination } from "../features/product/Pagination";
import { PaginationDto, PaginationMetaDto, Product } from "../utils/interfaces";
import { ProductList } from "../features/product/ProductList";
import { ModalContainer } from "../features/product/ModalContainer";
import { Notyf } from "notyf";
import { useNavigate } from "react-router-dom";

export const ProductPage = () => {
  const [paginationData, setPaginationData] = useState<PaginationMetaDto>();
  const [products, setProducts] = useState<Product[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const productFetched = useRef(false);
  const navigate = useNavigate();
  const notyf = new Notyf();

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

  const handleDeleteProduct = async (productId: number) => {
    try {
      const url = `${import.meta.env.VITE_BASE_API_URL}/product/${productId}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        notyf.error('Failed to delete product');
      }

      notyf.success(`The product with ID ${productId} has been deleted.`);
      fetchProducts();

    } catch (error) {
      console.error('Error deleting product:', error);
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
      method: 'POST',
      successMessage: 'Product created successfully!'
    }

    const updateProductRequest = {
      url: `product/${product?.id}`,
      method: 'PATCH',
      successMessage: 'Product updated successfully!'
    }

    let request = createProductRequest;

    if (productToEdit) {
      request = updateProductRequest;
    }

    try {
      delete product.id;
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/${request.url}`, {
        method: request.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        return notyf.error('BaD');
      }

      fetchProducts();
      notyf.success(request.successMessage);
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  useEffect(() => {

  }, [productToEdit]);

  useEffect(() => {
    if (productFetched.current) {
      return;
    }
    fetchProducts();
    productFetched.current = true;
  }, []);

  return (
    <div className="min-h-screen h-fit p-20">
      {paginationData && (
        <div className="flex flex-row-reverse justify-between p-14 pt-0">
          <button onClick={() => {
            localStorage.removeItem('token_access');
            navigate('/')
          }}>
            Log out
          </button>
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
          <ProductList
            products={products}
            handleEditProduct={handleEditProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
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
