import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Popup from '../../components/updateRestaurantPopup';

const Restaurants = () => {
    const [loading, setLoading] = useState(false);
    const [restaurant, setRestaurant] = useState([]);
    const [userRole, setUserRole] = useState();
    const [isPopupVisible, setPopupVisible] = useState(false);

    
    useEffect(() => {
        const token = localStorage.getItem('Auth token');
        const userId = localStorage.getItem('User Id');
        if(token) {
            // Décodez le token JWT pour obtenir les informations utilisateur, y compris le rôle
            fetch('http://localhost:2000/api/test/restaurant', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            }).then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    setUserRole('restaurant');
                    fetch(`http://localhost:2000/restaurant/owner/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => response.json())
                        .then(data => {
                            setRestaurant(data);
                        })
                        .catch(error => {
                            console.error('There was an error!', error);
                    });
                }else {
                    console.log(response.json());
                }
            }
            );
        }
        else{
            setLoading(false);
            fetch(`http://localhost:2000/restaurant`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    setRestaurant(data);
                })
                .catch(error => {
                    console.error('There was an error!', error);
            });
        }
    }, []);

    const onSave = updatedRestaurant => {
        setLoading(true);
        fetch(`http://localhost:2000/restaurant/${updatedRestaurant.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedRestaurant)
        }).then((response) => {
            if (response.status === 200) {
                setLoading(false);
                toast.success('Restaurant modified successfully!🎉', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                    });
                setPopupVisible(false)
            } else {
                console.log(response.json());
            }
        }).catch((error) => {
            setLoading(false);
            console.log(error)
        }) 
    };

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

    return (
        <div>
        { userRole === 'restaurant' ? (
        <div>
            <h1>Votre Restaurant</h1>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: '#f6f6f6', padding: '20px', boxSizing: 'border-box'}}>
                {restaurant.map((item, index) => (
                    <div key={index} style={cardStyle}>
                        <div style={imageStyle}>
                            <img src={item.imageURL} alt={item.name} style={imgStyle} />
                        </div>
                        <h2 style={{marginTop: '10px', fontSize: '20px', fontWeight: 'bold'}}>{item.name}</h2>
                        <p style={{marginBottom: '10px', color: '#666'}}>{item.content}</p>
                        <p style={{fontSize: '14px', color: '#999'}}>{item.addressRestaurant.address}, {item.addressRestaurant.city}, {item.addressRestaurant.postalCode}, {item.addressRestaurant.country}</p>
                        <button onClick={() => setPopupVisible(true)}>Modifier</button>
                        {isPopupVisible && (
                            <Popup 
                                restaurantData={item}
                                onSave={onSave}
                                onClose={() => setPopupVisible(false)}
                            />
                        )}
                        <ToastContainer />
                    </div>
                    
                ))}
                
            </div>
        </div>
        ) : (
            <div>
                <h1>Les Restaurants</h1>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: '#f6f6f6', padding: '20px', boxSizing: 'border-box'}}>
                    {restaurant.map((restaurant, index) => (
                        <div key={index} style={cardStyle}>
                            <div style={imageStyle}>
                                <img src={restaurant.imageURL} alt={restaurant.name} style={imgStyle} />
                            </div>
                            <h2 style={{marginTop: '10px', fontSize: '20px', fontWeight: 'bold'}}>{restaurant.name}</h2>
                            <p style={{marginBottom: '10px', color: '#666'}}>{restaurant.content}</p>
                            <p style={{fontSize: '14px', color: '#999'}}>{restaurant.addressRestaurant.address}, {restaurant.addressRestaurant.city}, {restaurant.addressRestaurant.postalCode}, {restaurant.addressRestaurant.country}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}
        </div>
    );
}

export default Restaurants;
