import Link from 'next/link';

export default function SubscribeSection() {
  return (
    <div className="subscribe">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="section-heading">
              <h2>Encantou? Cadastre-se para novidades!</h2>
              <span>Receba em primeira mão novidades de ofertas e lançamentos de produtos.</span>
            </div>
            <form id="subscribe" action="" method="get">
              <div className="row">
                <div className="col-lg-5">
                  <fieldset>
                    <input
                      name="name"
                      type="text"
                      id="name"
                      placeholder="Digite seu Nome"
                      required
                    />
                  </fieldset>
                </div>
                <div className="col-lg-5">
                  <fieldset>
                    <input
                      name="email"
                      type="email"
                      id="email"
                      pattern="[^ @]*@[^ @]*"
                      placeholder="Digite seu e-mail"
                      required
                    />
                  </fieldset>
                </div>
                <div className="col-lg-2">
                  <fieldset>
                    <button type="submit" id="form-submit" className="main-dark-button">
                      <i className="fa fa-paper-plane"></i>
                    </button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
            <div className="row">
              <div className="col-6">
                <ul>
                  <li>
                    ❤️
                    <br />
                    <span>
                      Site criado para que diversos artesãos possam expor e vender suas artes com amor e autenticidade.
                    </span>
                  </li>
                  <li>
                    ❤️
                    <br />
                    <span>
                      Um lugar onde talentos artesanais ganham espaço para brilhar e encantar.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <ul>
                  <li>
                    Vendas:
                    <br />
                    <span>Vendas de alguns produtos já prontos.</span>
                  </li>
                  <li>
                    Encomendas:
                    <br />
                    <span>Você pode solicitar orçamentos.</span>
                  </li>
                  <li>
                    Dúvidas:
                    <br />
                    <span>
                      <Link href="#">Pagamentos</Link>,{' '}
                      <Link href="#">Orçamentos</Link>,{' '}
                      <Link href="#">Devoluções</Link>
                    </span>

                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
