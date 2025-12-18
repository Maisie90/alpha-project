DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    question_text TEXT NOT NULL
);

INSERT INTO questions (question_text)
VALUES
('Which is the longest river in the world?'),
('Which UK city is known as the "Steel City"?'),
('Which desert is the largest in the world?'),
('Which country has the most natural lakes?'),
('What is the tallest mountain in Africa?');


CREATE TABLE answers (
    id INT GENERATED ALWAYS AS IDENTITY,
    question_id INT NOT NULL,
    answer_text TEXT NOT NULL,
    option CHAR(1) NOT NULL,
    correct_answer BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

INSERT INTO answers (question_id, answer_text, option, correct_answer)
VALUES
(1, 'Amazon', 'A', false),
(1, 'Nile', 'B', true),
(1, 'Yangtze', 'C', false),
(1, 'Mississippi', 'D', false),
(2, 'London', 'A', false),
(2, 'Sheffield', 'B', true),
(2, 'Manchester', 'C', false),
(2, 'Birmingham', 'D', false),
(3, 'Sahara', 'A', true),
(3, 'Gobi', 'B', false),
(3, 'Kalahari', 'C', false),
(3, 'Arabian', 'D', false),
(4, 'Canada', 'A', true),
(4, 'Brazil', 'B', false),
(4, 'Russia', 'C', false),
(4, 'USA', 'D', false),
(5, 'Kilimanjaro', 'A', true),
(5, 'Mount Kenya', 'B', false),
(5, 'Mount Elgon', 'C', false),
(5, 'Atlas Mountains', 'D', false);