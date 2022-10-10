import { Skeleton, Typography, TypographyProps } from "@mui/material";

interface AsyncTypographyProps extends TypographyProps {
  loading: boolean;
}

export default function AsyncTypography(props: AsyncTypographyProps) {
  const { loading, children, ...rest } = props;
  return <Typography {...rest}>{loading ? <Skeleton variant="rounded" /> : children}</Typography>;
}
