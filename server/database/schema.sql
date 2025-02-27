-- SQLBook: Code
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
  description TEXT NOT NULL,
  date DATE NOT NULL,
  salary INT NOT NULL,
  requirements TEXT NOT NULL,
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
('Alternance');

INSERT INTO offer (title, description, date, salary, requirements, company_id, contract_id) VALUES
('Développeur Fullstack', 
 'Nous recherchons un développeur Fullstack pour renforcer notre équipe sur des projets innovants.', 
 '2025-03-01', 
 40000, 
 'Maîtrise de JavaScript (React/Node.js), SQL et des bonnes pratiques de développement.', 
 1, 
 1),


('Ingénieur Data', 
 'Rejoignez notre équipe Data pour analyser et structurer des ensembles de données complexes.', 
 '2025-03-10', 
 45000, 
 'Expérience en SQL, Python et en modélisation de données.', 
 3, 
 2),


('Développeur Web Frontend', 
 'Stage de 6 mois en développement frontend avec React et Tailwind.', 
 '2025-04-01', 
 1200, 
 'Bonne connaissance de JavaScript, React et CSS moderne.', 
 4, 
 3),


('Alternant DevOps', 
 'Nous cherchons un alternant pour nous aider à automatiser et optimiser notre infrastructure cloud.', 
 '2025-09-01', 
 22000, 
 'Connaissances en CI/CD, Docker et Kubernetes.', 
 2, 
 4);


