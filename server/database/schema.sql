CREATE TABLE company (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL, 
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);


CREATE TABLE language (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL
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
  date DATE NOT NULL,
  skills TEXT NOT NULL,
  salary INT NOT NULL,
  requirements TEXT NOT NULL,
  remote VARCHAR (255) NOT NULL,
  company_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (company_id) REFERENCES company(id),
  contract_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (contract_id) REFERENCES contract(id)
);

INSERT INTO company (name, description, email, password) VALUES
('Tech Innov', 'Startup spécialisée dans l\'intelligence artificielle et les logiciels innovants.', 'contact@techinnov.com', 'TechInnov123'),
('Green Future', 'Entreprise dédiée aux solutions écologiques et durables.', 'contact@greenfuture.com', 'GreenFuture123'),
('DataCorp', 'Société experte en analyse de données et business intelligence.', 'contact@datacorp.com', 'DataCorp123'),
('DevStudio', 'Agence de développement web et mobile sur mesure.', 'contact@devstudio.com', 'DevStudio123');



INSERT INTO contract (name) VALUES
('CDI'),
('CDD'),
('Stage'),
('Alternance'),
('Freelance');

INSERT INTO offer (title, city, logo, background, description, date, skills, salary, requirements, remote, company_id, contract_id) VALUES
('Développeur Fullstack', 
 'Paris', 
 'https://techinnov.events/images/Logo_Techinnov_France2030_FondColor.svg', 
 'https://img.freepik.com/photos-gratuite/espace-travail-ecran-ordinateur-ordinateur-portable_23-2148821901.jpg?t=st=1740582397~exp=1740585997~hmac=7e34d7b17961b37b532ffca3cccae3494295d3fb30927bb0620e862526051984&w=740', 
 'Nous recherchons un développeur Fullstack pour renforcer notre équipe sur des projets innovants.', 
 '2025-03-01', 
 'Développeur Fullstack polyvalent, capable de travailler sur l’ensemble de la stack web avec une approche agile et collaborative.', 
 40000, 
 '["JavaScript", "React", "Node.js", "SQL"]', 
 'Télétravail hybride', 
 1, 
 1),

('Ingénieur Data', 
 'Lyon', 
 'https://upload.wikimedia.org/wikipedia/commons/4/45/Data_icon.svg', 
 'https://img.freepik.com/photos-gratuite/espace-travail-ecran-ordinateur-ordinateur-portable_23-2148821901.jpg?t=st=1740582397~exp=1740585997~hmac=7e34d7b17961b37b532ffca3cccae3494295d3fb30927bb0620e862526051984&w=740', 
 'Rejoignez notre équipe Data pour analyser et structurer des ensembles de données complexes.', 
 '2025-03-10', 
 'Ingénieur spécialisé en analyse de données, capable d’extraire des insights pertinents à partir de grands volumes d’informations.', 
 45000, 
 '["SQL", "Python", "Modélisation de données"]', 
 'Full remote', 
 3, 
 2),

('Développeur Web Frontend', 
 'Bordeaux', 
 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Web_development_logo.png', 
 'https://img.freepik.com/photos-gratuite/espace-travail-ecran-ordinateur-ordinateur-portable_23-2148821901.jpg?t=st=1740582397~exp=1740585997~hmac=7e34d7b17961b37b532ffca3cccae3494295d3fb30927bb0620e862526051984&w=740', 
 'Stage de 6 mois en développement frontend avec React et Tailwind.', 
 '2025-04-01', 
 'Développeur frontend passionné par l’expérience utilisateur et les interfaces modernes.', 
 1200, 
 '["JavaScript", "React", "CSS moderne"]', 
 'Présentiel', 
 4, 
 3),

('Alternant DevOps', 
 'Nantes', 
 'https://upload.wikimedia.org/wikipedia/commons/0/0e/DevOps-toolchain.svg', 
 'https://img.freepik.com/photos-gratuite/espace-travail-ecran-ordinateur-ordinateur-portable_23-2148821901.jpg?t=st=1740582397~exp=1740585997~hmac=7e34d7b17961b37b532ffca3cccae3494295d3fb30927bb0620e862526051984&w=740', 
 'Nous cherchons un alternant pour nous aider à automatiser et optimiser notre infrastructure cloud.', 
 '2025-09-01', 
 'Profil curieux et rigoureux, avec une envie d’apprendre et de maîtriser les outils d’automatisation et de déploiement.', 
 22000, 
 '["CI/CD", "Docker", "Kubernetes"]', 
 'Présentiel', 
 2, 
 4);
