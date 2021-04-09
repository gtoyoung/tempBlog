import React from "react";
import { Link } from "gatsby";
export default ({ headings }) => {
  if (headings.items) {
    return (
      <ul>
        {headings.items.map((item) => (
          <li key={item.title}>
            <Link to={item.url}>{item.title}</Link>
          </li>
        ))}
      </ul>
    );
  } else {
    return <div>없음</div>;
  }
};
