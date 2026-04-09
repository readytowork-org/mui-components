import Typography, { type TypographyProps } from "@mui/material/Typography";
import type { FC } from "react";

interface PaginationRowsLabelProps extends TypographyProps {
  count: number;
  from: number;
  to: number;
}

const PaginationRowsLabel: FC<PaginationRowsLabelProps> = ({
  from,
  to,
  count,
  ...rest
}) => {
  return (
    <Typography
      component={"span"}
      {...rest}
      sx={{
        color: "#000000",
        fontSize: { xs: 14, sm: 16 },
        fontWeight: 400,
        textAlign: "center",
        ...rest.sx,
      }}
    >
      {`${count} 件, `}
      {from < 0 ? 0 : from}
      {"-"}
      {to < 0 ? 0 : to}
      {"件を表示"}
    </Typography>
  );
};

export default PaginationRowsLabel;
