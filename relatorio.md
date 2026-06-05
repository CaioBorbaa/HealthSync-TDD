# Relatório de Desenvolvimento: Registro de Usuários

## 1. Funcionalidade Escolhida e Regras de Negócio
A funcionalidade testada é o **Registro de Usuários** (`userService.register`). O objetivo desse serviço é validar os dados de entrada antes de persistir um novo usuário no banco de dados. 

Foram desenvolvidas as seguintes regras de negócios para os testes da função 'register' : 

* **Preenchimento Obrigatório:** Todos os campos do formulário devem ser preenchidos.
* **Validação de Nome e Sobrenome:** O primeiro nome não pode conter espaços ou caracteres especiais, e o sobrenome também não pode ter caracteres especiais.
* **Validação de E-mail:** O e-mail informado deve ter um formato válido e não pode estar previamente cadastrado no sistema (deve ser único).
* **Validação de Senha:** A senha deve possuir no mínimo 8 caracteres e deve coincidir perfeitamente com a confirmação.
* **Atribuição de Permissões (Roles):** O primeiro usuário registrado recebe automaticamente privilégios de Administrador (`ADMIN`). Os próximos usuários recebem o perfil padrão de Usuário (`USER`).

---

## 2. Aplicação do TDD (Ciclo Red-Green-Refactor)
O desenvolvimento seguiu a abordagem **Test-Driven Development (TDD)**:
* **🔴 Red:** Os testes unitários foram criados antes da lógica existir. O comportamento em cenários de erro ou sucesso foi mapeado, e os testes falhavam inicialmente.
* **🟢 Green:** O código de produção foi escrito apenas com o mínimo necessário para fazer os testes passarem.
* **🔵 Refactor:** O código foi otimizado e limpo, melhorando a estrutura sem alterar o comportamento, garantido pelos testes passando.

---

## 3. Exemplos de Testes Unitários

```javascript

// EXEMPLO 1: Verificação de campos obrigatórios
// O QUE VERIFICA: Garante que a função `register` seja interrompida e lance 
// um erro caso o envio não contenha todos os dados (ex: falta a senha).

it('Red - Irá retornar um erro se houver falta de dados', async () => {
  const data = {
    firstName: 'caio abobrá',
    email: 'PauloManseira@gmail.com'
  };
  await expect(userService.register(data, mockUserModel))
  .rejects
  .toThrow('Preencha todos os campos do formulário');
});


// EXEMPLO 2: Verificação de e-mail duplicado
// O QUE VERIFICA: Valida a unicidade do e-mail.  
// Faz a simulção que o banco já retornou um usuário existente e garante que o sistema bloqueie o cadastro.

it('Red - Irá retornar erro se o email já estiver cadastrado', async () =>{
  const data = { 
    firstName: 'CaioBorba', 
    lastName: 'Thiago', 
    email: 'Borbaa1004@gmail.com', 
    password: '12345678', 
    confirmPassword: '87654321' 
  };
  
  mockUserModel.findOne.mockResolvedValueOnce({id: 1, email: 'Borbaa1004@gmail.com'});

  await expect(userService.register(data, mockUserModel))
  .rejects
  .toThrow('Esse email já está cadastrado');
});


// EXEMPLO 3: Atribuição do primeiro usuário como ADMIN
// O QUE VERIFICA: Valida a criação do 1º administrador.  
// Faz a tentativa de simulação da contagem de usuários no banco como 0 e garante a atribuição da tag 'ADMIN'.

it('Cria novo usuário ADMIN', async () => {
  const data = { 
    firstName: 'CaioBorba', 
    lastName: 'Thiago', 
    email: 'Borbaa1004@gmail.com', 
    password: '12345678', 
    confirmPassword: '12345678' 
  };
  
  mockUserModel.findOne.mockResolvedValueOnce(null);
  mockUserModel.count.mockResolvedValue(0);
  
  mockUserModel.create.mockResolvedValue({ id: 1, ...data, admin: 'ADMIN' });
  const result = await userService.register(data, mockUserModel);

  expect(result.admin).toBe('ADMIN');
});