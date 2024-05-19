interface CloudinaryImageResource {
  public_id: string;
  secure_url: string;
  folder?: string;
}

export async function GET() {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const authString = btoa(`${apiKey}:${apiSecret}`);
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?max_results=500`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
      next: {
        revalidate: 3600, // 1h
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching images: ${response.status}`);
    }

    const data = await response.json();

    const imageData = data.resources
      .filter((resource: CloudinaryImageResource) => resource.folder)
      .map((resource: CloudinaryImageResource) => ({
        url: resource.secure_url,
        folder: resource.folder,
      }));

    return new Response(JSON.stringify(imageData), { status: 200 });
  } catch (error: any) {
    console.error("Error fetching Cloudinary images:", error);
    return new Response("Error fetching images", { status: 500 });
  }
}
