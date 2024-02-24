CREATE TABLE users(
  userid SERIAL PRIMARY KEY,
  email TEXT,
  password TEXT,
  fname TEXT,
  lname TEXT,
  role TEXT
);

CREATE TABLE requests(
  requestid SERIAL PRIMARY KEY,
  requesttitle TEXT,
  requestdescription TEXT,
  requestgrade INT,
  requestmakerid INT REFERENCES users(userid),
  requestimgcover TEXT,
  requestpdf TEXT,
  requestaudiopreview TEXT,
  requestfullfilled BOOLEAN
);