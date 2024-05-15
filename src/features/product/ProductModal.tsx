import { useEffect, useState } from 'react';
import { Product } from '../../utils/interfaces';

interface IProductModal {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Product) => void;
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


export const ProductModal = ({ product, isOpen, onClose, onSave }: IProductModal): JSX.Element => {
    const [formData, setFormData] = useState<Product>(product ? { ...product } : initialProductState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (formData) {
            onSave(formData);
            onClose();
            setFormData(initialProductState)
        }
    };

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData(initialProductState);
        }
    }, [product])


    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
                    <div className="bg-zinc-800 p-8 rounded-lg w-96">
                        <h2 className="text-2xl font-bold mb-4 text-white">{formData.title ? 'Update Product' : 'Create Product'}</h2>
                        <input
                            type="text"
                            name="handle"
                            value={formData?.handle || ''}
                            onChange={handleChange}
                            placeholder="Handle"
                            className="border border-zinc-500 bg-zinc-500 p-2 mb-4 w-full rounded placeholder-slate-300"
                        />
                        <input
                            type="text"
                            name="title"
                            value={formData?.title || ''}
                            onChange={handleChange}
                            placeholder="Title"
                            className="border border-zinc-500 bg-zinc-500 p-2 mb-4 w-full rounded placeholder-slate-300"
                        />
                        <textarea
                            name="description"
                            value={formData?.description || ''}
                            onChange={handleChange}
                            placeholder="Description"
                            className="border border-zinc-500 bg-zinc-500 p-2 mb-4 w-full rounded placeholder-slate-300"
                        />
                        <input
                            type="text"
                            name="sku"
                            value={formData?.sku || ''}
                            onChange={handleChange}
                            placeholder="SKU"
                            className="border border-zinc-500 bg-zinc-500 p-2 mb-4 w-full rounded placeholder-slate-300"
                        />
                        <input
                            type="number"
                            name="price"
                            value={formData?.price || ''}
                            onChange={handleChange}
                            placeholder="Price"
                            className="border border-zinc-500 bg-zinc-500 p-2 mb-4 w-full rounded placeholder-slate-300"
                        />
                        <input
                            type="number"
                            name="grams"
                            value={formData?.grams || ''}
                            onChange={handleChange}
                            placeholder="Grams"
                            className="border border-zinc-500 bg-zinc-500 p-2 mb-4 w-full rounded placeholder-slate-300"
                        />
                        <input
                            type="number"
                            name="barcode"
                            value={formData?.barcode || ''}
                            onChange={handleChange}
                            placeholder="Barcode"
                            className="border border-zinc-500 bg-zinc-500 p-2 mb-4 w-full rounded placeholder-slate-300"
                        />
                        <div className="flex justify-end">
                            <button onClick={onClose} className="bg-gray-400 hover:bg-gray-500 text-white font-bold px-4 py-2 rounded mr-2">Cancel</button>
                            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
