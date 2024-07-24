import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/elements/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Restaurateur = () => {
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [loading, setLoading] = useState(false);
    const [isFirstFormSubmitted, setIsFirstFormSubmitted] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setSelectedImage(file);
    };

    const onSubmit = (data) => {
        setLoading(true);
        fetch('http://localhost:2000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                name: data.name,
                surname: data.surname,
                phone: data.phone,
                roles: ["restaurant"]
            })
        }).then((response) => {
            if (response.status === 200) {
                setLoading(false);
                setIsFirstFormSubmitted(true);
                response.json().then((data) => {
                    // Récupérer les informations du JSON
                    const userId = data.id;
                    const token = data.accessToken;
                    localStorage.setItem('Auth token', token);
                    localStorage.setItem('User Id', userId);
                });
                window.dispatchEvent(new Event("storage"));
                toast.success('Account created successfully!🎉', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                    });
            } else if (response.status === 400) {
                // L'e-mail ou le téléphone est déjà utilisé
                response.json().then((data) => {
                const errorMessage = data.message; // Récupérer le message d'erreur depuis la réponse JSON
                setLoading(false);
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });
                });
            } else {
                console.log(response.json());
            }
        }).catch((error) => {
            setLoading(false);
            console.log(error)
        })
    }

    const onSubmit2 = (data) => {
        setLoading(true);
        const userId = localStorage.getItem('User Id');
        fetch('http://localhost:2000/restaurant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idOwner : userId,
                name: data.restaurant_name,
                content: data.description,
                addressRestaurant: {
                    address: data.address,
                    city: data.city,
                    postalCode: data.postalCode,
                    country: data.country
                },
                imageURL: data.imageInput,
                openingDays: [
                {
                    day: data.day,
                    isOpen: data.isOpen,
                    openHour: data.openHour,
                    closeHour: data.closeHour,
                }
                ]
            })
        }).then((response) => {
            if (response.status === 200) {
                setLoading(false);
                
                toast.success('Restaurant created successfully!🎉', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                    });
            } else {
                console.log(response.json());
            }
        }).catch((error) => {
            setLoading(false);
            console.log(error)
        }) 
    }
    return (
        <div>
            {isFirstFormSubmitted ? (
            <div className="h-screen bg-black flex  items-center justify-center">
            <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 transition duration-300 animate-pink blur  gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
                <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
                    <h5 className="text-3xl">Register</h5>
                <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit2)}>
                    <div>
                        <label 
                        htmlFor="restaurant_name"
                        className="block text-lg font-medium text-gray-200">Nom de votre restaurant*</label>
                        <input 
                        {...register('restaurant_name')}
                        id="restaurant_name"
                        type="text"
                        className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                        required/>
                    </div> 
                    <div>
                        <label 
                        htmlFor="description"
                        className="block text-lg font-medium text-gray-200">Description</label>
                        <input 
                        {...register('description')}
                        id="description"
                        type="text"
                        className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                        />
                    </div>
                    <div>
                        <label 
                        htmlFor="address"
                        className="block text-lg font-medium text-gray-200">Adresse*</label>
                        <input 
                        {...register('address')}
                        id="address"
                        type="text"
                        className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                        required/>
                    </div>
                    <div>
                        <label 
                        htmlFor="city"
                        className="block text-lg font-medium text-gray-200">Ville*</label>
                        <input 
                        {...register('city')}
                        id="city"
                        type="text"
                        className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                        required/>
                    </div>
                    <div>
                        <label 
                        htmlFor="postalCode"
                        className="block text-lg font-medium text-gray-200">Code postal*</label>
                        <input 
                        {...register('postalCode')}
                        id="postalCode"
                        type="text"
                        className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                        required/>
                    </div>
                    <div>
                    <label htmlFor="imageInput" style={{ color: 'white' }}>Joindre une image :</label>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleImageChange}
                        //required
                    />
                    {selectedImage && (
                        <div>
                        <p style={{ color: 'white' }}>Nom de l'image : {selectedImage.name}</p>
                        </div>
                    )}
                    </div>
                    <Button size="large">{loading ? "loading" : 'Soumettre'}</Button>
                </form>
                <ToastContainer />
                </div>
            </div>
        </div>
        
        ) : (
            <div className="h-screen bg-black flex  items-center justify-center">
                <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
                    <div className="absolute inset-0 transition duration-300 animate-pink blur  gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
                    <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
                        <h5 className="text-3xl text-gray-200">Nouveau restaurateur</h5>
                    <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit) } >
                        <div>
                            <label 
                            htmlFor="name"
                            className="block text-lg font-medium text-gray-200">Prénom*</label>
                            <input 
                            {...register('name')}
                            id="name"
                            type="text"
                            className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                            required
                            />
                        </div>
                        <div>
                            <label 
                            htmlFor="surname"
                            className="block text-lg font-medium text-gray-200">Nom*</label>
                            <input 
                            {...register('surname')}
                            id="surname"
                            type="text"
                            className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                            required
                            />
                        </div>
                        <div>
                            <label 
                            htmlFor="email"
                            className="block text-lg font-medium text-gray-200">Email*</label>
                            <input 
                            {...register('email', {
                                required: "Email requis",
                                pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email invalide"
                                }
                            })}
                            id="email"
                            type="email"
                            className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                            required
                            />
                            {errors.email && (
                                <p className="text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <label 
                            htmlFor="phone"
                            className="block text-lg font-medium text-gray-200">Téléphone*</label>
                            <input 
                            {...register('phone', {
                                required: "Téléphone requis",
                                pattern: {
                                value: /^[0-9]{10}$/i,
                                message: "Numéro invalide"
                                }
                            })}
                            id="phone"
                            type="text"
                            className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                            required
                            />
                            {errors.phone && (
                                <p className="text-red-500">{errors.phone.message}</p>
                            )}
                        </div>
                        <div>
                            <label 
                            htmlFor="password"
                            className="block text-lg font-medium text-gray-200">Mot de Passe*</label>
                            <input 
                            {...register('password', {
                                required: "Le mot de passe est requis",
                                minLength: {
                                value: 8,
                                message: "Le mot de passe doit comporter au moins 8 caractères"
                                },
                                pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial"
                                }
                            })}
                            id="password"
                            type="password"
                            className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
                            required
                            />
                            {errors.password && (
                                <p className="text-red-500">{errors.password.message}</p>
                            )}
                        </div>
                        <Button size="large">{loading ? "loading" : 'Register'}</Button>
                    </form>
                    <ToastContainer />
                    </div>
                </div>
            </div>

            
        )}
        </div>
    );
}

export default Restaurateur;