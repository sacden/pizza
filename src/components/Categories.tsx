import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (id: number) => void;
};
const categories = ['Vše', 'S masem', 'Vegetarianské', 'Grill', 'Palivé', 'Se sýrem'];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categories;
