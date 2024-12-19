import React from 'react';
import { FaFilter } from 'react-icons/fa';

const RightSidebar = () => {
    return (
        <div>
            <div className="bg-[#FCD367] text-black py-10 px-4">

          <ul className="menu">
            <li className="font-medium text-md font-cinzel">
              <button>
                <FaFilter /> Price Range
              </button>
              {/* Add filter controls here */}
            </li>
            <li className="font-medium text-md font-cinzel">
              <button>
                <FaFilter /> Brand
              </button>
              {/* Add brand filter here */}
            </li>
            <li className="font-medium text-md font-cinzel">
              <button>
                <FaFilter /> Ratings
              </button>
              {/* Add rating filter here */}
            </li>
            <li className="font-medium text-md font-cinzel">
              <button>
                <FaFilter /> Availability
              </button>
              {/* Add availability filter here */}
            </li>
          </ul>
        </div>
        </div>
    );
};

export default RightSidebar;