DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    country_id INT NOT NULL,
    question_text TEXT NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id)
);

INSERT INTO questions (country_id, question_text)
VALUES
(1, 'What is the capital of France?'),
(2, 'How do you say "Hello" in Spanish?'),
(3, 'What is the capital of Germany?'),
(4, 'Which language is mainly spoken in Italy?'),
(5, 'Which continent is Brazil in?');