-- SQLBook: Code
CREATE TABLE company (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  logo TEXT NOT NULL,
  description TEXT NOT NULL, 
  email VARCHAR(100) NOT NULL UNIQUE,
  hashed_password VARCHAR(200) NOT NULL
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


CREATE TABLE remote(
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
  remote_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (remote_id) REFERENCES remote(id),
  company_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (company_id) REFERENCES company(id),
  contract_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (contract_id) REFERENCES contract(id)
);

CREATE TABLE offer_stack (
  offer_id INT UNSIGNED NOT NULL,
  stack_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (offer_id, stack_id),
  FOREIGN KEY (offer_id) REFERENCES offer(id) ON DELETE CASCADE,
  FOREIGN KEY (stack_id) REFERENCES stack(id) ON DELETE CASCADE
);

CREATE TABLE candidate_offer (
  candidate_id INT UNSIGNED NOT NULL,
  offer_id INT UNSIGNED NOT NULL
);

INSERT INTO company (name, logo, description, email, hashed_password) VALUES
('Tech Innov', '/logo-500-(1).png', 'Startup spécialisée dans l\'intelligence artificielle et les logiciels innovants.', 'contact@techinnov.com', '$argon2id$v=19$m=65536,t=3,p=4$tYykqjuRhLqF+J/VKx25sw$uf2YOEwp4c/5hCzLXizfewLN3UAdLWpqCS3LTmF/fJM'),
('Green Future', '/logo-500-(2).png', 'Entreprise dédiée aux solutions écologiques et durables.', 'contact@greenfuture.com', '$argon2id$v=19$m=65536,t=3,p=4$mhjsza6PK0G8kI7LaJm2gQ$bX5kYl/Xz2Jb2716RdRHoP8+LWCnXKfjyc9SsusFk3Y'),
('DataCorp', '/logo-500-(4).png', 'Société experte en analyse de données et business intelligence.', 'contact@datacorp.com', '$argon2id$v=19$m=65536,t=3,p=4$dnPMkZ69DvtnaT5rC2wkuQ$GxkOezr8jaouUpRu+YRkZl3z43jgUFt2m27LHbkI3E4'),
('DevStudio', '/logo-500-(6).png', 'Agence de développement web et mobile sur mesure.', 'contact@devstudio.com', '$argon2id$v=19$m=65536,t=3,p=4$M1x4Uer4552/q2y3+BLVTA$Ueiv0XwGr22wRnOTOCuRFYrU9herwsjiiqMOUdy/mDU'),
('CyberSecure','https://e7.pngegg.com/pngimages/993/800/png-clipart-empty-set-mathematical-notation-computer-icons-mathematics-symbol-mathematics-logo-sign.png', 'Entreprise spécialisée en cybersécurité et protection des données.', 'contact@cybersecure.com', '$argon2id$v=19$m=65536,t=3,p=4$IcK0QfINDCvq4nZM88oSMA$H8oOOVuK/Bb1+VbhTs54khT1U5HuTG7v12paRAQcN8A'),
('HealthTech', 'https://e7.pngegg.com/pngimages/993/800/png-clipart-empty-set-mathematical-notation-computer-icons-mathematics-symbol-mathematics-logo-sign.png', 'Société innovante dans le domaine de la santé numérique.', 'contact@healthtech.com', '$argon2id$v=19$m=65536,t=3,p=4$gL4ldMUzAu9kJIDtqWjRtw$JFjh2pQZO7DiIIichNhrbpG3Fvi9phstBKs6XqRKf+8'),
('EcoSolutions','https://e7.pngegg.com/pngimages/993/800/png-clipart-empty-set-mathematical-notation-computer-icons-mathematics-symbol-mathematics-logo-sign.png', 'Solutions technologiques pour un monde plus vert.', 'contact@ecosolutions.com', '$argon2id$v=19$m=65536,t=3,p=4$SaZLVtpjmr3qEFI9wrOZ3A$KxZZLhQy0mbm9qLiZ7r1QrdkFYy0cCaB7Y5Ka4P6INM'),
('AI Dynamics', 'https://e7.pngegg.com/pngimages/993/800/png-clipart-empty-set-mathematical-notation-computer-icons-mathematics-symbol-mathematics-logo-sign.png', 'Développement d\'intelligences artificielles avancées.', 'contact@aidynamics.com', '$argon2id$v=19$m=65536,t=3,p=4$n40qO5lYLuI8SuBZLu3f/w$MV3TsEHporSTYiP/GcIrFq3877pCGvBQQV2XIN0iqB8');

INSERT INTO stack (name) VALUES ('JavaScript'), ('Python'), ('Java'), ('C#'), ('Ruby');

INSERT INTO contract (name) VALUES
('CDI'),
('CDD'),
('Stage'),
('Alternance'),
('Freelance');


INSERT INTO remote (name) VALUES
('sur site'),
('télétravail hybride'),
('full remote');

INSERT INTO offer (title, city, background, description, profile, salary, remote_id, company_id, contract_id) VALUES

('Développeur Fullstack', 
 'Paris', 
 'https://img.freepik.com/photos-gratuite/espace-travail-ecran-ordinateur-ordinateur-portable_23-2148821901.jpg?t=st=1740582397~exp=1740585997~hmac=7e34d7b17961b37b532ffca3cccae3494295d3fb30927bb0620e862526051984&w=740', 
 'Nous recherchons un développeur Fullstack pour renforcer notre équipe sur des projets innovants.', 
 'Développeur Fullstack avec une expérience en JavaScript et Node.js, capable de travailler en équipe et de s’adapter à un environnement agile.', 
 40000,  
 2, 
 1, 
 1),

('Ingénieur Data', 
 'Lyon', 
 'https://img.freepik.com/photos-gratuite/espace-travail-ecran-ordinateur-ordinateur-portable_23-2148821901.jpg?t=st=1740582397~exp=1740585997~hmac=7e34d7b17961b37b532ffca3cccae3494295d3fb30927bb0620e862526051984&w=740', 
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
 'https://img.freepik.com/photos-gratuite/espace-travail-ecran-ordinateur-ordinateur-portable_23-2148821901.jpg?t=st=1740582397~exp=1740585997~hmac=7e34d7b17961b37b532ffca3cccae3494295d3fb30927bb0620e862526051984&w=740', 
 'Nous cherchons un alternant pour nous aider à automatiser et optimiser notre infrastructure cloud.',  
 'Étudiant en DevOps passionné par l’automatisation, souhaitant approfondir ses compétences en CI/CD et cloud computing.', 
 22000,  
 1, 
 2, 
 4);

INSERT INTO offer_stack VALUES (1,1),(1,2),(2,1),(2,2),(2,3),(3,2),(3,4),(3,5),(4,5),(4,1),(4,4);

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


INSERT INTO candidate_offer (candidate_id, offer_id) VALUES (1,1),(2,1),(3,1),(4,1),(1,2),(2,2);
