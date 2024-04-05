export type MusicRequest = {
  requestid?: number;
  requesttitle?: string;
  requestdescription?: string;
  requestgrade?: number;
  requestmakerid?: number;
  requestimgcover?: string;
  requestpdf?: string;
  requestaudiopreview?: string;
  requestfullfilled?: string;
  userid?: number;
  email?: string;
  fname?: string;
  lname?: string;
  requestprice?: number;
};

export type Piece = {
  pieceid?: number;
  piecetitle?: string;
  piecedescription?: string;
  piecegrade?: number;
  pieceowner: string;
  piececover: string;
  piecepreviewpdf: string;
  piecepdf: string;
  pieceaudio: string;
  pieceprice: number;
  piecetype: "strings" | "band" | "solo" | "piano" | "rock" | "orchestra";
  userid?: number;
  email?: string;
  fname?: string;
  lname?: string;
};

export type BoughtItem = {
  buyer: number;
  boughtitem: number;
  boughtitemid: number;
  pieceid?: number;
  piecetitle?: string;
  piecedescription?: string;
  piecegrade?: number;
  pieceowner: string;
  piececover: string;
  piecepreviewpdf: string;
  piecepdf: string;
  pieceaudio: string;
  pieceprice: number;
  piecetype: "strings" | "band" | "solo" | "piano" | "rock" | "orchestra";
  userid?: number;
  email?: string;
  fname?: string;
  lname?: string;
};
