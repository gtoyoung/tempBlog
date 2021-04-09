import React from "react";
import randomColor from "randomcolor";
import TagCloud from "react-tag-cloud";
import "./cloud-tag.css";
import { useEffect } from "react";
import { useState } from "react";

const styles = {
  large: {
    fontSize: 60,
    fontWeight: "bold",
  },
  small: {
    opacity: 0.7,
    fontSize: 16,
  },
};

function CloudTag({ tags }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 10000);
  }, [count]);
  return (
    <div className="app-outer">
      <div className="app-inner">
        <TagCloud
          className="tag-cloud"
          style={{
            fontFamily: "sans-serif",
            //fontSize: () => Math.round(Math.random() * 50) + 16,
            fontSize: 15,
            color: () =>
              randomColor({
                hue: "blue",
              }),
            padding: 5,
          }}
        >
          {tags.map((tag, index) => {
            return (
              <div
                style={{
                  fontFamily: "serif",
                  fontSize: 40,
                  fontStyle: "italic",
                  fontWeight: "bold",
                  color: randomColor(),
                }}
              >
                {tag}
              </div>
            );
          })}
        </TagCloud>
      </div>
    </div>
  );
}

export default CloudTag;
