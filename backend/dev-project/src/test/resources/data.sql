INSERT INTO nivel (id, nivel) VALUES(1, 'Trainee');
INSERT INTO nivel (id, nivel) VALUES(2, 'Junior');
INSERT INTO nivel (id, nivel) VALUES(3, 'Pleno');
INSERT INTO nivel (id, nivel) VALUES(4, 'Senior');

INSERT INTO desenvolvedor (id, nivel_id, nome, sexo, data_nascimento, hobby) VALUES(1, NULL, 'Marcos', 'N', '2002-10-31', 'Jogos');
INSERT INTO desenvolvedor (id, nivel_id, nome, sexo, data_nascimento, hobby) VALUES(2, 1, 'Chico', 'F', '1985-01-01', 'Desenhar');
INSERT INTO desenvolvedor (id, nivel_id, nome, sexo, data_nascimento, hobby) VALUES(3, 2, 'Fernando', 'F', '1977-06-08', 'Cozinhar');

ALTER SEQUENCE SEQ_NIVEL RESTART WITH 99;
ALTER SEQUENCE SEQ_DESENVOLVEDOR RESTART WITH 99;