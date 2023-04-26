import { useTheme } from "@emotion/react";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { tokens } from "../theme";

function ProfileCard({ name, profile, subtitle }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box
        sx={{
          maxWidth: "15rem",
          minWidth: "15rem",
          maxHeight: "16rem",
          minHeight: "16rem",
          bgcolor: colors.primary[400],
          display: 'flex',
          flexDirection:'column',
          alignItems:'center',
          textAlign:'center',
          p:'1rem 2rem',
        }}
      >
        <img
          alt="profile-user"
          width="150px"
          height="150px"
          loading="lazy"
          src={profile}
          style={{ cursor: "pointer", borderRadius: "50%", marginBottom:'1rem' }}
        />
        <Typography variant="h4">
            {name}
        </Typography>
        <Typography variant="h5" color={colors.grey[400]} >
            {subtitle}
        </Typography>

      </Box>
    </>
  );
}

export default ProfileCard;
