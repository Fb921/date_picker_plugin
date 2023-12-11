'use strict';

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".App{text-align:center}.App-logo{height:40vmin;pointer-events:none}@media (prefers-reduced-motion:no-preference){.App-logo{animation:App-logo-spin 20s linear infinite}}.App-header{align-items:center;background-color:#282c34;color:#fff;display:flex;flex-direction:column;font-size:calc(10px + 2vmin);justify-content:center;min-height:100vh}.App-link{color:#61dafb}@keyframes App-logo-spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.date-selector_container{background:#fff;box-shadow:0 0 10px 0 #00000010;max-width:210px;min-width:210px;position:absolute;width:210px;z-index:100}.date-selector_container .date-selector_header{display:flex;justify-content:space-between;padding:5px}.date-selector_container .day_name{background:#f1f1f1;border-bottom:1px solid #ddd;border-right:1px solid #ddd;color:#999;font-size:13px;line-height:25px}.date-selector_container div:nth-child(7n){border-right:none!important}.date-selector_container .day_element{border-bottom:1px solid #ddd;border-right:1px solid #ddd;box-sizing:border-box;color:#00000030;cursor:pointer;font-size:12px;line-height:23px;padding:1px 3px;width:100%}.date-selector_container .day_element:hover{background:#007fff20}.date-selector_container .day_element.current{color:#000}.date-selector_container .month_container{display:inline-block;text-align:center;width:95px}.date-selector_container .calendar_container{display:grid;grid-template-columns:30px 30px 30px 30px 30px 30px 30px;margin-top:5px;max-width:210px}.date-selector_container .date-selector_arrow{cursor:pointer;display:inline-block;margin:0 10px}.date-selector_container select{cursor:pointer}.date-selector_container .date-selector_arrow.left{margin-left:5px}.date-selector_container .date-selector_arrow.right{margin-right:5px}.date-picker_input{box-sizing:border-box;cursor:pointer!important;width:100%}";
styleInject(css_248z);

//Ajouter un formateur de date
//Ajouter un gestionnaire de langues
// Date format : MM/DD/YYYY -> mois commun
function is_valid_date(dd) {
  let date = new Date(dd);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  day = parseInt(day);
  month = parseInt(month);
  let d = month + "/" + day + "/" + date.getFullYear();
  return dd == d;
}
function DatePicker({
  id,
  name,
  dateSetter
}) {
  let last_days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  let now = new Date();
  const [month, setMonth] = React__default["default"].useState(now.getMonth());
  const [year, setYear] = React__default["default"].useState(now.getFullYear());
  const [calendar, setCalendar] = React__default["default"].useState([]);
  const [collapse, setCollapse] = React__default["default"].useState(false);
  const [date, setDate] = React__default["default"].useState("");
  function createElementFromDate(d, m, y, mo) {
    let current = "current";
    if (m != mo) {
      current = "";
    }
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "day_element " + current,
      onMouseDown: function () {
        select_date(d, m, y);
      },
      "data-day": d,
      "data-month": m,
      "data-year": y,
      key: "e_" + d + "" + m + "" + y
    }, d);
  }
  function select_date(d, m, y) {
    let day = d < 10 ? "0" + d : d;
    let month = m + 1 < 10 ? "0" + (m + 1) : m + 1;
    setDate(day + "/" + month + "/" + y);
    setCollapse(false);
    dateSetter(day + "/" + month + "/" + y);
  }
  function display_month(mo, y) {
    if (mo == -1) {
      mo = 12;
    }
    if (mo == 12) {
      mo = 0;
    }
    setMonth(mo);
    setYear(y);
    let calend = [];
    let day = 1;
    let first_day = new Date(mo + 1 + "/" + day + "/" + y);
    if (first_day.getDay() != 1) {
      if (mo == 0) {
        let ldlm = 31;
        let ldolm = new Date("12/31/" + (y - 1));
        let day_last_month = ldolm.getDay() ? ldlm - (ldolm.getDay() - 1) : ldlm - 5;
        while (day_last_month <= ldlm) {
          calend.push(createElementFromDate(day_last_month, 11, y - 1, mo));
          day_last_month++;
        }
      } else {
        let ldlm = is_valid_date(mo + "/" + last_days[mo - 1] + "/" + y) ? last_days[mo - 1] : last_days[mo - 1] - 1;
        let ldolm = new Date(mo + "/" + ldlm + "/" + y);
        let day_last_month = ldolm.getDay() ? ldlm - (ldolm.getDay() - 1) : ldlm - 5;
        while (day_last_month <= ldlm) {
          calend.push(createElementFromDate(day_last_month, mo - 1, y, mo));
          day_last_month++;
        }
      }
    }
    let ld = is_valid_date(mo + 1 + "/" + last_days[mo] + "/" + y) ? last_days[mo] : last_days[mo] - 1;
    while (day <= ld) {
      calend.push(createElementFromDate(day, mo, y, mo));
      day++;
    }
    day = 1;
    if (mo < 11) {
      while (calend.length < 42) {
        calend.push(createElementFromDate(day, mo + 1, y, mo));
        day++;
      }
    } else {
      while (calend.length < 42) {
        calend.push(createElementFromDate(day, 0, y + 1, mo));
        day++;
      }
    }
    setCalendar(calend);
  }
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("input", {
    name: name,
    className: "date-picker_input",
    id: "date_picker_" + id,
    value: date,
    onBlur: () => {
      setCollapse(false);
    },
    onChange: () => {
      if (!collapse) {
        display_month(5, 2023);
        setCollapse(true);
      } else {
        setCollapse(false);
      }
    },
    onMouseDown: () => {
      if (!collapse) {
        display_month(5, 2023);
        setCollapse(true);
      } else {
        setCollapse(false);
      }
    }
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "date-selector_container",
    "data-display": collapse
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "date-selector_header"
  }, /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "date-selector_arrow left",
    onClick: () => {
      if (month == 0) {
        display_month(11, year - 1);
      } else {
        display_month(month - 1, year);
      }
    }
  }, /*#__PURE__*/React__default["default"].createElement("i", {
    className: "fa fa-angle-left"
  })), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "month_container"
  }, months[month]), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "date-selector_arrow right",
    onClick: () => {
      if (month == 11) {
        display_month(0, year + 1);
      } else {
        display_month(month + 1, year);
      }
    }
  }, /*#__PURE__*/React__default["default"].createElement("i", {
    className: "fa fa-angle-right"
  }))), /*#__PURE__*/React__default["default"].createElement("select", {
    value: year,
    onChange: e => {
      display_month(month, e.target.value);
    }
  }, /*#__PURE__*/React__default["default"].createElement("option", null, "2021"), /*#__PURE__*/React__default["default"].createElement("option", null, "2022"), /*#__PURE__*/React__default["default"].createElement("option", null, "2023"), /*#__PURE__*/React__default["default"].createElement("option", null, "2024"), /*#__PURE__*/React__default["default"].createElement("option", null, "2025"), /*#__PURE__*/React__default["default"].createElement("option", null, "2026"), /*#__PURE__*/React__default["default"].createElement("option", null, "2027"), /*#__PURE__*/React__default["default"].createElement("option", null, "2028"), /*#__PURE__*/React__default["default"].createElement("option", null, "2029"), /*#__PURE__*/React__default["default"].createElement("option", null, "2029"), /*#__PURE__*/React__default["default"].createElement("option", null, "2030"))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "date-selector_calendar"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "calendar_container"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "day_name"
  }, "LUN"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "day_name"
  }, "MAR"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "day_name"
  }, "MER"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "day_name"
  }, "JEU"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "day_name"
  }, "VEN"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "day_name"
  }, "SAM"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "day_name"
  }, "DIM"), calendar))));
}

module.exports = DatePicker;
