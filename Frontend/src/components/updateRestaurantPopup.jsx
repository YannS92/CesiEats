import React, { useState } from 'react';

const Popup = ({ restaurantData, onSave, onClose }) => {
    const [id, setId] = useState(restaurantData?._id || '');
    const [name, setName] = useState(restaurantData?.name || '');
    const [content, setContent] = useState(restaurantData?.content || '');
    const [address, setAddress] = useState(restaurantData?.addressRestaurant.address || '');
    const [city, setCity] = useState(restaurantData?.addressRestaurant.city || '');
    const [postalCode, setPostalCode] = useState(restaurantData?.addressRestaurant.postalCode || '');
    const [country, setCountry] = useState(restaurantData?.addressRestaurant.country || '');
    const [imageURL, setImageURL] = useState(restaurantData?.imageURL || '');
    const [openingDays, setOpeningDays] = useState(restaurantData?.openingDays || '');

    const handleSave = () => {
        const updatedRestaurant = {
          id,
          name,
          content,
          addressRestaurant: {
            address,
            city,
            postalCode,
            country
          },
          imageURL,
          openingDays
        };
      
        onSave(updatedRestaurant);
      };

    return (
        <div className="popup-container">
        <div className="popup-content">
            <h2>Modifier les champs</h2>
            <br></br>
            <label>
            Nom :
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <br></br>
            <label>
            Description :
            <input type="text" value={content} onChange={e => setContent(e.target.value)} />
            </label>
            <br></br>
            <label>
            Adresse :
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
            </label>
            <br></br>
            <label>
            Ville :
            <input type="text" value={city} onChange={e => setCity(e.target.value)} />
            </label>
            <br></br>
            <label>
            Code postal :
            <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
            </label>
            <br></br>
            <label>
            Pays :
            <input type="text" value={country} onChange={e => setCountry(e.target.value)} />
            </label>
            <br></br>
            <label>
            URL de l'image :
            <input type="text" value={imageURL} onChange={e => setImageURL(e.target.value)} />
            </label>

            {/* Ajoutez ici les champs pour les jours d'ouverture */}

            <button onClick={handleSave}>Enregistrer</button>
            <button onClick={onClose}>Annuler</button>
        </div>
        </div>
    );
};

export default Popup;