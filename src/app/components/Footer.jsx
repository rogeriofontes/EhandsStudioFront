import Link from 'next/link'; 

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="first-item">
              <h4>Bem Vindos</h4>
              <ul>
                <li><a href="mailto:maosencantadas@ehands.com">Bem vindo ao nosso site, dúvidas e sugestões envie um email.</a></li>
                <li><a href="#">maosencantadas@ehands.com</a></li>
                
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <h4>Categorias</h4>
            <ul>
              <li><a href="#">Lembrançinhas</a></li>
              <li><a href="#">Personalizados</a></li>
              <li><a href="#">Porta-retratos</a></li>
            </ul>
          </div>
          <div className="col-lg-3">
            <h4>Dúvidas</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Sobre nós</a></li>
              <li><a href="#">Política de Compra</a></li>
              <li><a href="#">Política de Devolução</a></li>
            </ul>
          </div>
          <div className="col-lg-3">
            <h4>Informações</h4>
            <ul>
              <li><a href="#">Quero comprar</a></li>
              <li><a href="#">Quero Vender</a></li>
              <li><a href="#">Como pagar</a></li>
              <li><a href="#">Como é enviado</a></li>
            </ul>
          </div>
          <div className="col-lg-12">
            <div className="under-footer">
              <p>
                Copyright © 2025 MãosEncantadas.com. Todos os direitos reservados.
                <br /><br />
              </p>
              <ul>
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
