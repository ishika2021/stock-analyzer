import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import "./styles.scss";

export default function DateRangePickerCalendarProp({ handleChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DateRangePicker", "DateRangePicker", "DateRangePicker"]}
      >
        <DemoItem component="DateRangePicker">
          <DateRangePicker
            calendars={1}
            minDate={dayjs("2024-11-15")}
            maxDate={dayjs("2024-11-19")}
            onChange={handleChange}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
