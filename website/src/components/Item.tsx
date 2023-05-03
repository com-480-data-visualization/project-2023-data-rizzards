import Sheet from "@mui/joy/Sheet";
import { styled } from "@mui/joy/styles";

export const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 10,
  color: theme.vars.palette.text.secondary,
}));
