Feature: User Delete
Quero poder deletar o usuário

Scenario: Dados válidos
    Given: Dado que o usuário inseriu o UUID do usuário 
    When: Quando o usuário solicitar pra efetuar a remoção
    Then: Então o sistema deve retornar um sinal indicando que a remoção do usuário foi feita com sucesso
Scenario: Dados Inválidas
    Given: Dado que o usuário inseriu um UUID inválido
    When: Quando o usuário solicitar pra efetuar a remoção
    Then: Então o sistema deve retornar uma mensagem de erro