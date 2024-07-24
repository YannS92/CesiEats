import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AddProduct } from "../../components/AddProduct";

const SearchResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTag = searchParams.get("tag");
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/article")
      .then((response) => response.json())
      .then((data) => {
        const filteredArticles = data.filter((article) =>
          article.tags.some((tag) => tag.toLowerCase().includes(searchTag))
        );
        setFilteredArticles(filteredArticles);
      })
      .catch((error) => console.log(error));
  }, [searchTag]);

  const cardStyle = {
    width: "100%",
    maxWidth: "300px",
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "10px",
  };

  const imgStyle = {
    minHeight: "100%",
    maxWidth: "100%",
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#FAF0E6", padding: "20px", boxSizing: "border-box" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Search Results</h2>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
        {filteredArticles.map((article, index) => (
          <div key={index} style={{ ...cardStyle, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={imageStyle}>
              <img src={article.imageUrl} alt={article.name} style={imgStyle} />
            </div>
            <h2 style={{ marginTop: "10px", fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>{article.name}</h2>
            <p style={{ marginBottom: "auto", color: "#666" }}>{article.content}</p>
            <p style={{ marginTop: "auto", fontWeight: "bold" }}>${article.price}</p>
            <div style={{ marginTop: "auto", alignSelf:"flex-end" }}>
              <AddProduct />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
      };

export default SearchResult;
