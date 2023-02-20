DROP TABLE IF EXISTS 'chat-room';
DROP TABLE IF EXISTS 'chat-user';
DROP TABLE IF EXISTS 'users-rooms';
CREATE TABLE 'chat-room' (
    id int,
    name varchar(255)
);
CREATE TABLE 'chat-user' (
    id int,
    name varchar(255),
    password varchar(255)
);

CREATE TABLE 'users-rooms' (
    user_id int,
    room_id int
);
