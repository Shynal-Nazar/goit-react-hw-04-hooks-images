import React from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = () => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        css={override}
        size={150}
        color={'#123abc'}
        loading={true}
        speedMultiplier={1.5}
      />
    </div>
  );
};
export default Loader;
