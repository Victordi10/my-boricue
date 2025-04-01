'use client'

export default function ShowMensaje({ mensaje, isError }) {
    return (
        <div className="flex flex-col items-center justify-center p-2 bg-red-100 rounded-lg border border-red-200 shadow-sm">
            <p className={`text-lg ${isError ? 'text-red-600' : 'text-gray-700'}`}>{mensaje}</p>
        </div>
    );
}