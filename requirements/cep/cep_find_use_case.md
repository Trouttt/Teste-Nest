### Cep Find Use Case

## Caso de sucesso 1

1. Sistema verifica se existe o CEP no banco de dados
2. Sistema não encontra o CEP no banco de dados
3. Sistema faz uma requisição para a API
4. Sistema efetua o cadastro do CEP no banco de dados
5. Sistema retorna o CEP pro usuário

# Exceção - Não conseguiu achar o CEP - Válidado

1. Sistema retorna um statusCode e uma mensagem de erro avisando que não encontrou o CEP requisitado na API

# Exceção - Não conseguiu efetuar o cadastro - Válidado

1. Sistema retorna um statusCode e uma mensagem de erro avisando que deu erro ao efetuar a remoção
