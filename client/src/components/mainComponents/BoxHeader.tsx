import { Box, Typography } from "@mui/material";
import FlexBetween from "../stylingComponents/FlexBetween";
import { useTheme } from "@mui/material/styles";

type Props = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  sideText?: string;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h4" mb="-0.1rem" ml="1rem">
            {title}
          </Typography>
          <Typography variant="h5" ml="1rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <Typography variant="h5" fontWeight="700" color={palette.secondary[500]}>
        {sideText}
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;
