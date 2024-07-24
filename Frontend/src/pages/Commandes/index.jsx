import React, { useState, useEffect } from 'react';
import Button from "../../components/elements/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';

const Commandes = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [orders, setOrder] = useState([]);
    const {handleSubmit} = useForm();
    const userId = localStorage.getItem('User Id');
    useEffect(() => {
        setLoading(true);
        
        const token = localStorage.getItem('Auth token');
        if(token) {
            // Décodez le token JWT pour obtenir les informations utilisateur, y compris le rôle
            fetch('http://localhost:2000/api/test/delivery', {
                method: 'GET',
                headers: {
                    'x-access-token': token
                }
            }).then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    const role = 'delivery';
                    setUserRole(role);
                }
            }
            );
        }
        fetch('http://localhost:2000/order')
            .then(response => response.json()) 
            .then(data => {
                setOrder(data);
                setLoading(false);
              })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const cardStyle = {
        width: '100%',
        maxWidth: '300px',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
    };

    const imageStyle = {
        width: '100%',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '10px',
    };

    const imgStyle = {
        minHeight: '100%',
        maxWidth: '100%',
    };

    // Mettre l'Id du livreur dans la commande
    const onSubmit = (order) => {
        setLoading(true);
        const oui = JSON.stringify(order);
        const banana = oui.slice(1,-1);
        console.log(typeof banana)

    //console.log( a);

        fetch(`http://localhost:2000/order/${order}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idDeliver : userId,
                status: "Order picked up by a delivery man"
            })
        }).then((response) => {
            if (response.status === 201) {
                setLoading(false);
                toast.success('Delivery accepted!🎉', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                    });
                    setTimeout(() => {
                        navigate('/delivery');
                    }, 2000);
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
    return (
        
        <div className='text-center'> Commande en attente d'un livreur
            {userRole === 'delivery' ? (
                <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: '#f6f6f6', padding: '20px', boxSizing: 'border-box'}}>
                    {orders.map((order, index) => (
                        <div key={index} style={cardStyle}>
                            <h2 style={{marginTop: '10px', fontSize: '20px', fontWeight: 'bold'}}>Date de la commande : {order.dateOrder}</h2>
                            <ul>{order.articles.map((article, articleIndex) => (
                                    <li key={articleIndex}>{article.name} x{article.amount} </li>
                                ))}
                                </ul>
                            <p style={{ color: '#666'}}>{order.totalPrice}€</p>
                            <p style={{fontSize: '14px', color: '#999'}}>{order.shippingAddress.address} {order.shippingAddress.city} {order.shippingAddress.postalCode},{order.shippingAddress.country}</p>
                            <Button  onClick={() => onSubmit(order._id.toString())} size="large">{'Sélectionner'}</Button>
                        </div>
                        
                    ))}

                </form>
                
            ) : (
                <p>Accès interdit. Vous devez être un livreur pour accéder à la page.</p>
            )}
            
        </div>
        
    );
}

export default Commandes;
