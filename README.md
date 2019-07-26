# AWS Simple Queue Service - SQS - NodeJS Example

Este projeto demonstra como utilizar os métodos básicos de envio e recebimento de mensagens utilizando o AWS SQS.

## Configuração ##

Neste projeto não iremos utilizar os endpoints para criação de filas, em vez disso usaremos o painel da AWS para criar e configurar as filas previamente.

Acessar: [AWS SQS](https://console.aws.amazon.com/sqs)

Neste projeto utilizaremos a fila FIFO que tem como caracteristica:

- **Alta taxa de transferência:** as filas FIFO (ordem de chegada) oferecem suporte a até 300 mensagens por segundo (300 operações de envio, recebimento ou exclusão por segundo). Ao agrupar em lote 10 mensagens por operação (no máximo), as filas FIFO podem suportar até 3.000 mensagens por segundo. Para solicitar um aumento de limite, envie uma solicitação de suporte.	

- **Entrega por ordem de chegada (FIFO):** a ordem em que as mensagens são enviadas e recebidas é preservada com rigor.

- **Processamento exatamente uma vez:** uma mensagem é entregue uma vez e permanece disponível até que um consumidor a processe e exclua. As repetições não são introduzidas na fila.

Mais informações sobre a SQS FIFO [aqui](https://docs.aws.amazon.com/pt_br/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html#FIFO-queues-understanding-logic)

Segue abaixo a tela de configuração da tela
![]("/images/criar-fila.jpg")

Após este tela, clicar em "Criar Fila" e pegar a URL de configuração.

***Importante: Você deve editar preencher as suas chaves de acesso ano arquivo config.json.***

## Executar ##

Para executar o projeto basta seguir os seguintes comandos:
```
npm install
npm start
```

Ao final deve ser exibido o seguinte resultado:
> AWS SQS listening in http://:::8080


# Endpoints

**GET: receive**
- Com este endpoint você irá processar e remover uma mensagem da fila.
- A mensagem apenas fica disponível após ultrapassar o tempo de espera configurado no momento de crição da fila.
- O retorno do método será o conteudo em JSON da mensgem enviada no método *send*.

**POST: send**
- Endpoint utilizado para enviar uma nova mensagem para a fila de processamento.:
- Deve ser utilizado o *Content-Type: application/json*.

## Referencias ##

[Documentação](https://docs.aws.amazon.com/pt_br/sdk-for-javascript/v2/developer-guide/sqs-examples-send-receive-messages.html)
