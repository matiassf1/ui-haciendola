import { useEffect, useState } from 'react';
import { Product, ProductRequest } from '../../utils/interfaces';
import { ProductModal } from './ProductModal';
import { AddButton } from './AddButton';

interface IModalContainer {
    productToUpdate: Product | null;
    handleSaveProduct(product: ProductRequest): void;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialProductState: ProductRequest = {
    title: '',
    handle: '',
    description: '',
    sku: '',
    grams: 0,
    stock: 0,
    price: 0,
    compareprice: 0,
    barcode: '',
};

export const ModalContainer = ({ productToUpdate, handleSaveProduct, isModalOpen, setIsModalOpen }: IModalContainer): JSX.Element => {
    const [selectedProduct, setSelectedProduct] = useState<ProductRequest>(productToUpdate || initialProductState);

    const handleAddButtonClick = () => {
        setSelectedProduct(initialProductState);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(initialProductState);
    };

    useEffect(() => {
      if(productToUpdate){
        setSelectedProduct(productToUpdate);
      }
    }, [productToUpdate])
    

    return (
        <div>
            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveProduct}
            />

            <AddButton onClick={handleAddButtonClick} />
        </div>
    );
};

