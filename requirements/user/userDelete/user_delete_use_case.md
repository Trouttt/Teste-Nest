### User Delete Use Case

## Caso de sucesso

1. Sistema valida se o UUID é válido
2. Sistema faz uma requisição para a URL da api
3. Sistema efetua a remoção

# Exceção - Não conseguiu achar o usuário para efetuar a remoção - Válidado

1. Sistema retorna um statusCode e uma mensagem de erro avisando que não encontrou um usuário para efetuar a remoção

# Exceção - Não conseguiu efetuar a remoção - Válidado

1. Sistema retorna um statusCode e uma mensagem de erro avisando que deu erro ao efetuar a remoção
