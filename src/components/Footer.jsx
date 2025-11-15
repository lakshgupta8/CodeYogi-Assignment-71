import { memo } from "react";

function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-4 px-2 relative bottom-0 w-full">
      <div
        className=" flex items-center justify-between
        mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
        <p className="text-xs">Copyright © 2025 | CodeYogi</p>
        <p className="text-xs">Powered by CodeYogi</p>
      </div>
    </footer>
  );
}

export default memo(Footer);
