## 🦾 GymPass Style App

### RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil do usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias por nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in do usuário;
- [ ] Deve ser possível cadastrar uma academia;

### RNs (Regras de Negócio)

- [x] O usuário não pode se cadastrar com um e-mail já existente;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

### RNFs (Requisitos Não Funcionais)

- [x] A senha do usuário deve ser criptografada;
- [x] Os dados da aplicação precisam ser armazenados em um banco de dados PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um token JWT;
