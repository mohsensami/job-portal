import { Stack, Typography, Paper, Divider, IconButton } from "@mui/material";

const ShareCard = () => {
  const socialNetworks = [
    {
      name: "Facebook",
      bgcolor: "#1877f2",
      hoverColor: "#1565c0",
      label: "f",
    },
    {
      name: "Twitter",
      bgcolor: "#1da1f2",
      hoverColor: "#0d8bd9",
      label: "t",
    },
    {
      name: "LinkedIn",
      bgcolor: "#0077b5",
      hoverColor: "#005885",
      label: "in",
    },
  ];

  const handleShare = (network) => {
    const url = window.location.href;
    const title = document.title;

    switch (network) {
      case "Facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "Twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "LinkedIn":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        p: 3,
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 2, color: "#1a1a1a" }}
      >
        اشتراک‌گذاری
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack direction="row" spacing={2} justifyContent="center">
        {socialNetworks.map((network) => (
          <IconButton
            key={network.name}
            onClick={() => handleShare(network.name)}
            sx={{
              bgcolor: network.bgcolor,
              color: "white",
              "&:hover": { bgcolor: network.hoverColor },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {network.label}
            </Typography>
          </IconButton>
        ))}
      </Stack>
    </Paper>
  );
};

export default ShareCard;
