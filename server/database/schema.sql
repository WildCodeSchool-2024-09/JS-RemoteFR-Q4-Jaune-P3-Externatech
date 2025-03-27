-- SQLBook: Code
CREATE TABLE company (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  logo VARCHAR(255),
  description TEXT NOT NULL, 
  email VARCHAR(100) NOT NULL UNIQUE,
  hashed_password VARCHAR(200) NOT NULL,
  siret VARCHAR(14) NOT NULL,
  address VARCHAR(255)NOT NULL DEFAULT 'adresse',
  postalCode VARCHAR(10) NOT NULL DEFAULT 'codePostal',
  city VARCHAR(100) NOT NULL DEFAULT 'ville',
  size VARCHAR (255) NOT NULL DEFAULT 'taille',
  website VARCHAR(255) NOT NULL DEFAULT 'site',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE candidate (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  hashed_password VARCHAR(200) NOT NULL
);

CREATE TABLE stack (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE contract (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL
);


CREATE TABLE work_condition (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL
);



CREATE TABLE offer (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  background TEXT NOT NULL,
  description TEXT NOT NULL,
  profile TEXT NOT NULL,
  salary INT NOT NULL,
  work_condition_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (work_condition_id) REFERENCES work_condition(id),
  company_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (company_id) REFERENCES company(id),
  contract_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (contract_id) REFERENCES contract(id)
);

CREATE TABLE application_status (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR (50) NOT NULL
);

CREATE TABLE offer_stack (
  offer_id INT UNSIGNED NOT NULL,
  stack_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (offer_id, stack_id),
  FOREIGN KEY (offer_id) REFERENCES offer(id) ON DELETE CASCADE,
  FOREIGN KEY (stack_id) REFERENCES stack(id) ON DELETE CASCADE
);

CREATE TABLE candidate_offer (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  candidate_id INT UNSIGNED NOT NULL,
  offer_id INT UNSIGNED NOT NULL,
  application_status_id INT UNSIGNED NOT NULL DEFAULT 1,
  resume TEXT NULL,
  UNIQUE KEY (offer_id, candidate_id),
  FOREIGN KEY (offer_id) REFERENCES offer(id) ON DELETE CASCADE,
  FOREIGN KEY (candidate_id) REFERENCES candidate(id) ON DELETE CASCADE,
  FOREIGN KEY (application_status_id) REFERENCES application_status(id) ON DELETE CASCADE
);

INSERT INTO company (name, logo, description, email, hashed_password, siret, address, postalCode, city, size, website) VALUES
('Tech Innov', '/logo-500-(1).png', 'Startup spécialisée dans l\'intelligence artificielle et les logiciels innovants.', 'contact@techinnov.com', '$argon2id$v=19$m=65536,t=3,p=4$tYykqjuRhLqF+J/VKx25sw$uf2YOEwp4c/5hCzLXizfewLN3UAdLWpqCS3LTmF/fJM', '12345678901234', '5 rue de la Technologie', '75001', 'Paris', '1-15', 'https://www.techinnov.com'),
('Green Future', '/logo-500-(2).png', 'Entreprise dédiée aux solutions écologiques et durables.', 'contact@greenfuture.com', '$argon2id$v=19$m=65536,t=3,p=4$mhjsza6PK0G8kI7LaJm2gQ$bX5kYl/Xz2Jb2716RdRHoP8+LWCnXKfjyc9SsusFk3Y', "98765432109876", '12 Avenue des Verts', '75002', 'Paris', '16-49', 'https://www.greenfuture.com'),
('DataCorp', '/logo-500-(4).png', 'Société experte en analyse de données et business intelligence.', 'contact@datacorp.com', '$argon2id$v=19$m=65536,t=3,p=4$dnPMkZ69DvtnaT5rC2wkuQ$GxkOezr8jaouUpRu+YRkZl3z43jgUFt2m27LHbkI3E4', "54321678901234", '25 Boulevard des Données', '69001', 'Lyon', '50-99', 'https://www.datacorp.com'),
('DevStudio', '/logo-500-(6).png', 'Agence de développement web et mobile sur mesure.', 'contact@devstudio.com', '$argon2id$v=19$m=65536,t=3,p=4$M1x4Uer4552/q2y3+BLVTA$Ueiv0XwGr22wRnOTOCuRFYrU9herwsjiiqMOUdy/mDU', "13579246801357", '3 Rue du Développement', '33000', 'Bordeaux', '16-49', 'https://www.devstudio.com'),
('CyberSecure','https://e7.pngegg.com/pngimages/993/800/png-clipart-empty-set-mathematical-notation-computer-icons-mathematics-symbol-mathematics-logo-sign.png', 'Entreprise spécialisée en cybersécurité et protection des données.', 'contact@cybersecure.com', '$argon2id$v=19$m=65536,t=3,p=4$IcK0QfINDCvq4nZM88oSMA$H8oOOVuK/Bb1+VbhTs54khT1U5HuTG7v12paRAQcN8A', "24681357902468", '8 Rue de la Cybersécurité', '75003', 'Paris', '100-500', 'https://www.cybersecure.com'),
('HealthTech', 'https://e7.pngegg.com/pngimages/993/800/png-clipart-empty-set-mathematical-notation-computer-icons-mathematics-symbol-mathematics-logo-sign.png', 'Société innovante dans le domaine de la santé numérique.', 'contact@healthtech.com', '$argon2id$v=19$m=65536,t=3,p=4$gL4ldMUzAu9kJIDtqWjRtw$JFjh2pQZO7DiIIichNhrbpG3Fvi9phstBKs6XqRKf+8', "75315946803571", '15 Rue de la Santé', '75004', 'Paris', '50-99', 'https://www.healthtech.com'),
('EcoSolutions','https://e7.pngegg.com/pngimages/993/800/png-clipart-empty-set-mathematical-notation-computer-icons-mathematics-symbol-mathematics-logo-sign.png', 'Solutions technologiques pour un monde plus vert.', 'contact@ecosolutions.com', '$argon2id$v=19$m=65536,t=3,p=4$SaZLVtpjmr3qEFI9wrOZ3A$KxZZLhQy0mbm9qLiZ7r1QrdkFYy0cCaB7Y5Ka4P6INM', "86420975308642", '30 Rue de l\'Environnement', '13001', 'Marseille', '16-49', 'https://www.ecosolutions.com'),
('AI Dynamics', 'https://e7.pngegg.com/pngimages/993/800/png-clipart-empty-set-mathematical-notation-computer-icons-mathematics-symbol-mathematics-logo-sign.png', 'Développement d\'intelligences artificielles avancées.', 'contact@aidynamics.com', '$argon2id$v=19$m=65536,t=3,p=4$n40qO5lYLuI8SuBZLu3f/w$MV3TsEHporSTYiP/GcIrFq3877pCGvBQQV2XIN0iqB8', "11223344556677", '20 Rue de l\'Innovation', '69002', 'Lyon', '100-500', 'https://www.aidynamics.com');


INSERT INTO stack (name) VALUES ('JavaScript'), ('Python'), ('Swift'), ('C#'), ('Ruby');

INSERT INTO contract (name) VALUES
('CDI'),
('CDD'),
('Stage'),
('Alternance'),
('Freelance');


INSERT INTO work_condition (name) VALUES
('sur site'),
('télétravail hybride'),
('full remote');

INSERT INTO offer (title, city, background, description, profile, salary, work_condition_id, company_id, contract_id) VALUES

('Développeur Fullstack', 
 'Paris', 
 'https://img.freepik.com/photos-gratuite/mise-plat-du-poste-travail-espace-copie-ordinateur-portable_23-2148430879.jpg?t=st=1741708462~exp=1741712062~hmac=fc3ef3ceba416d8f6a8456900ea74ac435386eed51bef95986547d07996280e3&w=1380', 
 'Nous recherchons un développeur Fullstack pour renforcer notre équipe sur des projets innovants.', 
 'Développeur Fullstack avec une expérience en JavaScript et Node.js, capable de travailler en équipe et de s’adapter à un environnement agile.', 
 40000,  
 2, 
 1, 
 1),

 ('Développeur Frontend', 
 'Paris', 
 'https://img.freepik.com/photos-gratuite/personne-devant-ordinateur-travaillant-html_23-2150040428.jpg?t=st=1741708989~exp=1741712589~hmac=ec2000f4f1b2aa008a5d3c62eb35f78f7f19b00e4311ee58148b1703b6dcc41e&w=1060', 
 'Nous recherchons un développeur Fullstack pour renforcer notre équipe sur des projets innovants.', 
 'Développeur Fullstack avec une expérience en JavaScript et Node.js, capable de travailler en équipe et de s’adapter à un environnement agile.', 
 30000,  
 1, 
 1, 
 2),

('Ingénieur Data', 
 'Lyon', 
 'https://img.freepik.com/photos-gratuite/lunettes-sont-posees-ordinateur-portable-reflechissent-lumiere-ecran-dans-noir_169016-52267.jpg?t=st=1741708696~exp=1741712296~hmac=05992cc6a4a9248b26b2aadd39d8eeaac0276ba59c9b6866d258b34c8013b788&w=996', 
 'Rejoignez notre équipe Data pour analyser et structurer des ensembles de données complexes.',  
 'Ingénieur spécialisé en Data Science, capable de manipuler des grands ensembles de données et d’optimiser leur exploitation.', 
 45000,  
3, 
 3, 
 2),

('Développeur Web Frontend', 
 'Bordeaux', 
 'https://img.freepik.com/photos-gratuite/espace-travail-ecran-ordinateur-ordinateur-portable_23-2148821901.jpg?t=st=1740582397~exp=1740585997~hmac=7e34d7b17961b37b532ffca3cccae3494295d3fb30927bb0620e862526051984&w=740', 
 'Stage de 6 mois en développement frontend avec React et Tailwind.', 
 'Développeur Frontend motivé, avec un fort intérêt pour l’UI/UX et une volonté d’apprendre React et Tailwind.', 
 1200,  
 1, 
 4, 
 3),

('Alternant DevOps', 
 'Nantes', 
 'https://img.freepik.com/free-photo/representation-user-experience-interface-design_23-2150169847.jpg?t=st=1741707411~exp=1741711011~hmac=e4190a77aa42af5b70cbefa9097854c72163a471c9a61e777670eb3e828d5c90&w=2000', 
 'Nous cherchons un alternant pour nous aider à automatiser et optimiser notre infrastructure cloud.',  
 'Étudiant en DevOps passionné par l’automatisation, souhaitant approfondir ses compétences en CI/CD et cloud computing.', 
 22000,  
 1, 
 2, 
 4);


INSERT INTO application_status (name) VALUES ("en attente"), ("acceptée"), ("rejetée");

INSERT INTO offer_stack VALUES (1,1),(1,2),(2,1),(2,2),(2,3),(3,2),(3,4),(3,5),(4,5),(4,1),(4,4), (5,4), (5,5);

INSERT INTO candidate (firstname, lastname, email, hashed_password) VALUES

('Julian', 'Delaplaya', 'julian.delaplaya@email.com', '$argon2id$v=19$m=65536,t=3,p=4$0gSirVxaZ5//6QdEjccD1Q$wuF1+3HOhIYkJXfD+lDHoJXPDKjnW77pLTikjkhfyd0'),
('Jacky', 'Martin', 'jack.martin@email.com', '$argon2id$v=19$m=65536,t=3,p=4$SYqQzLj4Mlc/F6/5rQ8ywQ$lshrje56AtJTXEQkvGKR52tqaeAdu3I6QuR3BHhSo7s'),
('Pierre', 'Durand', 'pierre.durand@email.com', '$argon2id$v=19$m=65536,t=3,p=4$efVsTP8vbERAh6KsGccf7g$xJSWKgJQ//CsTAEINJOehFG4lk65wshjge0LqTGN4u0'),
('Sophie', 'Lefebvre', 'sophie.lefebvre@email.com', '$argon2id$v=19$m=65536,t=3,p=4$tHuZplLONXsr1FBcWEu+4g$x7zzzaKQuFz6tSJiaSjBdZZe18G1iSuCf45VjuYtLyg'),
('Thomas', 'Moreau', 'thomas.moreau@email.com', '$argon2id$v=19$m=65536,t=3,p=4$07arFFGVJ/ZyEr0/ovTzdg$/CS9YHoTf0Di8R1lKTGXjlRZ960HR7ioKmUEyNsaUx8'),
('Camille', 'Roux', 'camille.roux@email.com', '$argon2id$v=19$m=65536,t=3,p=4$nNov7CHswtJBCnsn42qMYg$xS9ZEfWb79RtJ7dhpqxWe4JekZ3J5sUz/T5e23D3qus'),
('Emma', 'Bernard', 'emma.bernard@email.com', '$argon2id$v=19$m=65536,t=3,p=4$n2kfplbCq9EcDn2b/P3Cdg$B1lD+3c5DIE5Z6PE6tDj14U3dNRb3M7cKXyHA/OF9xk'),
('Hugo', 'Petit', 'hugo.petit@email.com', '$argon2id$v=19$m=65536,t=3,p=4$sv1ZmMM4T3j87ccwqtPsDw$WzrkB8JD3eygcTbf+DhabNhJj/XueKh0b353vSOUhOk'),
('Chloé', 'Robert', 'chloe.robert@email.com', '$argon2id$v=19$m=65536,t=3,p=4$1DtTIhD5guZLuRydbuznsg$gpDMWM/PPxi7K4tFvQaz8NADL7n2FAAlOfccNNccboU');


INSERT INTO candidate_offer (candidate_id, offer_id, resume) 
VALUES 
(1, 1, 'CV_Candidat1.pdf'), 
(2, 1, 'CV_Candidat2.pdf'), 
(3, 1, 'CV_Candidat3.pdf'), 
(4, 1, 'CV_Candidat4.pdf'), 
(1, 2, 'CV_Candidat1.pdf'), 
(2, 2, 'CV_Candidat2.pdf');


