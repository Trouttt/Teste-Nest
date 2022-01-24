### User Register Use Case

## Caso de sucesso

1. Sistema valida os dados
2. Sistema faz uma requisição para a URL da api
3. Sistema efetua o registro

# Exceção - Inseriu um CPF inválido

1. Sistema retorna um statusCode e uma mensagem de erro avisando que o cpf está inválido

# Exceção - Inseriu um CPF já em uso

1. Sistema retorna um statusCode e uma mensagem de erro avisando que o cpf já está em uso