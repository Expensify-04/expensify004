// ProfileImage.tsx
import React from "react";
import {AvatarUrl} from "../../utils/ApiUrl";

interface ProfileImageProps {
  name: string; // Use the full name of the user to generate the avatar
  size?: number; // Optional size for the profile image
}

const ProfileImage: React.FC<ProfileImageProps> = ({name, size = 40}) => {
  // Construct the API URL using the provided name, background, and size.
  const avatarUrl = `${AvatarUrl}name=${encodeURIComponent(
    name
  )}&background=random&color=fff&size=${size}`;

  return (
    <img
      src={avatarUrl}
      alt="User pic"
      className="w-8 h-8 rounded-full"
      style={{width: size, height: size}}
    />
  );
};

export default ProfileImage;
