CREATE TABLE metadata (
  music_id serial PRIMARY KEY,
	release date,
	title varchar NOT NULL,
	album varchar,
	video_url varchar NOT NULL,
	style varchar,
	type varchar check (type in ('music','sample')),
	file_name varchar NOT NULL
);
