export async function POST(request: Request) {
  try {
    const apiKey = process.env.IMGBB_API_KEY;

    if (!apiKey) {
      return Response.json(
        { message: "ImgBB API key is missing." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return Response.json(
        { message: "Please select an image." },
        { status: 400 }
      );
    }

    if (!image.type.startsWith("image/")) {
      return Response.json(
        { message: "Only image files are allowed." },
        { status: 400 }
      );
    }

    const imgbbFormData = new FormData();
    imgbbFormData.append("image", image);

    const imgbbResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: imgbbFormData,
      }
    );

    const imgbbData = await imgbbResponse.json();

    if (!imgbbResponse.ok || !imgbbData.success) {
      return Response.json(
        { message: "Image upload failed." },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      imageUrl: imgbbData.data.url,
    });
  } catch (error) {
    console.error("Image upload error:", error);

    return Response.json(
      { message: "Something went wrong while uploading the image." },
      { status: 500 }
    );
  }
}