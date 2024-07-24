import { useDispatch } from "react-redux";
import { incrementProductAmount, decrementProductAmount } from "../stores/cart/cartSlice";

export const ProductsSummaryCard = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex p-1 sm:p-2 border-b border-b-gray-200">
            <div className="product-image mr-2 border border-grey-200 rounded-lg w-full sm:w-1/3">
                <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded" />
            </div>
            <div className="product-info flex-grow pl-3">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 line-clamp-3">{product.content}</p>
            </div>
            <div className="product-price-qt flex flex-col items-center justify-center">
                <div className="price text-lg font-bold">{`${product.price.toFixed(2)}$`}</div>
                <div className="quantity flex">
                    <button className="p-1 border rounded-l hover:bg-gray-200" disabled={product.amount <= 0} onClick={() => dispatch(decrementProductAmount(product))}>-</button>
                    <span className="p-1 border-t border-b">{product.amount}</span>
                    <button className="p-1 border rounded-r hover:bg-gray-200" onClick={() => dispatch(incrementProductAmount(product))}>+</button>
                </div>
            </div>
        </div>
    )
}
