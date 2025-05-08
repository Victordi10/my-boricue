// src/components/ProductFilter.jsx
import { Search, X, Filter } from 'lucide-react';

const ProductFilter = ({
    searchTerm,
    selectedCategory,
    selectedMaterial,
    onSearchChange,
    onCategoryChange,
    onMaterialChange,
    onClearFilters,
    categories,
    materials
}) => {
    const hasActiveFilters = searchTerm || selectedCategory || selectedMaterial;

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search input */}
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-dos focus:border-transparent"
                            placeholder="Buscar materiales, residuos..."
                        />
                        {searchTerm && (
                            <button
                                onClick={() => onSearchChange('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Category filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dos focus:border-transparent"
                    >
                        {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>

                    {/* Material filter */}
                    <select
                        value={selectedMaterial}
                        onChange={(e) => onMaterialChange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dos focus:border-transparent"
                    >
                        {materials.map((material) => (
                            <option key={material.value} value={material.value}>
                                {material.label}
                            </option>
                        ))}
                    </select>

                    {/* Clear filters button */}
                    {hasActiveFilters && (
                        <button
                            onClick={onClearFilters}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
                        >
                            <X className="h-4 w-4 mr-1" />
                            Limpiar filtros
                        </button>
                    )}
                </div>

                {/* Active filters display */}
                {hasActiveFilters && (
                    <div className="mt-4 flex flex-wrap gap-2 items-center">
                        <span className="text-sm text-gray-500 flex items-center">
                            <Filter className="h-4 w-4 mr-1" /> Filtros activos:
                        </span>

                        {searchTerm && (
                            <span className="px-2 py-1 bg-gray-100 text-sm rounded-md flex items-center">
                                Búsqueda: {searchTerm}
                                <button onClick={() => onSearchChange('')} className="ml-1 text-gray-500 hover:text-gray-700">
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}

                        {selectedCategory && (
                            <span className="px-2 py-1 bg-gray-100 text-sm rounded-md flex items-center">
                                Categoría: {categories.find(c => c.value === selectedCategory)?.label}
                                <button onClick={() => onCategoryChange('')} className="ml-1 text-gray-500 hover:text-gray-700">
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}

                        {selectedMaterial && (
                            <span className="px-2 py-1 bg-gray-100 text-sm rounded-md flex items-center">
                                Material: {materials.find(m => m.value === selectedMaterial)?.label}
                                <button onClick={() => onMaterialChange('')} className="ml-1 text-gray-500 hover:text-gray-700">
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductFilter;