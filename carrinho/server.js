const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3220;

// Substitua pela sua chave API do Melhor Envio
const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTMwMDM5NzVlZTk3Y2Y0YmYwMjRiNzVkMGMxN2Q1NjdkOGU5NzBjZjFkZjMzNDA2MTA2MTAzNDNiYjk5OWE0MGExNTljOWJiNTJlZjE5NTQiLCJpYXQiOjE3NDEyNjUyMjkuMDY1NDA4LCJuYmYiOjE3NDEyNjUyMjkuMDY1NDEsImV4cCI6MTc3MjgwMTIyOS4wMjQxNDQsInN1YiI6IjllNTNmZTlmLWMxM2QtNDNkYy1hYjc0LWRiNjZjOTIyY2MwNyIsInNjb3BlcyI6WyJzaGlwcGluZy1jYWxjdWxhdGUiXX0.E3tDiYWJt4PRoVRlfz7c08upQECvWDCOSsgSo-HKnwP0pBJ9EgQHksV3rpRnybKJX3iAci-En2Cx0wjC6nFnl75LwOQ4NoMoemB2a2zR4ODGye8zVFCrln7dG1N7ETJVI3mlMHPRCyyHFClbFk1TcXGIuFSYLhgE2j1x_9dtzdOT-8SbkNEET2--HG08-ElkL2KFOAjONe7yNNPBTn2UNYeZjcT0ceTJATfA4EAEq0EJIRzdWXqh0Tjwg2yEsIcEBvAaVxCFllSn6_aWPcSOC4r9zxrrhYwKPElVC7ZBBRgyvZWmceOQ0EXZFL3Dv5BDLza-asNKzIUaTW9tR1tnvZMyQ3deId91eC9QhfL2yt28rABT0hHqSkCNXis0vDTFd4iMzATzVy0c1pAq2s2iUipiwosceLwlh82_ul8Gi0RoImrXvdImud_MhYcefRU5XFDil5Uvb_N2VNfW_nW5tEw8Y-sItsG5_Ab5aEoFbReN2MYIrx0iLF--Td4Q_vWgBZPGgRFIQ2WUpqpPBJfzYAlrauEcs-d4wrDYtKC0BqE1su0GKU4APFDebBZD-358UiET8ppIHyEifE-G_T7eQvD2SC0k2M02ra9ysZM2etstOFNJ_CeNrcw2-Giusl5x8kWqFGUt-LR9jNIcsZLF2ns-RivapOAD_0edlR2kbVc';

app.use(cors());
app.use(express.json());

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
        res.status(500).json({ error: 'Erro ao calcular frete' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});