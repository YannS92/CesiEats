import { Tabs } from "../../components/Tabs";
import Button from "../../components/elements/Button";
import { useSelector } from "react-redux";
import { cartProducts } from "../../stores/cart/cartSlice";
import useTabSwitch from "../../hooks/useTabSwitch";
import { ReactComponent as ArrowRightSvg } from "../../assets/icons/arrow-right-long-svgrepo-com.svg";
import { AddressForm } from "../../components/AddressForm";
import { ProductsSummary } from "../../components/ProductsSummary";
import { StripeWrapper } from "../../components/PaymentForm";
import React from 'react';

const Cart = () => {
    const cart = useSelector(cartProducts);
    const tabs = ['Summary', 'Delivery', 'Payment'];
    const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Summary');

    const calculateTotal = React.useCallback(() => {
        const total = cart.reduce((sum, product) => {
            const productTotal = parseFloat(product.price) * product.amount;
            return sum + productTotal;
        }, 0);
        return total.toFixed(2);
    }, [cart]);

    React.useEffect(() => {
        calculateTotal();
    }, [cart, calculateTotal]);

    if (!cart || cart.length === 0) {
        return (
            <div className="bg-white h-full flex justify-center p-4">
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginTop: "50px", marginBottom: "20px" }}>Your cart is empty</h2>
            </div>
        );
    }

    return (
        <div className="bg-white flex-grow text-black mx-auto mt-2 border border-gray-200 p-4 md:w-2/3 rounded-lg shadow-md sm:p-6 lg:p-8 flex flex-col justify-between">
            <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
            <div className={`tabs ${currentTab !== 'Summary' ? 'hidden' : ''}`}>
                <ProductsSummary />
                <div className="flex justify-between items-center p-2">
                    <div className="font-bold text-lg">Total: {calculateTotal()}$</div>
                    <Button variant="dark" className="flex items-center" onClick={() => handleTabSwitch('Delivery')}>
                        <span className="mr-1">Next</span>
                        <ArrowRightSvg />
                    </Button>
                </div>
            </div>
            <div className={`tabs ${currentTab !== 'Delivery' ? 'hidden' : ''}`}>
                <AddressForm onTabSwitch={handleTabSwitch} />
            </div>
            <div className={`tabs ${currentTab !== 'Payment' ? 'hidden' : ''}`}>
                <StripeWrapper />
            </div>
        </div>
    );
};

export default Cart;
