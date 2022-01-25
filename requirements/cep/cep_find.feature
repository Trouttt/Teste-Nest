Feature: Cep Find
Quero poder pegar os dados de um CEP

Scenario: CEP registrado no banco de dados
    Given: Dado que o usuário inseriu o cep válido 
    Then: Então o sistema deve cadastrar no banco de dados e retornar o cep

Scenario: CEP não registrado no banco de dados
    Given: Dado que o usuário inseriu um cep válido
    Then: Então o sistema deve fazer uma requisição pra API, receber os dados, cadastrar no banco de dados
        e retornar o cep

Scenario: CEP não existe
    Given: Dado que o usuário inseriu um cep válido
    Then: Então o sistema deve fazer retornar uma mensagem de erro dizendo que o CEP não existe!