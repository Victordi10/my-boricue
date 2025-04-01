'use client'

export default function ShowMensaje({ mensaje, isError = false }) {
    return (
        <>
            {mensaje && (
                <div className={`border-l-4 ${isError ? 'bg-red-50  border-red-500' : 'text-gray-700 border-green-500'} p-4 rounded`}>
                    <p className={`text-sm ${isError ? 'text-red-600' : 'text-gray-700'}`}>{mensaje}</p>
                </div>
            )}
        </>
    );
}