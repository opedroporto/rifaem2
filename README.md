# Aplicativo Web para Rifas Virtuais
É um aplicativo web que possibilita pessoas a participarem de rifas, comprando números de rifas e realizando pagamentos por 
PIX no próprio website ([rifado2.com](https://rifado2.com)).

![image](https://github.com/opedroporto/rifaem2/assets/77935889/e5849aba-3181-469b-ba3e-09173235b549)

## Conteúdos
- [Pré-visualização](#preview)
- [Instalação](#instalacao)
- [Como rodar](#uso)
- [Acesso](#acesso)
- [Estrutura dos arquivos](#estrutura)
- [Suporte](#suporte)

<a name="preview"/>

## Pré-visualização

![image](https://github.com/opedroporto/rifaem2/assets/77935889/60a57828-f98d-4f8b-8a5c-38b1939bd096)
![image](https://github.com/opedroporto/rifaem2/assets/77935889/21035e1b-ad1c-42a2-8cba-cd93d6009d0d)
![image](https://github.com/opedroporto/rifaem2/assets/77935889/c7412051-5b1c-4522-8ee6-5e5c8388c70a)
![image](https://github.com/opedroporto/rifaem2/assets/77935889/c9bc806a-456f-4c66-a947-eca29066fb4c)
![image](https://github.com/opedroporto/rifaem2/assets/77935889/e268f195-6acd-4488-86b1-5b9d2bfe022f)

<br>
<br>
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
<a name="acesso"/>

## Acesso

[rifado2.com](https://rifado2.com)

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
│   │   └── pix.js
│   ├── dbstatements
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
│   │   │   ├── flask_session
│   │   │   │   ├── __init__.py
│   │   │   │   └── sessions.py
│   │   │   ├── session.py
│   │   │   └── sse.py
│   │   ├── static
│   │   │   ├── css
│   │   │   │   ├── animacaoCarregamento.css
│   │   │   │   ├── headerIndex.css
│   │   │   │   ├── headerOthers.css
│   │   │   │   ├── index.css
│   │   │   │   ├── lib
│   │   │   │   │   └── fontawesome-free-6.4.0-web
│   │   │   │   ├── modals.css
│   │   │   │   ├── pedidos.css
│   │   │   │   ├── rifa.css
│   │   │   │   ├── semPedidos.css
│   │   │   │   └── variaveis.css
│   │   │   ├── imagens
│   │   │   │   ├── LogoCompleto.png
│   │   │   │   ├── grifos.jpg
│   │   │   │   ├── grifos.webp
│   │   │   │   ├── logoIcone.ico
│   │   │   │   ├── logoIcone.png
│   │   │   │   ├── news1.webp
│   │   │   │   ├── news2.webp
│   │   │   │   ├── news3.webp
│   │   │   │   ├── news4.webp
│   │   │   │   ├── news5.webp
│   │   │   │   └── news6.webp
│   │   │   └── js
│   │   │       ├── carregamentoRifaFunctions.js
│   │   │       ├── lib
│   │   │       │   ├── jquery.inputmask.min.js
│   │   │       │   └── jquery.min.js
│   │   │       ├── menuBurguer.js
│   │   │       ├── pedidosFunctions.js
│   │   │       └── rifaFunctions.js
│   │   ├── templates
│   │   │   ├── 404.html
│   │   │   ├── animacaoCarregamento.html
│   │   │   ├── index.html
│   │   │   ├── layout.html
│   │   │   ├── mensagemUsuarioEmail.html
│   │   │   ├── modalConfirm.html
│   │   │   ├── modalFinish.html
│   │   │   ├── modalImg.html
│   │   │   ├── modalPix.html
│   │   │   ├── paginaRifa.html
│   │   │   ├── pedidoConfirmadoEmail.html
│   │   │   ├── pedidoEfetuadoEmail.html
│   │   │   ├── pedidos.html
│   │   │   ├── rifaSection.html
│   │   │   ├── semPedidos.html
│   │   │   └── sobre.html
│   │   └── wsgi.py
│   ├── env
│   └── requirements.txt
└── run-webapp.sh

OBS: pasta /env não incluída
```

<br>
<br>
<a name="suporte"/>

## Suporte e Contribuição

Por favor, [abra um "Issue"](https://github.com/opedroporto/rifaem2/issues) ou contribua usando o [Github Flow](https://guides.github.com/introduction/flow/): crie um "branch", adicione "commits", e [abra um "pull request"](https://github.com/opedroporto/rifaem2/compare).

