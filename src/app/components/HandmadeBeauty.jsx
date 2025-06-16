export default function HandmadeBeauty() {
  return (
    <section className="section" id="explore">
      <div className="container">
        <div className="row">
          {/* Texto à esquerda */}
          <div className="col-lg-6">
            <div className="left-content">
              <h2>A beleza do feito à mão</h2>
              <span>
                Cada peça feita à mão carrega uma história única, moldada com tempo,
                cuidado e amor. Personalizar é ir além do comum é transformar matéria
                em afeto. É arte que nasce das mãos, mas toca o coração.
              </span>
              <div className="quote">
                <i className="fa fa-quote-left"></i>
                <p>
                  Quando crio com as mãos, coloco minha alma em cada detalhe é assim
                  que transformo amor em forma.
                </p>
              </div>
              <p>
                Nesse processo, não há pressa, apenas intenção: criar algo exclusivo,
                com alma e significado.
              </p>
              <div className="main-border-button">
                <a href="/artists">Conhecer os Artistas</a>
              </div>
            </div>
          </div>

          {/* Conteúdo visual à direita */}
          <div className="col-lg-6">
            <div className="right-content">
              <div className="row">
                <div className="col-lg-6">
                  <div className="leather">
                    <h4>Criatividade</h4>
                    <span>Autenticidade e Dedicação</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="first-image">
                    <img src="/assets/images/explore-image-01.jpg" alt="Criatividade" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="second-image">
                    <img src="/assets/images/explore-image-02.jpg" alt="Inspiração" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="types">
                    <h4>Inspiração</h4>
                    <span>Cuidado e Detalhes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
