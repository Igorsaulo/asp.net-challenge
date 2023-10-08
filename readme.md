# Asp.Challenge

<p>Esse projeto foi feito para analisar, e extrair informações de video com dois clicks</p>

## Tecnologias

<p>Esse projeto foi desenvolvido com as seguintes tecnologias:</p>
<ul>
    <li>Asp.NET</li>
    <li>NestJs</li>
    <li>Docker</li>
</ul>

## Requisitos

<ul>
    <li>NodeJs</li>
    <li>Asp.NET SDK 7</li>
</ul>

## Como usar

<p>Para clonar e rodar essa aplicação, você vai precisar do Git, Node.js e Asp.NET SDK 7 instalado no seu computador.</p>

<p>Na sua linha de comando:</p>

```bash
# Clone esse repositório
$ git clone https://github.com/Igorsaulo/asp.net-challenge.git
```

### NestJs
<p>Para inciar o servidor NestJs siga os seguintes passos:</p>

### Usando Docker
<p>Para exeutar a aplicação usando o docker, siga os seguintes passos:</p>

#### Certifique-se que o docker está instalado:
```bash
$ docker -v
```

#### Entre no repositório do NestJs:
```bash
$ cd asp.net-challenge/NestJs-Api
```

#### Crie a imagem do docker:
```bash
$ docker build -t nestjs-api .
```

#### Execute o container:
```bash
$ docker run -p 3000:3000 nestjs-api
```

### Usando npm

#### Entre no repositório do NestJs:
```bash
$ cd asp.net-challenge/NestJs-Api
```

#### Instale as dependências:
```bash
$ npm install
```

#### Inicie o servidor:
```bash
$ npm run start
```

### Asp.NET
<p>Para inciar o servidor Asp.NET siga os seguintes passos:</p>

#### Entre no repositório do Asp.NET:
```bash
$ cd asp.net-challenge/ASP.NET-MVM
```

#### Inicie o servidor:
```bash
$ dotnet run
```

## Como utilizar

<p>Para utilizar a aplicação, basta acessar o endereço <a href="http://localhost:5034/">http://localhost:5034</a> e inserir o video que deseja analisar.</p>