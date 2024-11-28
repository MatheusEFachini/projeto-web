# Projeto 
    Desenvolvido por Matheus Eduardo Fachini
    rodar "docker-compose up" e acessar "http://localhost:5173"
    
# Front-End
    - React com Typescript
    - NPM e Vite para controle de depêndencias
    - Componentes disponiveis na biblioteca do shadcn(https://ui.shadcn.com/docs)
    
    1 - Acessar frontend/dev-project
    2 - Subir a aplicação com 'npm run dev'
    3 - A aplicaçao irá subir no http://localhost:5173
    
# Back-End
    - Java 17
    - SpringBoot, JPA e Hibernate
    - Postgresql e Liquibase para gerar o banco
    - Testes integrados com JUnit 5

    1 - Acessar backend/dev-project
    2 - Em "application.properties" alterar os campos do banco para apontarem para seu banco local.
        2.1 - spring.datasource.url=jdbc:postgresql://localhost:5432/{NOME_BANCO_LOCAL}
              spring.datasource.username={USER_BANCO_LOCAL}
              spring.datasource.password={SENHA_BANCO_LOCAL}
        2.2 - Só é necessário a  criação de uma database local, o Liquibase irá criar todas as tabelas e sequences
    3 - Subir a aplicação com './mvnw spring-boot:run'
        3.1 - Ou abrir a aplicação por alguma IDE e rodar "com.projeto.dev_project.DevProjectApplication.class"
    3 - A aplicaçao irá subir no http://localhost:8080
    
