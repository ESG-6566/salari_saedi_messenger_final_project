import React from 'react'
import { Hypnosis } from "react-cssfx-loading";
import styled from 'styled-components';

export default function Loading() {
  return (
    <div>
      <Hypnosis color="#FFA62B" width="250px" height="250px" duration="3s" />
    </div>
  )
}
