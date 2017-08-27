CREATE TABLE metadata (
	release date,
	title varchar NOT NULL,
	album varchar,
	url varchar NOT NULL,
	style varchar,
	type varchar check (type in ('music','sample')),
	file_name varchar NOT NULL,
);
