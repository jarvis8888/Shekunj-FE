import Cookies from "js-cookie";
import JwtDecode from "jwt-decode";
import moment from "moment";
import { toast } from "react-toastify";
import i18njs from "../assets/i18n/i18n";
import { routingConstants } from "./constants";
import axios from "axios";

export const toasterConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};

export const transformError = (error) => {
  const err = {
    statusCode: 500,
    message: i18njs.t("error.other.9"),
    data: {},
  };
  if (error && error.data && error.data.statusCode) {
    const data = error.data;
    err.statusCode = data.statusCode || 500;
    err.message = data.message || i18njs.t("error.other.9");
    err.data = data.data || {};
  } else {
    if (error && error.response) {
      const { data } = error.response;
      err.statusCode = data.statusCode || 500;
      err.message = data.message || i18njs.t("error.other.9");
      err.data = data.data || {};
    }
  }
  return err;
};

export const isAuthenticated = () => {
  const token = Cookies.get("sheToken");
  if (!token) {
    return false;
  }
  const userInfo = decodeToken(token);
  if (userInfo && !checkIsSessionExpired(userInfo?.exp)) {
    return true;
  }
  return false;
};

export const checkIsValidImage = (file) => {
  const filetypes = /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/;
  if (!file.name.match(filetypes)) {
    toast.error(i18njs.t("error.other.3"));
    return false;
  }
  return true;
};

export const decodeToken = (token) => JwtDecode(token);

export const checkIsSessionExpired = (tokenExpiry = 0) => {
  const currentTime = new Date().getTime();
  const tokenExpireTime = new Date((tokenExpiry - 10) * 1000).getTime();
  if (currentTime > tokenExpireTime) {
    return true;
  } else {
    return false;
  }
};

export function toFixedDown(number, digits = 0) {
  const numberString = (number || 0).toFixed(10);
  const re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
    m = numberString.match(re);
  const result = m ? parseFloat(m[1]) : parseFloat(numberString).valueOf();
  return number >= 0 ? result : -1 * result;
}

export function onKeyPressAllowNumbers(e, val) {
  if (
    [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
    // Allow: Ctrl+A
    (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
    // Allow: Ctrl+C
    (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
    // Allow: Ctrl+X
    (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
    // Allow: home, end, left, right
    (e.keyCode >= 35 && e.keyCode <= 39)
  ) {
    // let it happen, don't do anything
    if (e.keyCode === 46 && val.indexOf(".") === -1) return;
  }
  // Ensure that it is a number and stop the keypress & do not allow multiple points
  if (e.keyCode < 48 || e.keyCode > 57) {
    e.preventDefault();
  }
}

export function handleErrorMessage(err) {
  let errorMessage = i18njs.t("error.other.9");

  if (err.status === 401) {
    errorMessage = i18njs.t("error.other.7");
    return errorMessage;
  }

  if (err.error) {
    delete err.error.status;
    if (err.error.message) {
      errorMessage = err.error.message;
    } else if (Array.isArray(err.error[Object.keys(err.error)[0]])) {
      errorMessage = err.error[Object.keys(err.error)[0]][0];
    } else {
      errorMessage = err.error[Object.keys(err.error)[0]];
    }
  } else if (err.message) {
    errorMessage = err.message;
  } else if (Array.isArray(err[Object.keys(err)[0]])) {
    errorMessage = err[Object.keys(err)[0]][0];
  } else if (err.data && typeof err.data === "string") {
    errorMessage = err.statusText;
  } else if (err[Object.keys(err)[0]]) {
    errorMessage = err[Object.keys(err)[0]];
  }

  if (errorMessage === "true" || typeof errorMessage !== "string") {
    if (err.status && err.status >= 200 && err.status < 300) {
      errorMessage = "success";
    } else {
      errorMessage = i18njs.t("error.other.9");
    }
  }

  return errorMessage;
}

export function formatLocalTime(date) {
  return moment.utc(date).local();
}

export function calendarDate(date) {
  const newDate = this.formatLocalTime(date);
  return moment(newDate).calendar(null, {
    sameDay: "HH:mm",
    nextDay: `[tomorrow]`,
    lastDay: `[yesterday]`,
    lastWeek: "MM/DD",
    nextWeek: "MM/DD",
    sameElse: "MM/DD",
  });
}

export function timeFromNow(time) {
  const newDate = this.formatLocalTime(time);
  return moment(newDate).fromNow();
}

export function formatDate(date = null, format = "DD-MM-YYYY") {
  return date ? moment(date).format(format) : i18njs.t("common.n/a");
}

export function formatTime(date = null) {
  return date
    ? {
        hour: moment(date).format("HH") + i18njs.t("common.time.8"),
        minute: moment(date).format("mm") + i18njs.t("common.time.2"),
      }
    : { hour: null, minute: null };
}

export function truncate(source, size) {
  return source?.length > size ? source?.slice(0, size - 1) + "…" : source;
}

export function addNewlines(str, isElippse = false, length = 15) {
  let result = "";
  if (isElippse && str?.length > length) {
    return str.slice(0, length - 1) + "…";
  }
  while (str?.length > 0) {
    result += str?.substring(0, length) + "\n";
    str = str?.substring(length);
  }
  return result;
}

export function timeDifferenceFromDates(sDate, eDate) {
  const startDate = moment(sDate);
  const endDate = moment(eDate);
  return sDate && eDate
    ? {
        hour: endDate.diff(startDate, "hour") + i18njs.t("common.time.8"),
        minute: endDate.diff(startDate, "minute") + i18njs.t("common.time.2"),
      }
    : { hour: null, minute: null };
}

export const removeUnauthorizedUser = () => {
  Cookies.remove("sheToken");
  localStorage.removeItem("login_data");
  localStorage.removeItem("event_data");

  toast.error(i18njs.t("error.other.8"));
  window.location.href = routingConstants.LOGIN;
};

export const sliceString = (str) => {
  if (str.length <= 300) {
    return str;
  }
  return `${str?.slice(0, 300)}...`;
};

export const paragraph = (text) => {
  let lines = text;
  // return lines?.length > 0 ? text.filter((o) => o !== `\r\n` || o !== "") : [];
  return lines?.length > 0 && typeof (text === "string")
    ? text
    : text.filter((o) => o !== `\r\n` || o !== "");
};

export async function convertRelativeUriToFile(
  filePath,
  fileName,
  mimeType,
  cb,
) {
  mimeType =
    mimeType || `image/${filePath.split(".")[filePath.split(".").length - 1]}`;
  const imageUrl = await fetch(filePath, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
  });
  const buffer = await imageUrl.arrayBuffer();
  cb(new File([buffer], fileName, { type: mimeType }));
}

export function truncateString(str, len) {
  if (str.length > len) {
    return str.slice(0, len) + "...";
  } else {
    return str;
  }
}

export function time_left(start_date, start_time, end_date, end_time) {
  if (!start_date || !start_time || !end_date || !end_time) {
    return "";
  }

  const start = new Date(start_date + " " + start_time);
  const end = new Date(end_date + " " + end_time);
  const delta = end - new Date();
  const days = Math.floor(delta / (24 * 60 * 60 * 1000));
  const hours = Math.floor((delta % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((delta % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((delta % (60 * 1000)) / 1000);

  const formatter = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const [month, day, year, time, meridiem] = formatter.format(start).split(" ");
  const [endmonth, endday, endyear, endtime, endmeridiem] = formatter
    .format(end)
    .split(" ");
  return `${day} ${month} ${year} - ${endday} ${endmonth} ${endyear} <div class="event-time">${time} ${meridiem.toUpperCase()} - ${endtime} ${endmeridiem.toUpperCase()}<div/>`.replace(
    /,/g,
    "",
  );
}

export const makeHtml = (htmlString) => {
  const htmlNode = document.createElement("div");
  htmlNode.innerHTML = htmlString;
  htmlNode.querySelectorAll("*").forEach(function (node) {
    node.removeAttribute("style");
  });
  return htmlNode.innerHTML;
};

export function DateFormat(timestampStr) {
  const timestamp = new Date(timestampStr);

  const day = timestamp.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[timestamp.getMonth()];
  const year = timestamp.getFullYear().toString().slice(-2);

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}

export const addEmailToClient = async (email) => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;

    const response = await axios.post("/private_adds/click_add/", {
      add_email: email,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    });

    console.log("addEmail response", response);
  } catch (error) {
    console.error(error);
  }
};

const formatTimeString = (timeString, options) => {
  const [hours, minutes, seconds] = timeString.split(":");
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  return date.toLocaleTimeString("en-US", options);
};

export const formatTimeRange = (startTime, endTime) => {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedStartTime = formatTimeString(startTime, options);
  const formattedEndTime = formatTimeString(endTime, options);

  return `${formattedStartTime} - ${formattedEndTime}`;
};

const getMonthString = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = parseInt(date.split("-")[1], 10) - 1;
  return months[monthIndex];
};

const getDayString = (date) => {
  const day = parseInt(date.split("-")[2], 10);
  return day.toString();
};

export const formatDateRange = (startDate, endDate) => {
  const startMonth = getMonthString(startDate);
  const startDay = getDayString(startDate);
  const endMonth = getMonthString(endDate);
  const endDay = getDayString(endDate);

  const html = `<h6>${startMonth}</h6><h3>${startDay}</h3>`;
  return html;
};

export function addHyphensToLink(link) {
  const decodedLink = decodeURIComponent(link);
  return decodedLink.replace(/\s/g, "-");
}

export const blockInvalidChar = (e) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

const predefinedColors = [
  "#7D1935",
  "#CD1818",
  "#FEB322",
  "#F24C3D",
  "#538F17",
  "#F3C316",
  "#2CBE66",
  "#4323DC",
  "#19A7CE",
  "#2362DC",
  "#4E89EC",
  "#810CA8",
  "#8C47D9",
  "#CA358E",
  "#3CB371",
  "#A80C6A",
  "#D2691E",
];
export function assignColorToCategory(
  categoryData,
  colorCodes = predefinedColors,
) {
  const uniqueCategories = [...new Set(categoryData)];
  const categoryColorMap = {};

  uniqueCategories.forEach((category, index) => {
    const colorIndex = index % colorCodes.length;
    categoryColorMap[category] = colorCodes[colorIndex];
  });

  return (category) => categoryColorMap[category];
}

export function removeHtmlTags(htmlString) {
  // Remove HTML tags and inline styles using regex
  var cleanText = htmlString.replace(/<[^>]+>|style\s*=\s*"[^"]*"/g, "");
  return cleanText;
}

export function generateSlug(title) {
  const slug = title
    .toLowerCase() // Convert to lowercase
    .normalize("NFD") // Normalize diacritic characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritic characters
    .replace(/[^\w-]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/--+/g, "-") // Remove consecutive hyphens
    .replace(/^-|-$/g, ""); // Remove leading and trailing hyphens
  return slug;
}
