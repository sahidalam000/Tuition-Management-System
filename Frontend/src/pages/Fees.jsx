import React from "react"

import FeesPreview from "../components/FeesPreview"
import ScienceFeesPreview from "../components/ScienceFeesPreview"

const Fees = () => {

  return (

    <div className="bg-[#020617]">

      {/* 🔥 Mathematics */}
      <FeesPreview />

      {/* 🔥 Science */}
      <ScienceFeesPreview />

    </div>

  )
}

export default Fees