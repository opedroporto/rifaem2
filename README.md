# Aplicativo Web para Rifas Virtuais
É um aplicativo web que possibilita pessoas a participarem de rifas, comprando números de rifas e realizando pagamentos por PIX no próprio website.

## Conteúdos
- [Instalação](#instalacao)
- [Como rodar](#uso)
- [Estrutura dos arquivos](#estrutura)
- [Suporte](#suporte)

<a name="instalacao"/>

## Instalação
Faça o download do repositório:
```sh
git clone https://github.com/opedroporto/rifaem2
```
<br>
<br>
<a name="uso"/>
         
## Como rodar
> **Warning**: É necessário possuir um arquivo de variáveis `.env` contendo as credenciais para que a aplicação funcione.
<br>

Copie o arquivo de variáveis `.env` para a pasta `/rifaem2webapp`:

```sh
mv [CAMINHO_PARA_SEU_ARQUIVO].env rifaem2/rifaem2webapp/
```

Vá para o diretório baixado:

```sh
cd rifaem2
```

### Rodando aplicação completa
Execute os containers:
```sh
docker compose -f docker-compose.dev.yml up
```
### Rodando apenas a aplicação Flask
Torne o script de inicialização executável:
```sh
chmod +x ./run-webapp.sh
```
Execute o script:
```sh
./run-webapp.sh
```

Acesse a aplicação em [http://localhost](http://localhost) :white_check_mark:

Fique à vontade para modificar qualquer arquivo do projeto e adaptá-lo às suas necessidades.

<br>
<br>
<a name="estrutura"/>

## Estrutura dos arquivos

```
├── README.md
├── docker-compose.dev.yml
├── docker-compose.yml
├── init-letsencrypt.sh
├── nginx
│   ├── nginx.dev.conf
│   └── nginx.prod.conf
├── rifaem2parseserver
│   ├── cloud
│   │   ├── main.js
│   │   ├── package.json
│   │   ├── pix.js
│   │   └── producao-443302-rifaem2.p12
│   ├── dbqueries
│   │   └── indexParaExpiracaodoNumeroAlocado.js
│   └── public
│       └── index.html
├── rifaem2webapp
│   ├── Dockerfile
│   ├── application
│   │   ├── blueprints
│   │   │   ├── __init__.py
│   │   │   ├── pixapi
│   │   │   │   ├── __init__.py
│   │   │   │   └── resources.py
│   │   │   ├── util
│   │   │   │   ├── __init__.py
│   │   │   │   ├── emailJobs.py
│   │   │   │   ├── helpers.py
│   │   │   │   └── sessionJobs.py
│   │   │   └── views
│   │   │       ├── __init__.py
│   │   │       ├── forms.py
│   │   │       └── views.py
│   │   ├── ext
│   │   │   ├── __init__.py
│   │   │   ├── configuration.py
│   │   │   ├── csrf.py
│   │   │   ├── email.py
│   │   │   ├── errorhandler.py
│   │   │   ├── session.py
│   │   │   └── sse.py
│   │   ├── static
│   │   │   ├── css
│   │   │   │   ├── animacaoCarregamento.css
│   │   │   │   ├── headerIndex.css
│   │   │   │   ├── headerOthers.css
│   │   │   │   ├── index.css
│   │   │   │   ├── modals.css
│   │   │   │   ├── pedidos.css
│   │   │   │   ├── rifa.css
│   │   │   │   ├── semPedidos.css
│   │   │   │   └── variaveis.css
│   │   │   ├── imagens
│   │   │   │   ├── LogoCompleto.png
│   │   │   │   ├── grifos.jpg
│   │   │   │   ├── logoIcone.ico
│   │   │   │   └── logoIcone.png
│   │   │   └── js
│   │   │       ├── carregamentoRifaFunctions.js
│   │   │       ├── menuBurguer.js
│   │   │       └── rifaFunctions.js
│   │   ├── templates
│   │   │   ├── 404.html
│   │   │   ├── animacaoCarregamento.html
│   │   │   ├── index.html
│   │   │   ├── layout.html
│   │   │   ├── mensagemUsuarioEmail.html
│   │   │   ├── modalConfirm.html
│   │   │   ├── modalFinish.html
│   │   │   ├── modalPix.html
│   │   │   ├── paginaRifa.html
│   │   │   ├── pedidoConfirmadoEmail.html
│   │   │   ├── pedidoEfetuadoEmail.html
│   │   │   ├── pedidos.html
│   │   │   ├── rifaSection.html
│   │   │   ├── semPedidos.html
│   │   │   └── sobre.html
│   │   └── wsgi.py
│   └── requirements.txt
└── run-webapp.sh

OBS: pasta /env não incluída
```

<br>
<br>
<a name="suporte"/>

## Suporte e Contribuição

Por favor, [abra um "Issue"](https://github.com/opedroporto/rifaem2/issues) ou contribua usando o [Github Flow](https://guides.github.com/introduction/flow/): crie um "branch", adicione "commits", e [abra um "pull request"](https://github.com/opedroporto/rifaem2/compare).

