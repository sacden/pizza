import React from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Vše', 'S masem', 'Vegetarianské', 'Grill', 'Palivé', 'Se sýrem'];

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={activeIndex === index ? 'active' : ''}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;
