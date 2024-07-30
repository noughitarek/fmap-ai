import React from 'react';

interface PaginationInfoProps {
  start: number;
  end: number;
  total: number;
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({ start, end, total }) => {
  return (
    <div className="hidden xl:block mx-auto text-slate-500">
        Showing {start} to {end} on {total} entries
    </div>
  );
};

export default PaginationInfo;
