Feature: User Update
Quero poder atualizar o usuário

Scenario: Dados válidos
    Given: Dado que o usuário inseriu informações válidas
    When: Quando o usuário solicitar pra efetuar a atualização
    Then: Então o sistema deve retornar um sinal indicando que a atualização foi feita com sucesso
Scenario: Dados Inválidas
    Given: Dado que o usuário inseriu informações Inválidas
    When: Quando o usuário solicitar pra efetuar a atualização
    Then: Então o sistema deve retornar uma mensagem de erro