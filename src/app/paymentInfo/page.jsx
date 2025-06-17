
import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer';

const PaymentInfo = () => {
return (
    <>
      <Header />
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <img 
          src="/assets/images/PaymentInfo.jpg" 
          alt="Informações sobre pagamento" 
          style={{ width: '100%', height: 'auto', marginBottom: '1.5rem', borderRadius: '8px' }}
        />
        <h1>Informações sobre Pagamento</h1><br></br>
        <p>
          O valor final dos produtos e serviços deve ser sempre acordado diretamente entre o artista e o cliente.
          Nosso site atua apenas como uma plataforma de conexão e não se responsabiliza ou interfere nos valores
          negociados entre as partes.
        </p>
        <p>
          A forma de pagamento aceita é via PIX, garantindo praticidade e segurança para ambos. Após o acordo fechado,
          o artista fornecerá os dados para o pagamento.
        </p>
        <p>
          Em caso de dúvidas, entre em contato diretamente com o artista responsável pelo produto ou serviço desejado.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default PaymentInfo;
