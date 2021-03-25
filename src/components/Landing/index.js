import React, { useState } from "react";

import { DatePicker } from "@material-ui/pickers";

const Landing = () => {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div>
      <DatePicker
        variant="inline"
        label="Scegli la data"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default Landing;
