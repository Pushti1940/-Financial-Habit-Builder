import { useEffect, useState } from "react";
import "./Settings.css";

const currencies = [
  { code: "AED", name: "United Arab Emirates Dirham", symbol: "د.إ" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋" },
  { code: "ALL", name: "Albanian Lek", symbol: "Lek" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏" },
  { code: "ANG", name: "Netherlands Antillean Guilder", symbol: "ƒ" },
  { code: "AOA", name: "Angolan Kwanza", symbol: "Kz" },
  { code: "ARS", name: "Argentine Peso", symbol: "$" },
  { code: "AUD", name: "Australian Dollar", symbol: "$" },
  { code: "AWG", name: "Aruban Florin", symbol: "ƒ" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼" },

  { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark", symbol: "KM" },
  { code: "BBD", name: "Barbadian Dollar", symbol: "$" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب" },
  { code: "BIF", name: "Burundian Franc", symbol: "FBu" },
  { code: "BMD", name: "Bermudian Dollar", symbol: "$" },
  { code: "BND", name: "Brunei Dollar", symbol: "$" },
  { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs." },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "BSD", name: "Bahamian Dollar", symbol: "$" },
  { code: "BTN", name: "Bhutanese Ngultrum", symbol: "Nu." },
  { code: "BWP", name: "Botswana Pula", symbol: "P" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br" },
  { code: "BZD", name: "Belize Dollar", symbol: "$" },

  { code: "CAD", name: "Canadian Dollar", symbol: "$" },
  { code: "CDF", name: "Congolese Franc", symbol: "FC" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CLP", name: "Chilean Peso", symbol: "$" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "COP", name: "Colombian Peso", symbol: "$" },
  { code: "CRC", name: "Costa Rican Colón", symbol: "₡" },
  { code: "CUP", name: "Cuban Peso", symbol: "$" },
  { code: "CVE", name: "Cape Verdean Escudo", symbol: "$" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },

  { code: "DJF", name: "Djiboutian Franc", symbol: "Fdj" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "DOP", name: "Dominican Peso", symbol: "$" },
  { code: "DZD", name: "Algerian Dinar", symbol: "دج" },

  { code: "EGP", name: "Egyptian Pound", symbol: "£" },
  { code: "ERN", name: "Eritrean Nakfa", symbol: "Nfk" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br" },
  { code: "EUR", name: "Euro", symbol: "€" },

  { code: "FJD", name: "Fijian Dollar", symbol: "$" },
  { code: "FKP", name: "Falkland Islands Pound", symbol: "£" },

  { code: "GBP", name: "British Pound Sterling", symbol: "£" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "GIP", name: "Gibraltar Pound", symbol: "£" },
  { code: "GMD", name: "Gambian Dalasi", symbol: "D" },
  { code: "GNF", name: "Guinean Franc", symbol: "FG" },
  { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q" },
  { code: "GYD", name: "Guyanese Dollar", symbol: "$" },

  { code: "HKD", name: "Hong Kong Dollar", symbol: "$" },
  { code: "HNL", name: "Honduran Lempira", symbol: "L" },
  { code: "HTG", name: "Haitian Gourde", symbol: "G" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },

  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "ILS", name: "Israeli New Shekel", symbol: "₪" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "IQD", name: "Iraqi Dinar", symbol: "ع.د" },
  { code: "IRR", name: "Iranian Rial", symbol: "﷼" },
  { code: "ISK", name: "Icelandic Króna", symbol: "kr" },

  { code: "JMD", name: "Jamaican Dollar", symbol: "$" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },

  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "KGS", name: "Kyrgyzstani Som", symbol: "с" },
  { code: "KHR", name: "Cambodian Riel", symbol: "៛" },
  { code: "KMF", name: "Comorian Franc", symbol: "CF" },
  { code: "KPW", name: "North Korean Won", symbol: "₩" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك" },
  { code: "KYD", name: "Cayman Islands Dollar", symbol: "$" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸" },

  { code: "LAK", name: "Lao Kip", symbol: "₭" },
  { code: "LBP", name: "Lebanese Pound", symbol: "ل.ل" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs" },
  { code: "LRD", name: "Liberian Dollar", symbol: "$" },
  { code: "LSL", name: "Lesotho Loti", symbol: "L" },
  { code: "LYD", name: "Libyan Dinar", symbol: "ل.د" },

  { code: "MAD", name: "Moroccan Dirham", symbol: "د.م." },
  { code: "MDL", name: "Moldovan Leu", symbol: "L" },
  { code: "MGA", name: "Malagasy Ariary", symbol: "Ar" },
  { code: "MKD", name: "Macedonian Denar", symbol: "ден" },
  { code: "MMK", name: "Myanmar Kyat", symbol: "K" },
  { code: "MNT", name: "Mongolian Tögrög", symbol: "₮" },
  { code: "MOP", name: "Macanese Pataca", symbol: "MOP$" },
  { code: "MRU", name: "Mauritanian Ouguiya", symbol: "UM" },
  { code: "MUR", name: "Mauritian Rupee", symbol: "₨" },
  { code: "MVR", name: "Maldivian Rufiyaa", symbol: "Rf" },
  { code: "MWK", name: "Malawian Kwacha", symbol: "MK" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "MZN", name: "Mozambican Metical", symbol: "MT" },

  { code: "NAD", name: "Namibian Dollar", symbol: "$" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "NIO", name: "Nicaraguan Córdoba", symbol: "C$" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "$" },

  { code: "OMR", name: "Omani Rial", symbol: "ر.ع." },

  { code: "PAB", name: "Panamanian Balboa", symbol: "B/." },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/" },
  { code: "PGK", name: "Papua New Guinean Kina", symbol: "K" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
  { code: "PLN", name: "Polish Złoty", symbol: "zł" },
  { code: "PYG", name: "Paraguayan Guaraní", symbol: "₲" },

  { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق" },

  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "RSD", name: "Serbian Dinar", symbol: "дин" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "RWF", name: "Rwandan Franc", symbol: "FRw" },

  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "SBD", name: "Solomon Islands Dollar", symbol: "$" },
  { code: "SCR", name: "Seychellois Rupee", symbol: "₨" },
  { code: "SDG", name: "Sudanese Pound", symbol: "ج.س." },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "SGD", name: "Singapore Dollar", symbol: "$" },
  { code: "SHP", name: "Saint Helena Pound", symbol: "£" },
  { code: "SLE", name: "Sierra Leonean Leone", symbol: "Le" },
  { code: "SOS", name: "Somali Shilling", symbol: "Sh" },
  { code: "SRD", name: "Surinamese Dollar", symbol: "$" },
  { code: "SSP", name: "South Sudanese Pound", symbol: "£" },
  { code: "STN", name: "São Tomé and Príncipe Dobra", symbol: "Db" },
  { code: "SYP", name: "Syrian Pound", symbol: "£" },

  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "TJS", name: "Tajikistani Somoni", symbol: "ЅМ" },
  { code: "TMT", name: "Turkmenistani Manat", symbol: "m" },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت" },
  { code: "TOP", name: "Tongan Paʻanga", symbol: "T$" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "TTD", name: "Trinidad and Tobago Dollar", symbol: "$" },
  { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },

  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
  { code: "USD", name: "United States Dollar", symbol: "$" },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$" },
  { code: "UZS", name: "Uzbekistani Som", symbol: "soʻm" },

  { code: "VES", name: "Venezuelan Bolívar", symbol: "Bs." },
  { code: "VND", name: "Vietnamese Đồng", symbol: "₫" },
  { code: "VUV", name: "Vanuatu Vatu", symbol: "VT" },

  { code: "WST", name: "Samoan Tālā", symbol: "T" },

  { code: "XAF", name: "Central African CFA Franc", symbol: "FCFA" },
  { code: "XCD", name: "East Caribbean Dollar", symbol: "$" },
  { code: "XOF", name: "West African CFA Franc", symbol: "CFA" },
  { code: "XPF", name: "CFP Franc", symbol: "₣" },

  { code: "YER", name: "Yemeni Rial", symbol: "﷼" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "ZMW", name: "Zambian Kwacha", symbol: "ZK" },
  { code: "ZWL", name: "Zimbabwean Dollar", symbol: "Z$" },
];

function Settings() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
  );

  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "INR"
  );

  useEffect(() => {
    document.body.classList.remove(
      "light-theme",
      "dark-theme"
    );

    document.body.classList.add(
      theme === "dark"
        ? "dark-theme"
        : "light-theme"
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(
      "notifications",
      notifications
    );
  }, [notifications]);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;

    setCurrency(selectedCurrency);

    localStorage.setItem(
      "currency",
      selectedCurrency
    );
  };

  const resetSettings = () => {
    setTheme("light");
    setNotifications(true);
    setCurrency("INR");

    localStorage.setItem("theme", "light");
    localStorage.setItem("notifications", "true");
    localStorage.setItem("currency", "INR");
  };

  const selectedCurrency = currencies.find(
    (item) => item.code === currency
  );

  return (
    <div className="settings-page">

      <div className="settings-header">

        <div>
          <p className="settings-label">
            APPLICATION SETTINGS
          </p>

          <h1>Settings</h1>

          <p className="settings-description">
            Customize your Financial Habit Builder
            experience.
          </p>
        </div>

      </div>

      <div className="settings-container">

        {/* APPEARANCE */}

        <section className="settings-card">

          <div className="settings-section-header">

            <div className="settings-section-icon">
              ◐
            </div>

            <div>
              <h2>Appearance</h2>

              <p>
                Choose how the application looks.
              </p>
            </div>

          </div>

          <div className="theme-options">

            <button
              type="button"
              className={`theme-option ${
                theme === "light"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleThemeChange("light")
              }
            >

              <div className="theme-preview light-preview">

                <div className="preview-top" />

                <div className="preview-body">

                  <div className="preview-sidebar" />

                  <div className="preview-content">
                    <span />
                    <span />
                    <span />
                  </div>

                </div>

              </div>

              <div className="theme-option-info">

                <div>
                  <strong>
                    Light Mode
                  </strong>

                  <p>
                    Clean and bright
                  </p>
                </div>

                <div className="theme-radio">
                  {theme === "light" && "✓"}
                </div>

              </div>

            </button>

            <button
              type="button"
              className={`theme-option ${
                theme === "dark"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleThemeChange("dark")
              }
            >

              <div className="theme-preview dark-preview">

                <div className="preview-top" />

                <div className="preview-body">

                  <div className="preview-sidebar" />

                  <div className="preview-content">
                    <span />
                    <span />
                    <span />
                  </div>

                </div>

              </div>

              <div className="theme-option-info">

                <div>
                  <strong>
                    Dark Mode
                  </strong>

                  <p>
                    Comfortable in low light
                  </p>
                </div>

                <div className="theme-radio">
                  {theme === "dark" && "✓"}
                </div>

              </div>

            </button>

          </div>

        </section>

        {/* CURRENCY */}

        <section className="settings-card">

          <div className="settings-section-header">

            <div className="settings-section-icon">
              ₹
            </div>

            <div>
              <h2>
                Regional Preferences
              </h2>

              <p>
                Choose the currency used throughout
                your financial dashboard.
              </p>
            </div>

          </div>

          <div className="currency-setting">

            <div className="currency-setting-info">

              <strong>
                Default Currency
              </strong>

              <p>
                This currency will be used when
                displaying your financial amounts.
              </p>

            </div>

            <select
              className="currency-select"
              value={currency}
              onChange={handleCurrencyChange}
            >

              {currencies.map((item) => (
                <option
                  key={item.code}
                  value={item.code}
                >
                  {item.code} — {item.name} (
                  {item.symbol}
                  )
                </option>
              ))}

            </select>

          </div>

          <div className="selected-currency">

            <span>
              Current currency
            </span>

            <strong>
              {selectedCurrency
                ? `${selectedCurrency.code} ${selectedCurrency.symbol} — ${selectedCurrency.name}`
                : currency}
            </strong>

          </div>

        </section>

        {/* NOTIFICATIONS */}

        <section className="settings-card">

          <div className="settings-section-header">

            <div className="settings-section-icon">
              !
            </div>

            <div>
              <h2>
                Notifications
              </h2>

              <p>
                Manage your financial reminders.
              </p>
            </div>

          </div>

          <div className="setting-row">

            <div>

              <strong>
                Financial reminders
              </strong>

              <p>
                Receive reminders about your
                financial habits and goals.
              </p>

            </div>

            <button
              type="button"
              className={`toggle ${
                notifications
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setNotifications(!notifications)
              }
              aria-label="Toggle notifications"
            >
              <span />
            </button>

          </div>

        </section>

        {/* RESET */}

        <section className="settings-card danger-card">

          <div>

            <h2>
              Reset Settings
            </h2>

            <p>
              Restore appearance, notification
              and currency settings to default.
            </p>

          </div>

          <button
            type="button"
            className="reset-btn"
            onClick={resetSettings}
          >
            Reset Settings
          </button>

        </section>

      </div>

    </div>
  );
}

export default Settings;