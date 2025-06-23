# ARCSA-BackendEnd
Este proyecto esta desarrollado en Node.js + Express

Es necesario ejecutar un script para crear la base de datos y sus tablas 

CREATE DATABASE IF NOT EXISTS test_tasks;

USE test_tasks;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  status ENUM ('pendiente', 'completado') DEFAULT 'pendiente',
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

Una vez realizado lo anterior es necesario ejecutar el siguiente comando para instalar dependencias
npm i

Para ejecutar el proyecto es necesario ejecutar el siguiente comando 
npm run dev
