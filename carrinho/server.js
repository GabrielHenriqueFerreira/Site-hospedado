app.post('/calcular-frete', async (req, res) => {
    const { cepDestino, cepOrigem, peso, altura, largura, comprimento } = req.body;

    console.log('Dados recebidos:', {
        cepDestino,
        cepOrigem,
        peso,
        altura,
        largura,
        comprimento,
    });

    // Consulta a cidade do CEP de origem e destino
    const cidadeOrigem = await consultarCidadePorCEP(cepOrigem);
    const cidadeDestino = await consultarCidadePorCEP(cepDestino);

    console.log('Cidade de origem:', cidadeOrigem);
    console.log('Cidade de destino:', cidadeDestino);

    // Verifica se as cidades são iguais
    if (cidadeOrigem && cidadeDestino && cidadeOrigem === cidadeDestino) {
        console.log('CEP de destino pertence à mesma cidade do CEP de origem. Retornando frete grátis.');
        return res.json([{ price: 'R$ 0,00', delivery_time: 1, company: 'Frete Grátis' }]);
    }

    try {
        const response = await axios.post(
            'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate',
            {
                from: { postal_code: cepOrigem },
                to: { postal_code: cepDestino },
                package: {
                    weight: peso,
                    height: altura,
                    width: largura,
                    length: comprimento,
                },
                options: {
                    insurance_value: 0,
                    receipt: false,
                    own_hand: false,
                },
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'User-Agent': 'Aplicação (gabriel06henrique06@gmail.com)',
                },
            }
        );

        console.log('Resposta da API do Melhor Envio:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao calcular frete:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Erro ao calcular frete', details: error.response ? error.response.data : error.message });
    }
});