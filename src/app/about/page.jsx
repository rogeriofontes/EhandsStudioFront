'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";

export default function About() {
    return (
        <>
            <Header />
            <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <img 
                    src="/assets/images/about.jpg" 
                    alt="Sobre o Mãos Encantadas" 
                    style={{ width: '100%', height: 'auto', marginBottom: '1.5rem', borderRadius: '8px' }}
                />
                <h1>Sobre o Mãos Encantadas</h1><br />

                <p className="mb-4">
                    O <strong>Mãos Encantadas</strong> nasceu com um propósito especial: valorizar a arte feita à mão e aproximar artistas de pessoas que buscam peças únicas e cheias de significado.
                </p>

                <p className="mb-4">
                    Aqui, cada produto conta uma história. São criações feitas com carinho, talento e dedicação por artistas que colocam sua alma em cada detalhe. Nosso site funciona como uma vitrine virtual, conectando esses talentos a clientes que valorizam o feito à mão.
                </p>

                <p className="mb-4">
                    Acreditamos na importância de incentivar o trabalho manual e apoiar pequenos empreendedores criativos. Em nossa plataforma, você encontrará desde acessórios e roupas até objetos de decoração, todos feitos com muito amor.
                </p>

                <p className="mb-4">
                    Vale lembrar que todas as negociações de preço, prazos e envio são feitas diretamente entre o artista e o cliente. Nosso papel é apenas aproximar você de quem faz arte com as próprias mãos.
                </p>

                <p className="text-lg font-semibold">
                    ✨ Aproveite para prestigiar um artista e levar para sua casa uma peça única, cheia de personalidade e encanto!
                </p>
            </main>
            <Footer />
        </>
    );
}
