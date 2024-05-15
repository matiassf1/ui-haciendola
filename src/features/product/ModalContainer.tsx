import { useEffect, useState } from 'react';
import { Product } from '../../utils/interfaces';
import { ProductModal } from './ProductModal';
import { AddButton } from './AddButton';

interface IModalContainer {
    productToUpdate: Product | null;
    handleSaveProduct(product: Product): void;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialProductState: Product = {
    title: '',
    handle: '',
    description: '',
    sku: '',
    grams: 0,
    stock: 0,
    price: 0,
    comparePrice: null,
    barcode: '',
};

export const ModalContainer = ({ productToUpdate, handleSaveProduct, isModalOpen, setIsModalOpen }: IModalContainer): JSX.Element => {
    const [selectedProduct, setSelectedProduct] = useState<Product>(productToUpdate || initialProductState);

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

