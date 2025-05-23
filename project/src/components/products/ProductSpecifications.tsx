import React from 'react';
import { FurnitureProduct } from '../../types/furniture';

interface ProductSpecificationsProps {
  product: FurnitureProduct;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ product }) => {
  const specifications = [
    { name: 'Dimensions', value: `W: ${product.dimensions?.width}cm × D: ${product.dimensions?.depth}cm × H: ${product.dimensions?.height}cm` },
    { name: 'Weight', value: `${product.weight || 'N/A'} kg` },
    { name: 'Material', value: product.material || 'Not specified' },
    { name: 'Colors Available', value: product.colors?.length ? product.colors.length.toString() : 'N/A' },
    { name: 'Assembly Required', value: product.assemblyRequired ? 'Yes' : 'No' },
    { name: 'Warranty', value: product.warranty || 'Standard 1-year warranty' },
    { name: 'Country of Origin', value: product.countryOfOrigin || 'India' },
  ];

  return (
    <div className="overflow-hidden">
      <table className="min-w-full divide-y divide-neutral-200">
        <tbody className="divide-y divide-neutral-200">
          {specifications.map((spec, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
              <td className="py-3 px-4 text-sm font-medium text-neutral-900 w-1/3">{spec.name}</td>
              <td className="py-3 px-4 text-sm text-neutral-700">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecifications;