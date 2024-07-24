import React, { useEffect, useState } from 'react';

const Menu = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('Auth token');
    if (token) {
      // Décodez le token JWT pour obtenir les informations utilisateur, y compris le rôle
      fetch('http://localhost/api/test/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
        .then(response => response.json())
        .then(data => {
          // Utilisez les données ici si nécessaire
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }

    fetch('http://localhost:2000/menu')
      .then(response => response.json())
      .then(data => {
        setMenus(data);
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

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: '#f6f6f6', padding: '20px', boxSizing: 'border-box' }}>
      {menus.map((menu, index) => (
        <div key={index} style={cardStyle}>
          <div style={imageStyle}>
            <img src={menu.imageUrl} alt={menu.name} style={imgStyle} />
          </div>
          <h2 style={{ marginTop: '10px', fontSize: '20px', fontWeight: 'bold' }}>{menu.name}</h2>
          <p style={{ marginBottom: '10px', color: '#666' }}>{menu.content}</p>
          <p style={{ fontSize: '14px', color: '#999' }}>{menu.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Menu;
