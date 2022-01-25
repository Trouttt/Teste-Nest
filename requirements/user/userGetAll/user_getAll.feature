Feature: Get Users
Quero poder obter os usuários

Scenario: Requisição válida
    When: Quando o usuário fizer a solicitação de usuários
    Then: Então o sistema deve retornar os usuários com sucesso
Scenario: Requisição inválida
    When: Quando o usuário fizer a solicitação de usuários
    Then: Então o sistema deve retornar uma mensagem de erro