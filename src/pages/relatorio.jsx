"use client";

import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Card from './components/card.jsx';
import styles from '../styles/relatorio.module.css';

export default function Relatorio() {
    return (
        <>
            <div className={styles.body}>
                <Header />
                <h2 className={styles.h2}>Relatório</h2>
                <div className={styles.container}>
                    <Card
                        titleCollapsed="Itens expirados durante o mês"
                        count={0}
                        items={['Não há itens expirados para esse mês']}      
                    />
                    <Card
                        titleCollapsed="Itens esgotados durante o mês"
                        count={3}
                        items={[
                            '00015 - Copos descartáveis',
                            '00022 - Sabão em pó',
                            '00031 - Cabo HDMI 5m',
                        ]}
                    />
                                    <Card
                        titleCollapsed="Itens que não foram movimentados durante o mês"
                        count={2}
                        items={[
                            '00023 - Bom ar Lavanda',
                            '00027 - Refil Raid elétrico líquido',
                        ]}                
                    />
                    <Card
                        titleCollapsed="Itens mais movimentados durante o mês"
                        count={3}
                        items={[
                            '00005 - pó de café',
                            '00002 - papel ofício',
                            '00031 - Cabo HDMI 5m',
                        ]}
                    />
                    <Card
                        titleCollapsed="Itens perto do vencimento"
                        count={0}
                        items={['Não há itens perto do vencimento']}      
                    />
                    <Card
                        titleCollapsed="Itens prestes a esgotar"
                        count={5}
                        items={[
                            '00005 - pó de café - 3 unidades',
                            '00023 - fita gomada - 5 unidades',
                            '00002 - papel ofício - 2 unidades',
                            '00009 - lâmpada 15w - 1 unidade',
                            '00011 - refil para grampeador - 4 unidades',
                        ]}
                    />
                </div>
                <Footer />
            </div>
        </>
    );
}
