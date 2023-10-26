# Primeiros passos

1. Abrir um terminal na pasta do projeto e digitar : `npm i`
2. Inicar o docker ou aplicação do redis no computador

# Rodando aplicação

1. Abra o terminal do editor de código ou IDE e rode o comando: `npm run start:pub`
2. Abra o Terminal e rode o comando: `npm run strat:sub`
3. No mesmo Terminal abra uma nova aba e rode o seguinte comando: `curl -X POST http:localhost:3000/pub -d '{user: "Seu User", message: "Sua mensagem"}' -H "Content-Type: application/json"`
4. Caso não queria fazer essa etapa pelo terminal, basta abrir o Postman ou Insomnia e criar uma nova _HTTP Request_, mudar o método para _POST_ e inserir a seguinte _URL_ `http://localhost:3000/pub`, após isso, crie um corpo para requisição do tipo _JSON_ e preencha da seguinte forma: `{user: "Seu User", message: "Sua mensagem"}`, depois disso, envie a requisição.
