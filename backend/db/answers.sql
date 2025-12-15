DROP TABLE IF EXISTS answers;

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
(1, 'Berlin', 'A', false),
(1, 'Madrid', 'B', false),
(1, 'Paris', 'C', true),
(1, 'Rome', 'D', false),
(2, 'Bonjour', 'A', false),
(2, 'Hola', 'B', true),
(2, 'Ciao', 'C', false),
(2, 'Hallo', 'D', false),
(3, 'Vienna', 'A', false),
(3, 'Berlin', 'B', true),
(3, 'Munich', 'C', false),
(3, 'Hamburg', 'D', false),
(4, 'Spanish', 'A', false),
(4, 'French', 'B', false),
(4, 'Italian', 'C', true),
(4, 'Portuguese', 'D', false),
(5, 'Europe', 'A', false),
(5, 'Africa', 'B', false),
(5, 'South America', 'C', true),
(5, 'Asia', 'D', false);