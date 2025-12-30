'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
        <Loader2 size={40} className="text-gray-700 animate-spin" />
        <p className="text-gray-700 font-medium">Generating your vision...</p>
      </div>
    </div>
  );
}

