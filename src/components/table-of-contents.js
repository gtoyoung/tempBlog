import React from "react";
import { Link } from "gatsby";

import { useActiveHash } from "../hook/use-active-hash";

const getHeadingIds = (toc, traverseFullDepth = true, recursionDepth = 1) => {
  const idList = [];
  const hashToId = (str) => str.slice(1);

  if (toc) {
    for (const item of toc) {
      if (item.url) {
        idList.push(hashToId(item.url));
      }
      if (item.items && traverseFullDepth && recursionDepth) {
        // 재귀적인 items 를 하나의 리스트로 Push 한다.
        // return 이 idList 로  ...function 이 잘 동작한다!
        idList.push(...getHeadingIds(item.items, true, recursionDepth + 1));
      }
    }
  }
  return idList;
};

function createItems(toc, activeHash, ulStyle) {
  const tocs = toc[0];
  return (
    tocs &&
    tocs.map((item, index) => {
      const isActive = item.url === `#${activeHash}`;
      return (
        <li key={item.url}>
          {item.url && (
            <Link
              to={item.url}
              style={isActive ? { fontWeight: "bold" } : {}}
              // isActive 인지 확인하여 'bold' 할지 말지 결정한다.
            >
              😉{item.title}
            </Link>
          )}
          {/* //item.items 가 list 이니 마찬가지로 재귀적으로 풀어 ul을 render 한다. */}
          {tocs.items && (
            <ul style={ulStyle}>
              {createItems(item.items, activeHash, ulStyle)}
            </ul>
          )}
        </li>
      );
    })
  );
}

function TableOfContents({ items }) {
  const toc = Object.values(items);
  const activeHash = useActiveHash(getHeadingIds(toc[0], true));
  const ulStyle = {
    listStyleType: "none",
    margin: "0 0 10 0",
    padding: 0,
    paddingInlineStart: ".5rem",
    marginBlockStart: ".3rem",
    marginBlockEnd: ".3rem",
    marginLeft: ".5rem",
    "&:hover": {
      fontWeight: "bold",
    },
  };

  return toc.length > 0 ? (
    <nav>
      <h2>목차</h2>
      <ul style={ulStyle}>{createItems(toc, activeHash, ulStyle)}</ul>
    </nav>
  ) : null;
}

export default TableOfContents;
