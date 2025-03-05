-- SQLBook: Code

CREATE TABLE company (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
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


CREATE TABLE offer (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  logo TEXT NOT NULL,
  background TEXT NOT NULL,
  description TEXT NOT NULL,
  profile TEXT NOT NULL,
  salary INT NOT NULL,
  remote VARCHAR (255) NOT NULL,
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

INSERT INTO company (name, description, email, hashed_password) VALUES
('Tech Innov', 'Startup spécialisée dans l\'intelligence artificielle et les logiciels innovants.', 'contact@techinnov.com', '$argon2id$v=19$m=65536,t=3,p=4$tYykqjuRhLqF+J/VKx25sw$uf2YOEwp4c/5hCzLXizfewLN3UAdLWpqCS3LTmF/fJM'),
('Green Future', 'Entreprise dédiée aux solutions écologiques et durables.', 'contact@greenfuture.com', '$argon2id$v=19$m=65536,t=3,p=4$mhjsza6PK0G8kI7LaJm2gQ$bX5kYl/Xz2Jb2716RdRHoP8+LWCnXKfjyc9SsusFk3Y'),
('DataCorp', 'Société experte en analyse de données et business intelligence.', 'contact@datacorp.com', '$argon2id$v=19$m=65536,t=3,p=4$dnPMkZ69DvtnaT5rC2wkuQ$GxkOezr8jaouUpRu+YRkZl3z43jgUFt2m27LHbkI3E4'),
('DevStudio', 'Agence de développement web et mobile sur mesure.', 'contact@devstudio.com', '$argon2id$v=19$m=65536,t=3,p=4$M1x4Uer4552/q2y3+BLVTA$Ueiv0XwGr22wRnOTOCuRFYrU9herwsjiiqMOUdy/mDU'),
('CyberSecure', 'Entreprise spécialisée en cybersécurité et protection des données.', 'contact@cybersecure.com', '$argon2id$v=19$m=65536,t=3,p=4$IcK0QfINDCvq4nZM88oSMA$H8oOOVuK/Bb1+VbhTs54khT1U5HuTG7v12paRAQcN8A'),
('HealthTech', 'Société innovante dans le domaine de la santé numérique.', 'contact@healthtech.com', '$argon2id$v=19$m=65536,t=3,p=4$gL4ldMUzAu9kJIDtqWjRtw$JFjh2pQZO7DiIIichNhrbpG3Fvi9phstBKs6XqRKf+8'),
('EcoSolutions', 'Solutions technologiques pour un monde plus vert.', 'contact@ecosolutions.com', '$argon2id$v=19$m=65536,t=3,p=4$SaZLVtpjmr3qEFI9wrOZ3A$KxZZLhQy0mbm9qLiZ7r1QrdkFYy0cCaB7Y5Ka4P6INM'),
('AI Dynamics', 'Développement d\'intelligences artificielles avancées.', 'contact@aidynamics.com', '$argon2id$v=19$m=65536,t=3,p=4$n40qO5lYLuI8SuBZLu3f/w$MV3TsEHporSTYiP/GcIrFq3877pCGvBQQV2XIN0iqB8');

INSERT INTO stack (name) VALUES ('JavaScript'), ('Python'), ('Java'), ('C#'), ('Ruby');


INSERT INTO contract (name) VALUES
('CDI'),
('CDD'),
('Stage'),
('Alternance'),
('Freelance');
INSERT INTO offer (title, city, logo, background, description, profile, salary, remote, company_id, contract_id) VALUES
('Développeur Fullstack', 
 'Paris', 
 'https://techinnov.events/images/Logo_Techinnov_France2030_FondColor.svg', 
 'https://img.freepik.com/photos-gratuite/espace-travail-ecran-ordinateur-ordinateur-portable_23-2148821901.jpg?t=st=1740582397~exp=1740585997~hmac=7e34d7b17961b37b532ffca3cccae3494295d3fb30927bb0620e862526051984&w=740', 
 'Nous recherchons un développeur Fullstack pour renforcer notre équipe sur des projets innovants.', 
 'Développeur Fullstack avec une expérience en JavaScript et Node.js, capable de travailler en équipe et de s’adapter à un environnement agile.', 
 40000,  
 'Télétravail hybride', 
 1, 
 1),



('Ingénieur Data', 
 'Lyon', 
 'https://www.datacorp.fr/media/firm/social_sharing/23/06/24f49b62-d3f7-42bc-b853-c5633ae33b65.png', 
 'https://img.freepik.com/photos-gratuite/espace-travail-ecran-ordinateur-ordinateur-portable_23-2148821901.jpg?t=st=1740582397~exp=1740585997~hmac=7e34d7b17961b37b532ffca3cccae3494295d3fb30927bb0620e862526051984&w=740', 
 'Rejoignez notre équipe Data pour analyser et structurer des ensembles de données complexes.',  
 'Ingénieur spécialisé en Data Science, capable de manipuler des grands ensembles de données et d’optimiser leur exploitation.', 
 45000,  
 'Full remote', 
 3, 
 2),

('Développeur Web Frontend', 
 'Bordeaux', 
 'https://media.licdn.com/dms/image/v2/C4D0BAQGKTv968NBbPg/company-logo_200_200/company-logo_200_200/0/1631312412114?e=2147483647&v=beta&t=AB8IRLN3AzATwC0DfCqDVAOADWeXMFaTc9-pmhaq8Mk', 
 'https://img.freepik.com/photos-gratuite/espace-travail-ecran-ordinateur-ordinateur-portable_23-2148821901.jpg?t=st=1740582397~exp=1740585997~hmac=7e34d7b17961b37b532ffca3cccae3494295d3fb30927bb0620e862526051984&w=740', 
 'Stage de 6 mois en développement frontend avec React et Tailwind.', 
 'Développeur Frontend motivé, avec un fort intérêt pour l’UI/UX et une volonté d’apprendre React et Tailwind.', 
 1200,  
 'Présentiel', 
 4, 
 3),

('Alternant DevOps', 
 'Nantes', 
 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWJrgkClpIpFAti2dHF06O9620rtYabS0NA&s', 
 'https://img.freepik.com/photos-gratuite/espace-travail-ecran-ordinateur-ordinateur-portable_23-2148821901.jpg?t=st=1740582397~exp=1740585997~hmac=7e34d7b17961b37b532ffca3cccae3494295d3fb30927bb0620e862526051984&w=740', 
 'Nous cherchons un alternant pour nous aider à automatiser et optimiser notre infrastructure cloud.',  
 'Étudiant en DevOps passionné par l’automatisation, souhaitant approfondir ses compétences en CI/CD et cloud computing.', 
 22000,  
 'Présentiel', 
 2, 
 4);

INSERT INTO offer_stack VALUES (1,1),(1,2),(2,1),(2,2),(2,3),(3,2),(3,4),(3,5),(4,5),(4,1),(4,4);

INSERT INTO candidate (firstname, lastname, email, hashed_password) VALUES
('Julian', 'Delaplaya', 'julian.delaplaya@email.com', '$argon2id$v=19$m=65536,t=3,p=4$zHjwSepqmFU+m1zDWfEHWw$VtW7B5AZ0lcn4kgdDORVwtCFw1e7Razwssx/nFw2JFI'),
('Jacky', 'Martin', 'jack.martin@email.com', 'hashed_password_2');


