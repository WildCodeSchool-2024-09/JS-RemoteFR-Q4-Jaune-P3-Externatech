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
('Tech Innov', 'Startup spécialisée dans l\'intelligence artificielle et les logiciels innovants.', 'contact@techinnov.com', 'TechInnov123'),
('Green Future', 'Entreprise dédiée aux solutions écologiques et durables.', 'contact@greenfuture.com', 'GreenFuture123'),
('DataCorp', 'Société experte en analyse de données et business intelligence.', 'contact@datacorp.com', 'DataCorp123'),
('DevStudio', 'Agence de développement web et mobile sur mesure.', 'contact@devstudio.com', 'DevStudio123'),
('CyberSecure', 'Entreprise spécialisée en cybersécurité et protection des données.', 'contact@cybersecure.com', 'CyberSecure123'),
('HealthTech', 'Société innovante dans le domaine de la santé numérique.', 'contact@healthtech.com', 'HealthTech123'),
('EcoSolutions', 'Solutions technologiques pour un monde plus vert.', 'contact@ecosolutions.com', 'EcoSolutions123'),
('AI Dynamics', 'Développement d\'intelligences artificielles avancées.', 'contact@aidynamics.com', 'AIDynamics123');

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
('Julian', 'Delaplaya', 'julian.delaplaya@email.com', '$argon2id$v=19$m=65536,t=3,p=4$0gSirVxaZ5//6QdEjccD1Q$wuF1+3HOhIYkJXfD+lDHoJXPDKjnW77pLTikjkhfyd0'),
('Jacky', 'Martin', 'jack.martin@email.com', '$argon2id$v=19$m=65536,t=3,p=4$Y7JKA5VyiqwJ8oiPZrQJjg$tfH8+cmRd3GECZC5dPBZFP0b0jUvHjZQYFQgR2xq4fk'),
('Pierre', 'Durand', 'pierre.durand@email.com', '$argon2id$v=19$m=65536,t=3,p=4$kBakQ7YyxYbQuruRzUy66w$38aGTdMIaEtNs/x6ztw7ki1NC3gud+eH3i4K4V1qTAI'),
('Sophie', 'Lefebvre', 'sophie.lefebvre@email.com', '$argon2id$v=19$m=65536,t=3,p=4$qudg5CslpxP+y3UUAyzsuQ$SQjZUtbJM/7vg6FVmtIeUXLHxtilBmhorBbrZJ/Ap84'),
('Thomas', 'Moreau', 'thomas.moreau@email.com', '$argon2id$v=19$m=65536,t=3,p=4$YJPgprQRgSP3BcQrXx7l1A$VSy1wpPjo6Ab/nibIs6+0QY2rIBu0sSio/5FWjzevUQ'),
('Camille', 'Roux', 'camille.roux@email.com', '$argon2id$v=19$m=65536,t=3,p=4$HVooV7qh8jv6FPt6w71dSQ$i7y6L2cnSA/wJ/iTCbpvrIHG5/W+0KOWQNLlbKW0xT0'),
('Lucas', 'Girard', 'lucas.girard@email.com', '$argon2id$v=19$m=65536,t=3,p=4$udjlpnzoIMcgVsvTBRvPTw$4Pr7fQ8gaRmAui+/+xy70fN0EXtMNxTjDG6nduDzshI'),
('Emma', 'Bernard', 'emma.bernard@email.com', '$argon2id$v=19$m=65536,t=3,p=4$0ZYYQTYvhxAiSOKkbn30Mw$Q6Z7xmcNb48ZQrHFbZ8/BLrxzZhkyKYqHPclkJgWo6o'),
('Hugo', 'Petit', 'hugo.petit@email.com', '$argon2id$v=19$m=65536,t=3,p=4$+0bzPBz6kPpxWJxJ3vxjag$D5FTW4x/Tt+O2d5c9Z/5rtaZmgZSenEm+YgUT8G9kWI'),
('Chloé', 'Robert', 'chloe.robert@email.com', '$argon2id$v=19$m=65536,t=3,p=4$m6OBd+0A/SORXcghzJLJFw$2s69MN5DrX/zrxE7k49Sjl5zyIuKaS+YOvTFk54pHjc');

