import React from "react";
import AdSense from "react-adsense";

const Ad = () => (
  <div>
    <AdSense.Google
      client="ca-pub-1456592033372548"
      slot="5455089272"
      format="auto"
      responsive="true"
      style={{ display: "block" }}
    />
  </div>
);
export default Ad;
