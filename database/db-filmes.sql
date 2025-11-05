CREATE DATABASE biblioteca_filmes;

USE biblioteca_filmes;

CREATE TABLE usuarios(
	id_usuarios int auto_increment primary key,
	nome varchar(70) not null,
    email varchar(100) unique not null,
    senha varchar(15) not null
);

CREATE TABLE filmes(
	id_filmes int auto_increment primary key,
    nome varchar(200) not null,
    genero varchar(50) not null,
    diretor varchar(70) not null,
    ano year not null
);

CREATE TABLE avaliacoes(
	id_avaliacoes int auto_increment primary key,
    id_usuarios int,
    id_filmes int,
    nota decimal(2,1) check (nota >= 0 and nota <= 10),
    comentario text,
    data_avaliacao datetime default current_timestamp,
    foreign key (id_usuarios) references usuarios(id_usuarios),
    foreign key (id_filmes) references filmes(id_filmes)
    );
    
    
    -- Inserindo usuários
INSERT INTO usuarios (nome, email, senha)
VALUES
('Eduarda Lima', 'eduarda@email.com', '12345'),
('João Silva', 'joao@email.com', 'senha123'),
('Maria Souza', 'maria@email.com', 'abc123'),
('Lucas Andrade', 'lucas@email.com', 'senha321');

-- Inserindo filmes
INSERT INTO filmes (nome, genero, diretor, ano)
VALUES
('A Origem', 'Ficção Científica', 'Christopher Nolan', 2010),
('Vingadores: Ultimato', 'Ação', 'Anthony e Joe Russo', 2019),
('O Rei Leão', 'Animação', 'Roger Allers', 1994),
('Parasita', 'Suspense', 'Bong Joon-ho', 2019),
('Interestelar', 'Ficção Científica', 'Christopher Nolan', 2014),
('Divertida Mente', 'Animação', 'Pete Docter', 2015);

-- Inserindo avaliações
INSERT INTO avaliacoes (id_usuarios, id_filmes, nota, comentario)
VALUES
(1, 1, 9.5, 'Roteiro incrível e final surpreendente!'),
(2, 2, 8.8, 'Cheio de ação, efeitos incríveis!'),
(3, 3, 9.0, 'Um clássico emocionante da Disney.'),
(4, 4, 9.7, 'Crítica social muito inteligente.'),
(1, 5, 9.3, 'Viagem espacial com muita emoção e reflexão.'),
(2, 6, 8.5, 'Colorido, divertido e com ótima mensagem.'),
(3, 2, 9.0, 'O melhor filme da Marvel pra mim!'),
(4, 1, 9.2, 'Complexo, mas fascinante. Revi várias vezes.');

select * from avaliacoes;
