# Relatório Técnico N3 - HealthSync

**Aluno:** Caio Borba

1. O que foi feito:
Para essa N3, eu decidi implementar a parte de Registro de Medicamentos no projeto HealthSync.

Para essa funcionalidade, foi definido que:
* É obrigatório preencher nome, dosagem, frequência e o tipo do remédio.
* O nome não pode ser muito curto (menos de 2 letras) e não aceita caracteres especiais (como @ ou !).
* A dosagem não pode ser apenas um espaço em branco.
* A frequência não aceita números negativos.
* O tipo do remédio tem que bater com uma lista válida (Comprimido, Gotas, Xarope, etc).
* O sistema não pode deixar cadastrar um remédio com o mesmo nome de um que já está no banco.

2. Como usei o TDD (Red-Green-Refactor)
* Red: Primeiro eu criei o arquivo de teste `remedio.service.test.js` e escrevi todos os casos de teste pensando nas regras que citei ali em cima. Quando rodei o Vitest, todos falharam, porque a lógica ainda não existia.
* Green: Fui no arquivo de produção `remedio.service.js` e criei a função `register`. Fui colocando os `if`s para disparar os erros exatamente na mesma ordem que os testes estavam pedindo. Depois de ajustar os mocks do banco, os testes passaram e ficaram verdes.
* Refactor: Na hora de montar o Controller, eu estruturei o `try/catch` para pegar os erros do Service e devolver o status HTTP 400.  E tive que refazer a forma que fiz os testes, porque acabei usando o `vi.spyOn()` para o Vitest conseguir interceptar as funções direito pra não quebrar. Dessa forma gerou o monitoramento. 

3. Explicação dos Testes

**Testes Unitários (Service)**
* **Teste de nome curto:** Aqui eu queria garantir que o sistema não aceitasse um remédio chamado só "A". Daí eu passei o mock do model, mas a validação do `if` trava o fluxo antes de chegar nele. O teste espera que o erro retorne a frase exata sobre o tamanho do nome.
* **Teste de duplicidade:** Usei o `mockRemedioModel.findOne.mockResolvedValueOnce` para simular que o banco já tinha achado um "Paracetamol" lá dentro. O teste espera que o Service estoure um erro avisando que o remédio já existe.
* **Teste de sucesso:** Simulei a criação de um remédio válido. O teste verifica se o resultado volta com as propriedades certas, como um ID criado e o nome "Ibuprofeno".

### Testes de Integração (Controller)
* **Teste de erro de validação (Status 400):** O objetivo era ver se o Controller conseguia pegar o erro do Service e mandar pro cliente. Usei o espião `vi.spyOn()` para forçar o service a dar um erro. Então o teste valida se o status da resposta HTTP é 400.
* **Teste de sucesso (Status 302):** Quando dá tudo certo na criação, o sistema tem que redirecionar o usuário. Eu forcei o mock a retornar sucesso então o teste verifica se a requisição volta com o status 302 e se o cabeçalho `location` manda para a rota `/remedios`.
