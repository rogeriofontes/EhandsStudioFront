import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="/" className="logo">
                <img src="/assets/images/logo.png" alt="Logo" />
              </a>
              <ul className="nav">
                <li className="scroll-to-section">
                  <a href="/" className="active">Home</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#men">Artistas</a>
                </li>
                <li className="scroll-to-section">
                  <a href="#women">Lançamentos</a>
                </li>
                <li className="submenu">
                  <Link href="#">Páginas</Link>
                  <ul>
                    <li><Link href="/artists">Artistas</Link></li>
                    <li><Link href="/products">Produtos</Link></li>
                    <li><Link href="/categories">Categorias</Link></li>
                    <li><Link href="/about">Sobre nós</Link></li>
                  </ul>
                </li>
                <li className="submenu">
                  <Link href="#">Dúvidas</Link>
                  <ul>
                    <li><Link href="/paymentInfo">Sobre pagamento</Link></li>
                    <li><Link href="/deliveryInfo">Sobre envio</Link></li>
                    <li><Link href="/devolucionInfo">Sobre devolução</Link></li>
                    
                  </ul>
                </li>
                <li className="scroll-to-section">
                  <a href="/login">Login</a>
                </li>
              </ul>
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
