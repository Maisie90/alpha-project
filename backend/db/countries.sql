DROP TABLE IF EXISTS countries;

CREATE TABLE countries (
    id INT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO countries (name, image_url)
VALUES
('France', 'france.png'),
('Spain', 'spain.png'),
('Germany', 'germany.png'),
('Italy', 'italy.png'),
('Brazil', 'brazil.png');