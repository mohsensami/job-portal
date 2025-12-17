import {
  Box,
  Typography,
  MenuList,
  MenuItem,
  ListItemIcon,
  Paper,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";
import { LocationOn, FilterList, Category } from "@mui/icons-material";
import { Link } from "react-router-dom";
import SelectComponent from "../../../component/SelectComponent";

const FilterSidebar = ({ setUniqueLocation, handleChangeCategory, cat }) => {
  const theme = useTheme();

  return (
    <Box>
      {/* Category Filter */}
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          mt: 3,
          p: 3,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Category sx={{ color: theme.palette.primary.main }} />
          <Typography variant="p" sx={{ color: "#1a1a1a", fontWeight: 600 }}>
            فیلتر بر اساس دسته‌بندی
          </Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <SelectComponent
          handleChangeCategory={handleChangeCategory}
          cat={cat}
        />
      </Paper>

      {/* Location Filter */}
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          p: 3,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <LocationOn sx={{ color: theme.palette.primary.main }} />
          <Typography variant="p" sx={{ color: "#1a1a1a", fontWeight: 600 }}>
            فیلتر بر اساس موقعیت
          </Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <MenuList sx={{ p: 0 }}>
          {setUniqueLocation && setUniqueLocation.length > 0 ? (
            setUniqueLocation.map((location, i) => (
              <MenuItem
                key={i}
                component={Link}
                to={`/search/location/${location}`}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  "&:hover": {
                    bgcolor: theme.palette.primary.light + "10",
                  },
                }}
              >
                <ListItemIcon>
                  <LocationOn
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: 20,
                    }}
                  />
                </ListItemIcon>
                <Typography variant="body2">{location}</Typography>
              </MenuItem>
            ))
          ) : (
            <Typography variant="body2" sx={{ color: "#999", p: 2 }}>
              موقعیتی یافت نشد
            </Typography>
          )}
        </MenuList>
      </Paper>

      {/* Quick Stats */}
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          p: 3,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <FilterList sx={{ color: theme.palette.primary.main }} />
          <Typography variant="p" sx={{ color: "#1a1a1a", fontWeight: 600 }}>
            آمار سریع
          </Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
              موقعیت‌های فعال
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
              {setUniqueLocation?.length || 0} شهر
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default FilterSidebar;
