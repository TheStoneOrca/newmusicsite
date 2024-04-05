CREATE TABLE users(
  userid SERIAL PRIMARY KEY,
  email TEXT UNIQUE,
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
  requestfullfilled BOOLEAN,
  requestprice MONEY
);

CREATE TABLE pieces(
  pieceid SERIAL PRIMARY KEY,
  piecetitle TEXT,
  piecedescription TEXT,
  piecegrade INT,
  pieceowner TEXT REFERENCES users(email),
  piececover TEXT,
  piecepreviewpdf TEXT,
  piecepdf TEXT,
  pieceaudio TEXT,
  pieceprice MONEY,
  piecetype TEXT
);

CREATE TABLE cartitems(
  itemid SERIAL PRIMARY KEY,
  itempiece INT REFERENCES pieces(pieceid),
  itemowner INT REFERENCES users(userid)
);

CREATE TABLE boughtitems(
  boughtitemid SERIAL PRIMARY KEY,
  boughtitem INT REFERENCES pieces(pieceid),
  buyer INT REFERENCES users(userid)
)