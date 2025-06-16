"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Highlights() {
  const [highlights, setHighlights] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/products")
      .then((response) => {
        setHighlights(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  function handleViewProduct(id) {
    router.push(`/single-product/${id}`);
  }

  return (
    <section className="section" id="women">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-heading">
              <h2>Lançamentos</h2>
              <span>Artesanatos que encantam à primeira vista.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="product-grid"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {highlights.map((item) => (
            <div
              className="item"
              key={item.id}
              style={{
                width: "200px",
                position: "relative",
              }}
            >
              <div
                className="thumb"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "200px",
                }}
              >
                <div
                  className="hover-icons"
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    display: "flex",
                    gap: "8px",
                    zIndex: 2,
                  }}
                >
                  <i
                    className="fa fa-shopping-cart"
                    onClick={() => handleViewProduct(item.id)}
                    style={{
                      backgroundColor: "rgba(0,0,0,0.6)",
                      padding: "6px",
                      borderRadius: "50%",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  ></i>
                </div>

                <img
                  src={item.imageUrl || "/assets/images/placeholder.jpg"}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    display: "block",
                  }}
                />
              </div>

              <div
                className="down-content"
                style={{ textAlign: "center", marginTop: "10px" }}
              >
                <h4>{item.name}</h4>
                <span>
                  {item.price
                    ? `R$ ${item.price.toFixed(2)}`
                    : "Preço indisponível"}
                </span>
                <p style={{ marginTop: "5px", fontSize: "14px", color: "#666" }}>
                  {item.category?.name || "Categoria não informada"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
