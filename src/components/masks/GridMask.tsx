import React from 'react';
const GridMask = () => {
  return (
    <div
      className="h-full w-full pointer-events-none fixed inset-0 
             bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
             bg-[size:96px_96px]
             mask-radial-at-center mask-radial-from-0% mask-radial-to-100% 
             [mask-mode:match-source]
             [mask-repeat:no-repeat]"></div>
  );
};

export default GridMask;
