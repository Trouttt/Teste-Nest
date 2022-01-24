Feature: User Register
Como um anonimo
Quero poder me cadastrar no site

Scenario: Dados válidos
    Given: Dado que o usuário inseriu informações válidas
    When: Quando o usuário solicitar pra efetuar o cadastro
    Then: Então o sistema deve retornar um sinal indicando que o cadastro foi feito com sucesso
Scenario: Dadis Inválidas
    Given: Dado que o usuário inseriu informações Inválidas
    When: Quando o usuário solicitar pra efetuar o cadastro
    Then: Então o sistema deve retornar uma mensagem de erro