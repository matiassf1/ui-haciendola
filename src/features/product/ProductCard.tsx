import { Product } from "../../utils/interfaces";

interface IProductCard {
    product: Product;
    onUpdate(product: Product): void;
    onDelete: (productId: number) => void;
}

export const ProductCard = ({ product, onUpdate, onDelete }: IProductCard): JSX.Element => {
    return (
        <div className="relative max-w-sm rounded overflow-hidden h-[520px] shadow-lg bg-zinc-900 text-white mb-10">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.title}</div>
                <p className="text-gray-400 text-base mb-2">SKU: <strong className="font-semibold">{product.sku}</strong></p>
                <p className="text-gray-400 text-base mb-2">Price: <strong className="font-semibold">${product.price}</strong></p>
                <p className="text-gray-400 text-base mb-2">Stock: <strong className="font-semibold">{product.stock}</strong></p>
                <p className="text-gray-400 text-base mb-2">Weight: <strong className="font-semibold">{product.grams}grs.</strong></p>
                <p className="text-gray-400 text-base mb-2">Compare Price: <strong className="font-semibold">{product.compareprice}</strong></p>
                <p className="text-gray-400 text-base mb-2">Bar Code: <strong className="font-semibold">{product.barcode}</strong></p>
                <div className="overflow-y-auto max-h-36" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-75 bg-zinc-950 p-4 flex justify-between">
                <button onClick={() => onUpdate(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Update</button>
                <button onClick={() => onDelete(product?.id || 0)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
            </div>
        </div>
    );
};
