export const AddProduct = ({ onAddProduct }) => {
    return (
        <div className="flex justify-end">
            <button onClick={onAddProduct} className="bg-yellow-400 hover:bg-yellow-600 rounded-full hover:scale-110 w-6 h-6 flex items-center justify-center text-lg"><span>+</span></button>
        </div>
    )
}
//Bouton jaune "+" pour ajouter au panier 