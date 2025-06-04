import React from "react";
import { Inbox, Settings, RefreshCw, HelpCircle } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Inbox className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">
            Where are my Email
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 focus:outline-none"
            title="Refresh"
          >
            <RefreshCw className="h-5 w-5" />
          </button>

          <button
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 focus:outline-none"
            title="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </button>

          <button
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 focus:outline-none"
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>

          <div className="ml-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              U
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
