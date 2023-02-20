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

CREATE TABLE 'rooms-users' (
    room_id varchar(255),
    user_id varchar(255)
);
