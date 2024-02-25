"use server";

export default async function HandlePostSubmit(data: FormData) {
  try {
    const coverImgFormData = new FormData();
    coverImgFormData.append("file", data.get("coverimg") as string);
    coverImgFormData.append("upload_preset", "n3gm5qgo");

    const previewPdfFormData = new FormData();
    previewPdfFormData.append("file", data.get("previewpdf") as string);
    previewPdfFormData.append("upload_preset", "n3gm5qgo");

    const pdfFormData = new FormData();
    pdfFormData.append("file", data.get("pdf") as string);
    pdfFormData.append("upload_preset", "n3gm5qgo");

    const audioFormData = new FormData();
    audioFormData.append("file", data.get("audio") as string);
    audioFormData.append("upload_preset", "n3gm5qgo");

    const sendCoverImg = await fetch(
      "https://api.cloudinary.com/v1_1/dnslox6ni/image/upload",
      {
        method: "POST",
        body: coverImgFormData,
      }
    );

    const sendPDF = await fetch(
      "https://api.cloudinary.com/v1_1/dnslox6ni/image/upload",
      {
        method: "POST",
        body: pdfFormData,
      }
    );

    const sendPreviewPDF = await fetch(
      "https://api.cloudinary.com/v1_1/dnslox6ni/image/upload",
      {
        method: "POST",
        body: pdfFormData,
      }
    );

    const sendAudio = await fetch(
      "https://api.cloudinary.com/v1_1/dnslox6ni/video/upload",
      {
        method: "POST",
        body: audioFormData,
      }
    );

    const coverImg = await sendCoverImg.json();
    const pdf = await sendPDF.json();
    const audio = await sendAudio.json();
    const previewpdf = await sendPreviewPDF.json();

    const request = {
      title: data.get("title"),
      description: data.get("desc"),
      grade: Number(data.get("grade")),
      coverImg: coverImg.secure_url,
      pdf: pdf.secure_url,
      previewpdf: previewpdf.secure_url,
      audio: audio.secure_url,
      email: data.get("email"),
      price: Number(data.get("price")),
    };

    const fetchRequestPost = await fetch(`${process.env.DOMAIN}/api/post`, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const fetchResult = await fetchRequestPost.json();

    if (fetchResult.status === 200) {
      return { success: true };
    } else {
      return { resultmsg: fetchResult.msg, error: true };
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
