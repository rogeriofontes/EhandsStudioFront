export default function MainBanner() {
  return (
    <div className="main-banner" id="top">
      <div className="container-fluid">
        <div className="row">
          {/* Lado Esquerdo */}
          <div className="col-lg-6">
            <div className="left-content">
              <div className="thumb">
                <div className="inner-content">
                  <h4>Mãos Encantadas</h4>
                  <span>Onde a arte ganha vida, com as mãos que encantam.</span>
                  <div className="main-border-button">
                    <a href="artists">Nossos Artistas!</a>
                  </div>
                </div>
                <img src="/assets/images/left-banner-image.jpg" alt="Banner Esquerdo" />
              </div>
            </div>
          </div>

          {/* Lado Direito */}
          <div className="col-lg-6">
            <div className="right-content">
              <div className="row">
                {[
                  {
                    title: "Lembrançinhas",
                    subtitle: "Recém-nascidos",
                    hoverTitle: "Lembrancinhas",
                    hoverText: "Eternize um momento especial.",
                    button: "Ver com carinho",
                    image: "baner-right-image-01.jpg",
                  },
                  {
                    title: "Personalizados",
                    subtitle: "Personalize com sua foto.",
                    hoverTitle: "Personalizados",
                    hoverText: "Personalize com sua foto.",
                    button: "Ver com amor",
                    image: "baner-right-image-02.jpg",
                  },
                  {
                    title: "Porta-Retratos",
                    subtitle: "Personalize com sua foto",
                    hoverTitle: "Porta-Retrato",
                    hoverText: "Personalize com sua foto.",
                    button: "Ver de pertinho",
                    image: "baner-right-image-03.jpg",
                  },
                  {
                    title: "Vaso de Cerâmica",
                    subtitle: "Ideal para ambientes internos",
                    hoverTitle: "Vaso de Cerâmica",
                    hoverText: "Ideal para ambientes internos.",
                    button: "Conhecer essa arte",
                    image: "baner-right-image-04.jpg",
                  },
                ].map((item, index) => (
                  <div className="col-lg-6" key={index}>
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>{item.title}</h4>
                          <span>{item.subtitle}</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>{item.hoverTitle}</h4>
                            <p>{item.hoverText}</p>
                            <div className="main-border-button">
                              <a href="#">{item.button}</a>
                            </div>
                          </div>
                        </div>
                        <img src={`/assets/images/${item.image}`} alt={item.title} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
