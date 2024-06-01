# RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário logado obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo seu nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] o usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] o usuário não pode fazer 2 check-ins no mesmo dia;
- [x] o usuário não pode fazer check-in se não estiver perto (100m) da academia
- [x] o check-in só pode ser validado até 20 minutos após criado;
- [ ] o check-in só pode ser validado por administradores;
- [ ] a academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] a senha do usuário precisa estar criptografada;
- [x] os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] o usuário deve ser indentificado por um JWT (JSON Web Token)