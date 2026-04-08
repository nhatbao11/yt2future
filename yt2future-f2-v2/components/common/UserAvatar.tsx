'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface UserAvatarProps {
  src?: string | null;
  name: string;
}

export const UserAvatar = ({ src, name }: UserAvatarProps) => {
  const [isError, setIsError] = useState(false);

  // Kiểm tra: Nếu có link ảnh và link đó không lỗi thì hiện ảnh User
  const showUserImg = src && src.trim() !== '' && !isError;

  return (
    <div className="w-10 h-10 relative flex-shrink-0 overflow-hidden rounded-full border border-slate-200 shadow-sm bg-white">
      {showUserImg ? (
        <Image
          src={src as string}
          alt={name}
          fill
          sizes="40px"
          className="object-cover"
          onError={() => setIsError(true)}
        />
      ) : (
        <Image src="/Logo.jpg" alt="YT Capital Logo" fill sizes="40px" className="object-cover" />
      )}
    </div>
  );
};
