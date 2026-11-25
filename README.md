# Sibila Oráculo — site

Site estático (HTML, CSS e um pouco de JavaScript), pronto para a Vercel.

## Páginas

| Arquivo | Endereço na Vercel |
|---|---|
| `index.html` | `/` |
| `servicos.html` | `/servicos` |
| `conselho.html` | `/conselho` |
| `depoimentos.html` | `/depoimentos` |
| `horarios.html` | `/horarios` |
| `como-funciona.html` | `/como-funciona` |

- `img/` — logo, foto da mesa de leitura e prints dos depoimentos
- `js/site.js` — formulários que abrem o WhatsApp com a mensagem pronta e o status "Atendendo agora" da página de horários
- `vercel.json` — tira o `.html` dos endereços

## Como publicar

1. Envie todos estes arquivos para um repositório no GitHub (mantendo as pastas `img` e `js`).
2. Na Vercel: **Add New… → Project → Import** o repositório.
3. Framework Preset: **Other**. Não precisa de Build Command nem de Output Directory.
4. Clique em **Deploy**.

Cada alteração enviada ao GitHub publica o site de novo automaticamente.

## Alterações comuns

- **Número do WhatsApp:** procure `5519993454939` em todos os arquivos (inclusive `js/site.js`).
- **Preços:** em `servicos.html`, cada consulta tem o valor ao lado do nome (ex.: `R$ 55,00`). Os valores "a partir de" ficam em `index.html`.
- **Novo depoimento:** coloque a imagem em `img/` e copie uma das linhas `<img src="img/depoimento-01.webp" …>` em `depoimentos.html` (e em `index.html`, se quiser na página inicial).
