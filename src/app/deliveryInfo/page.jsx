'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";


export default function DeliveryInfo() {
    return (
        <>
            <Header />
                  <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                    <img 
                      src="/assets/images/DeliveryInfo.jpg" 
                      alt="Informações sobre Envio" 
                      style={{ width: '100%', height: 'auto', marginBottom: '1.5rem', borderRadius: '8px' }}
                    />
                    <h1>Informações sobre Envio</h1><br></br>
                    <p className="mb-4">
                        O processo de envio dos produtos é uma responsabilidade exclusiva entre o artista e o cliente. Todas as questões relacionadas a prazos de entrega, valores de frete e possíveis taxas adicionais devem ser discutidas e acordadas diretamente entre as partes envolvidas.
                    </p>
                    <p className="mb-4">
                        Nosso site atua apenas como uma plataforma de divulgação e conexão entre artistas e clientes, não interferindo, gerenciando ou se responsabilizando por qualquer aspecto logístico, financeiro ou contratual relacionado ao envio dos produtos.
                    </p>
                    <p className="mb-4">
                        Reforçamos que é fundamental que o cliente esclareça com o artista todos os detalhes antes de concluir a negociação, garantindo total transparência quanto aos custos e prazos.
                    </p>
                    <p>
                        Em caso de dúvidas ou negociações específicas, entre em contato diretamente com o artista responsável pelo produto.
                    </p>
                  </main>
                  <Footer />
        </>
    );
}



                