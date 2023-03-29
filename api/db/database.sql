CREATE TABLE toggletable (
  	id SERIAL PRIMARY KEY,
	toggle_name VARCHAR(255),
        price VARCHAR(255),
        description TEXT,
        image TEXT

);

CREATE TABLE formfills (
  	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
        email VARCHAR(255)

);

INSERT INTO toggletable (id, toggle_name, price, description, image) VALUES (1, 'Classic Toggle', '$2', 'A simple, wooden toggle for any coat!', '/toggle-1.jpg');
INSERT INTO toggletable (id, toggle_name, price, description, image) VALUES (2, 'Fancy Toggle', '$5', 'Looking for some new flair? Look no further!', '/toggle-2.webp');
INSERT INTO toggletable (id, toggle_name, price, description, image) VALUES (3, 'Plastic Toggle', '$1', 'When durability is your main concern, plastic is there.', '/toggle-3.webp');
INSERT INTO toggletable (id, toggle_name, price, description, image) VALUES (4, 'Metal Toggle', '$10', 'For those who need a little more flash from their toggles.', '/toggle-4.webp');
INSERT INTO toggletable (id, toggle_name, price, description, image) VALUES (5, 'Bulk Toggles', '$15','Value Pack! Perfect for when you need a lot of toggles!', '/toggle-5.jpeg');
INSERT INTO toggletable (id, toggle_name, price, description, image) VALUES (6, 'Corded Toggle', '$5', 'Toggle and cord combo set! Cord not included.', '/toggle-6.jpeg');
INSERT INTO toggletable (id, toggle_name, price, description, image) VALUES (7, 'Historic Toggle', '$25', 'Perfect for whaling outings, definitely not whale bone...', '/toggle-7.jpeg');
INSERT INTO toggletable (id, toggle_name, price, description, image) VALUES (8, 'Horn Toggle', '$50', 'We are not liable for horn toggle related injuries, buyer beware.', '/toggle-8.jpeg');