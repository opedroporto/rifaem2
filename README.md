# Aplicativo Web de Rifas Virtuais

É um aplicativo web que possibilita pessoas a participarem de rifas, comprando números de rifas e realizando pagamentos por PIX no próprio website.

## Conteúdos

- [Instalação](#instalacao)
- [Como usar](#uso)
- [Suporte](#suporte)

<a name="instalacao"/>

## Instalação

Faça o download do repositório:

```sh
git clone https://github.com/opedroporto/rifaem2
```

<a name="uso"/>
         
## Como usar
> **Warning**: É necessário possuir um arquivo de variáveis `.env` contendo as credenciais para que a aplicação funcione por completo.
<br>

Copie o arquivo de variáveis `.env` para a pasta `/rifaem2webapp`:

```sh
mv [CAMINHO_PARA_SEU_ARQUIVO].env rifaem2/rifaem2webapp
```

Vá para o diretório baixado:
```sh
cd rifaem2
```

Execute os containers:
```sh
docker compose up
```

Acesse a aplicação em [http://localhost](http://localhost) :white_check_mark:

Fique à vontade para modificar qualquer arquivo do projeto e adaptá-lo às suas necessidades.

<a name="suporte"/>

## Suporte e Contribuição

Por favor, [abra um "Issue"](https://github.com/opedroporto/rifaem2/issues) ou contribua usando o [Github Flow](https://guides.github.com/introduction/flow/): crie um "branch", adicione "commits", e [abra um "pull request"](https://github.com/opedroporto/rifaem2/compare).

