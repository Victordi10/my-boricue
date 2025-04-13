import { errorResponse, successResponse, handleImageUpload, eliminarImgAnterior, eliminarImagen} from "@/utils/handler";
import { getProductosUser, crearProducto, editProducto, deleteProducto, getUrlImgProducto } from "@/lib/models/productosModel";
import { authMiddleware } from "@/middleware/authMiddleware";
import path from 'path';



const getCommonFormData = async (formData, requireId = false) => {
    const data = {
        idProducto: formData.get('idProducto'),
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        tipo: formData.get('tipo'),
        categoria: formData.get('categoria'),
        precio: formData.get('precio'),
        imagenActual: formData.get('imagenActual'),
        file: formData.get('imagen'),
    };

    // Validación básica
    if (!data.nombre  || !data.tipo || !data.categoria || (requireId && !data.idProducto)) {
        throw errorResponse("Faltan campos obligatorios", 400);
    }

    if (data.categoria === 'Venta' && !data.precio) {
        throw errorResponse("Debes especificar un precio para venta", 400);
    }

    return data;
};



const formatPrecio = (categoria, precio) => {
    if (categoria === 'Intercambio') return 'CAMBIO';
    if (categoria === 'Donacion') return 'GRATIS';
    if (categoria === 'Venta') return `${precio}`;
    return precio;
};


const getHandler = async (req, context) => {
    try {
        const { params } = context
        const userId = params.id; // 👈 token ya decodificado gracias al middleware

        if (!userId) {
            return errorResponse('No se pudo obtener el ID del usuario', 400);
        }

        const productos = await getProductosUser(userId);

        return successResponse('Productos cargados correctamente', productos);
    } catch (error) {
        console.error(error);
        return errorResponse("Error al cargar los productos", 500);
    }
};


const postHandler = async (req, context) => {
    try {
        const formData = await req.formData();
        const { params } = context
        const userId = params.id;
        if (!userId) return errorResponse("Faltan parámetros necesarios", 400);

        const {
            nombre, descripcion, tipo, categoria, precio, file
        } = await getCommonFormData(formData);

        const imageUrl = await handleImageUpload(file);
        const precioFinal = formatPrecio(categoria, precio);
        const fecha = new Date();

        const producto = await crearProducto(imageUrl, nombre, descripcion, tipo, categoria, precioFinal, fecha, userId);
        return successResponse('Producto creado con éxito', producto);
    } catch (error) {
        console.error(error);
        return errorResponse("Error al crear el producto", 500);
    }
};


const putHandler = async (req, context) => {
    try {
        const { params } = context
        const formData = await req.formData();
        const userId = params.id;
        if (!userId) return errorResponse("Faltan parámetros necesarios", 400);

        const {
            idProducto, nombre, descripcion, tipo, categoria, precio, file, imagenActual
        } = await getCommonFormData(formData, true);

        const imageUrl = await handleImageUpload(file);

        const imagenFinal = await eliminarImgAnterior(imageUrl, imagenActual)

        const precioFinal = formatPrecio(categoria, precio);
        const fecha = new Date();

        const result = await editProducto({
            idProducto,
            imagen: imagenFinal,
            nombre,
            descripcion,
            tipo,
            categoria,
            precio: precioFinal,
            fecha,
        });

        return successResponse('Producto editado con éxito', result);
    } catch (error) {
        console.error(error);
        return errorResponse("Error al editar el producto", 500);
    }
};

const deleteHandler = async (req, { params }) => {
    try {
        const userId = params.id;
        if (!userId) return errorResponse("Faltan parámetros necesarios", 400);

        const { productId } = await req.json();
        if (!productId) return errorResponse("Falta el ID del producto a eliminar", 400);

        const { imagen } = await getUrlImgProducto(productId, userId);
        await eliminarImagen(imagen);

        const result = await deleteProducto(userId, productId);

        return successResponse("Producto eliminado correctamente", result);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        return errorResponse("Error interno al intentar eliminar el producto", 500);
    }
};



export const GET = authMiddleware(getHandler); // 👈 ¡Así se aplica el middleware!
export const POST = authMiddleware(postHandler)
export const PUT = authMiddleware(putHandler)
export const DELETE = authMiddleware(deleteHandler)