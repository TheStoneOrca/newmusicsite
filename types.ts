export type MusicRequest = {
  requestid: number;
  requesttitle: string;
  requestdescription: string;
  requestgrade: number;
  requestmakerid: number;
  requestimgcover: string;
  requestpdf: string;
  requestaudiopreview: string;
  requestfullfilled: string;
  userid?: number;
  email?: string;
  fname?: string;
  lname?: string;
};
