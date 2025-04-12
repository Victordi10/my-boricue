import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
        return NextResponse.json({ error: 'No se envió imagen' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

    try {
        await writeFile(filePath, buffer);
        const fileUrl = `/uploads/${fileName}`;

        // Acá podrías guardar en la base de datos el fileUrl
        // await db.insert({ imagen: fileUrl })

        return NextResponse.json({ message: 'Imagen subida con éxito', url: fileUrl });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 });
    }
}
