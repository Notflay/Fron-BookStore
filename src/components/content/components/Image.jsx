import React, { useEffect, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Image = ({ img, rating }) => {
  const [active, setActive] = useState(true);

  function getStar() {
    const starIcon = `
    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root editIcon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="StarIcon">
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z">
    </path>
    </svg>`;

    const starBorderIcon = `
    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root editIcon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="StarBorderIcon">
    <path d="m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" >
    </path>
    </svg>`;

    if (active) {
      for (let i = 0; i < 5; i++) {
        if (i >= rating) {
          document.getElementById("star").innerHTML += starBorderIcon;
        } else {
          document.getElementById("star").innerHTML += starIcon;
        }
      }
    }
    setActive(false);
  }

  useEffect(() => {
    getStar();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <img src={img} style={{ width: "100%" }} alt="book-info" />
      <div id="star" style={{ marginLeft: "60px" }}>
        <StarBorderIcon hidden></StarBorderIcon>
      </div>
    </div>
  );
};

export default Image;
